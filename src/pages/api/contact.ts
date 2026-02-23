import type { APIRoute } from "astro";

const staffEmail = import.meta.env.STAFF_EMAIL || "info@socalsnow.org";

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

  const name = form.get("name")?.toString().trim();
  const email = form.get("email")?.toString().trim();
  const subject = form.get("subject")?.toString().trim();
  const message = form.get("message")?.toString().trim();
  const renderedAt = Number(form.get("renderedAt")?.toString() || "0");
  const emailValid = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !subject || !message) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!emailValid) {
    return new Response("Invalid email", { status: 400 });
  }

  if (name.length > 120 || email.length > 200 || message.length > 3000) {
    return new Response("Field length exceeds limits", { status: 400 });
  }

  if (renderedAt && Date.now() - renderedAt < 1500) {
    return new Response("Submission too fast", { status: 400 });
  }

  console.info("Contact form message", { name, email, subject, message });

  await sendEmail(
    staffEmail,
    `New contact message: ${subject}`,
    `From: ${name} <${email}>\nTopic: ${subject}\n\n${message}`
  );

  await sendEmail(
    email,
    "We received your message",
    "Thanks for contacting So Cal Snow Avalanche Center. We have received your message and will reply soon."
  );

  return new Response(null, {
    status: 303,
    headers: {
      Location: "/contact?sent=1"
    }
  });
};
