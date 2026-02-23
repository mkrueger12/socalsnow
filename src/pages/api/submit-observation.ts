import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import type { APIRoute } from "astro";

const staffEmail = import.meta.env.STAFF_EMAIL || "info@socalsnow.org";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../");
const observationsDir = path.join(projectRoot, "src", "content", "observations");
const observationUploadsDir = path.join(projectRoot, "public", "uploads", "observations");

function getField(form: FormData, name: string) {
  return form.get(name)?.toString().trim() || "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 72);
}

function yamlText(value: string) {
  const escaped = value.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"").replace(/\n/g, " ");
  return `"${escaped}"`;
}

function excerptFromNarrative(text: string) {
  const compact = text.replace(/\s+/g, " ").trim();
  return compact.length <= 250 ? compact : `${compact.slice(0, 247).trim()}…`;
}

async function sendEmail(to: string, subject: string, text: string) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM || "SoCalSnow <no-reply@socalsnow.org>";

  if (!apiKey) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text
    })
  });
}

function getPhotoExtension(file: File) {
  const extension = path.extname(file.name || "").toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(extension)) {
    return extension === ".jpeg" ? ".jpg" : extension;
  }

  if (file.type === "image/jpeg") return ".jpg";
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  if (file.type === "image/gif") return ".gif";
  if (file.type === "image/avif") return ".avif";

  return null;
}

async function savePhoto(file: File) {
  const extension = getPhotoExtension(file);
  if (!extension) {
    return null;
  }

  const safeBaseName = slugify(path.parse(file.name || "observation-photo").name) || "observation-photo";
  const fileName = `${safeBaseName}-${randomUUID().replace(/-/g, "").slice(0, 10)}${extension}`;
  const filePath = path.join(observationUploadsDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());

  if (buffer.length > 5_000_000) {
    throw new Error("Photo upload too large");
  }

  await fs.mkdir(observationUploadsDir, { recursive: true });
  await fs.writeFile(filePath, buffer);

  return `/uploads/observations/${fileName}`;
}

function buildObservationMarkdown(entry: {
  title: string;
  date: string;
  name: string;
  email: string;
  location: string;
  zone: string;
  latitude: string;
  longitude: string;
  elevation: string;
  aspect: string;
  snowDepthCm: string;
  newSnowCm: string;
  stabilityTest: string;
  stabilityResult: string;
  narrative: string;
  photos: string[];
}) {
  const lines: string[] = [];

  lines.push("---");
  lines.push(`title: ${yamlText(entry.title)}`);
  lines.push(`date: "${entry.date}"`);
  lines.push(`author: ${yamlText(entry.name)}`);
  lines.push(`email: ${yamlText(entry.email)}`);
  lines.push(`location: ${yamlText(entry.location)}`);
  lines.push(`mountainRange: ${yamlText(entry.zone)}`);
  lines.push("status: pending");

  if (entry.latitude) {
    lines.push(`latitude: ${Number(entry.latitude)}`);
  }

  if (entry.longitude) {
    lines.push(`longitude: ${Number(entry.longitude)}`);
  }

  if (entry.elevation) {
    lines.push(`elevation: ${Number(entry.elevation)}`);
    lines.push(`elevationFt: ${Number(entry.elevation)}`);
  }

  lines.push(`aspect: ${yamlText(entry.aspect)}`);
  lines.push(`excerpt: ${yamlText(excerptFromNarrative(entry.narrative))}`);
  lines.push(`narrative: ${yamlText(entry.narrative)}`);

  if (entry.snowDepthCm || entry.newSnowCm) {
    const depth = entry.snowDepthCm ? `${entry.snowDepthCm} cm` : "n/a";
    const newSnow = entry.newSnowCm ? `${entry.newSnowCm} cm` : "n/a";
    lines.push(`snowpitData: ${yamlText(`Snow depth: ${depth}, new snow: ${newSnow}`)}`);
  }

  if (entry.stabilityTest || entry.stabilityResult) {
    const resultLine = entry.stabilityTest && entry.stabilityResult
      ? `${entry.stabilityTest}: ${entry.stabilityResult}`
      : entry.stabilityTest || entry.stabilityResult;
    lines.push(`stabilityTests: ${yamlText(resultLine)}`);
  }

  if (entry.photos.length) {
    lines.push("photos:");
    for (const photo of entry.photos) {
      lines.push(`  - ${yamlText(photo)}`);
    }
  }

  lines.push("---");
  lines.push("");
  lines.push(`Observation from ${entry.location}.`);
  lines.push(entry.narrative);

  return lines.join("\n");
}

