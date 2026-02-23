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

async function subscribeWithButtondown(email: string, name: string | null, referrer: string) {
  const apiKey = import.meta.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return { ok: true, skipped: true };
  }

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      metadata: {
        name,
        source: "website",
        referrer
      },
      tags: ["summary-alerts"]
    })
  });

  const errorText = await response.text();

  if (!response.ok) {
    const normalized = errorText.toLowerCase();
    if (response.status < 500 && (normalized.includes("already") || normalized.includes("exists") || normalized.includes("duplicate"))) {
      return { ok: true, skipped: false, duplicate: true };
    }
    return { ok: false, status: response.status, error: errorText };
  }

  return { ok: true, skipped: false, duplicate: false };
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

  const email = getField(form, "email");
  const name = getField(form, "name");
  const consent = getField(form, "consent");
  const renderedAt = Number(getField(form, "renderedAt") || "0");
  const emailValid = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (consent !== "1") {
    return new Response("Email consent is required", { status: 400 });
  }

  if (!emailValid) {
    return new Response("Invalid email", { status: 400 });
  }

  if (renderedAt && Date.now() - renderedAt < 1200) {
    return new Response("Subscription too fast", { status: 400 });
  }

  const referrer = getField(form, "referrer");
  const result = await subscribeWithButtondown(email, name || null, referrer || "homepage");

  if (!result.ok) {
    console.error("Newsletter subscribe API failure", {
      status: result.status,
      email
    });
    return new Response("Could not complete newsletter signup", { status: 500 });
  }

  const confirmationMessage = result.skipped
    ? "Thanks for your interest. Newsletter setup is currently in configuration, and you'll start receiving summary alerts once enabled."
    : result.duplicate
      ? "You are already subscribed. If you don't see your confirmation email, check your inbox and spam folder."
      : "Thanks for signing up for So Cal Snow summary alerts. You'll receive a confirmation message with a link to confirm your subscription.";

  await sendEmail(email, "So Cal Snow alerts subscribed", confirmationMessage);

  await sendEmail(
    staffEmail,
    "New newsletter signup",
    `New subscriber: ${email}\nName: ${name || "not provided"}\nReferrer: ${referrer || "homepage"}`
  );

  return new Response(null, {
    status: 303,
    headers: {
      Location: "/?subscribed=1"
    }
  });
};
