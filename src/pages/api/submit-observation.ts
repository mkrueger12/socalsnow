import type { APIRoute } from "astro";

const staffEmail = import.meta.env.STAFF_EMAIL || "info@socalsnow.org";

function getField(form: FormData, name: string) {
  return form.get(name)?.toString().trim() || "";
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

  if (!Number.isFinite(elevationNumber) || elevationNumber < 0 || elevationNumber > 20000) {
    return new Response("Invalid elevation", { status: 400 });
  }

  if (latitude && (latitudeNumber === null || !Number.isFinite(latitudeNumber) || latitudeNumber < -90 || latitudeNumber > 90)) {
    return new Response("Invalid latitude", { status: 400 });
  }

  if (
    longitude &&
    (longitudeNumber === null || !Number.isFinite(longitudeNumber) || longitudeNumber < -180 || longitudeNumber > 180)
  ) {
    return new Response("Invalid longitude", { status: 400 });
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
    files: form.getAll("photos").map((file) => (typeof file === "string" ? file : file.name))
  };

  console.info("Observation submission queued for moderation", payload);

  await sendEmail(
    staffEmail,
    `New observation from ${payload.name}`,
    `Date: ${payload.date}\nZone: ${payload.zone}\nLocation: ${payload.location}\nElevation: ${payload.elevation}\nAspect: ${payload.aspect}\nLatitude: ${payload.latitude || "n/a"}\nLongitude: ${payload.longitude || "n/a"}\nSnow depth (cm): ${payload.snowDepthCm || "n/a"}\nNew snow (cm): ${payload.newSnowCm || "n/a"}\nStability test: ${payload.stabilityTest || "n/a"}\nResult: ${payload.stabilityResult || "n/a"}\n\n${payload.narrative}`
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