export const GET: APIRoute = async () => {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST",
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  if (form.get("website")) {
    return new Response("ok", { status: 200 });
  }

  const name = getField(form, "name");
  const email = getField(form, "email");
  const date = getField(form, "date");
  const zone = getField(form, "zone");
  const locationPreset = getField(form, "locationPreset");
  const locationDetail = getField(form, "location");
  const elevation = getField(form, "elevation");
  const aspect = getField(form, "aspect");
  const latitude = getField(form, "latitude");
  const longitude = getField(form, "longitude");
  const snowDepthCm = getField(form, "snowDepthCm");
  const newSnowCm = getField(form, "newSnowCm");
  const stabilityTest = getField(form, "stabilityTest");
  const stabilityResult = getField(form, "stabilityResult");
  const narrative = getField(form, "narrative");
  const agreePolicy = getField(form, "agreePolicy");
  const renderedAt = Number(getField(form, "renderedAt") || "0");
  const emailValid = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const elevationNumber = Number(elevation);
  const snowDepthNumber = Number(snowDepthCm);
  const newSnowNumber = Number(newSnowCm);
  const latitudeNumber = latitude ? Number(latitude) : null;
  const longitudeNumber = longitude ? Number(longitude) : null;

  if (!name || !email || !date || !zone || !elevation || !aspect || !narrative) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (agreePolicy !== "yes") {
    return new Response("Policy acknowledgement is required", { status: 400 });
  }

  if (!emailValid) {
    return new Response("Invalid email", { status: 400 });
  }

  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.valueOf())) {
    return new Response("Invalid date", { status: 400 });
  }

  if (!Number.isFinite(elevationNumber) || elevationNumber < 0 || elevationNumber > 20000) {
    return new Response("Invalid elevation", { status: 400 });
  }

  if (latitude && (latitudeNumber === null || !Number.isFinite(latitudeNumber) || latitudeNumber < -90 || latitudeNumber > 90)) {
    return new Response("Invalid latitude", { status: 400 });
  }

  if (longitude && (longitudeNumber === null || !Number.isFinite(longitudeNumber) || longitudeNumber < -180 || longitudeNumber > 180)) {
    return new Response("Invalid longitude", { status: 400 });
  }

  if (snowDepthCm && (!Number.isFinite(snowDepthNumber) || snowDepthNumber < 0 || snowDepthNumber > 5000)) {
    return new Response("Invalid snow depth", { status: 400 });
  }

  if (newSnowCm && (!Number.isFinite(newSnowNumber) || newSnowNumber < 0 || newSnowNumber > 5000)) {
    return new Response("Invalid new snow depth", { status: 400 });
  }

  if (name.length > 120 || email.length > 200 || locationDetail.length > 180 || aspect.length > 30 || narrative.length > 5000) {
    return new Response("Field length exceeds limits", { status: 400 });
  }

  if (renderedAt && Date.now() - renderedAt < 1500) {
    return new Response("Submission too fast", { status: 400 });
  }

  if (!locationDetail && !locationPreset) {
    return new Response("Missing required field: location", { status: 400 });
  }

  const location =
    locationPreset && locationPreset !== "Other"
      ? locationDetail
        ? `${locationPreset} (${locationDetail})`
        : locationPreset
      : locationDetail;

  const rawPhotos = form.getAll("photos");
  if (rawPhotos.length > 8) {
    return new Response("Too many photos", { status: 400 });
  }

  const photoPaths: string[] = [];

  for (const rawPhoto of rawPhotos) {
    if (!(rawPhoto instanceof File)) {
      continue;
    }

    if (!rawPhoto.size) {
      continue;
    }

    if (!rawPhoto.type.startsWith("image/")) {
      return new Response("Invalid photo file type", { status: 400 });
    }

    try {
      const savedPhoto = await savePhoto(rawPhoto);
      if (savedPhoto) {
        photoPaths.push(savedPhoto);
      }
    } catch {
      return new Response("Failed to upload photo", { status: 500 });
    }
  }

  const markdown = buildObservationMarkdown({
    title: `Observation from ${location}`,
    date,
    name,
    email,
    location,
    zone,
    latitude,
    longitude,
    elevation,
    aspect,
    snowDepthCm,
    newSnowCm,
    stabilityTest,
    stabilityResult,
    narrative,
    photos: photoPaths
  });

  const fileSlug = `${slugify(zone || "observation")}-${slugify(location || "report")}-${date.replace(/-/g, "")}-${randomUUID().replace(/-/g, "").slice(0, 8)}`;

  let observationFilePath: string;
  try {
    await fs.mkdir(observationsDir, { recursive: true });
    observationFilePath = path.join(observationsDir, `${fileSlug}.md`);
    await fs.writeFile(observationFilePath, markdown, "utf8");
  } catch {
    console.error("Observation moderation write failed", { name, email, date, zone, location });
    return new Response("Could not queue submission", { status: 500 });
  }

  const payload = {
    name,
    email,
    date,
    zone,
    location,
    elevation,
    aspect,
    latitude,
    longitude,
    snowDepthCm,
    newSnowCm,
    stabilityTest,
    stabilityResult,
    narrative,
    files: photoPaths,
    filePath: observationFilePath
  };

  console.info("Observation submission queued for moderation", payload);

  await sendEmail(
    staffEmail,
    `New observation from ${payload.name}`,
    `Date: ${payload.date}\nZone: ${payload.zone}\nLocation: ${payload.location}\nElevation: ${payload.elevation}\nAspect: ${payload.aspect}\nLatitude: ${payload.latitude || "n/a"}\nLongitude: ${payload.longitude || "n/a"}\nSnow depth (cm): ${payload.snowDepthCm || "n/a"}\nNew snow (cm): ${payload.newSnowCm || "n/a"}\nStability test: ${payload.stabilityTest || "n/a"}\nResult: ${payload.stabilityResult || "n/a"}\nFiles: ${payload.files.join(", ") || "none"}\nModeration file: ${observationFilePath}\n\n${payload.narrative}`
  );

  await sendEmail(
    String(payload.email),
    "Observation received",
    "Thanks for submitting your observation. It has entered the moderation queue and will be reviewed by So Cal Snow staff."
  );

  return new Response(null, {
    status: 303,
    headers: {
      Location: "/observations/submit?submitted=1"
    }
  });
};
