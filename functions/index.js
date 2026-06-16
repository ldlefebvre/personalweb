/*
  Contact-form Cloud Function for laurentlefebvre.me.

  Exposed to the static Astro site through a Firebase Hosting rewrite:
      POST /api/contact  ->  sendContactEmail

  Protections: honeypot field, Cloudflare Turnstile verification, a basic
  per-instance IP rate limiter, and strict input validation. Delivery is via
  Resend with reply-to set to the sender so replies go straight to them.

  Secrets (set with `firebase functions:secrets:set <NAME>`):
    - RESEND_API_KEY
    - TURNSTILE_SECRET_KEY
  Config (set as env / .env in functions/, or hardcode defaults below):
    - CONTACT_TO    (where messages are delivered)
    - CONTACT_FROM  (verified Resend sender, e.g. "Portfolio <noreply@laurentlefebvre.me>")
*/
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");
const TURNSTILE_SECRET_KEY = defineSecret("TURNSTILE_SECRET_KEY");

const CONTACT_TO = process.env.CONTACT_TO || "laurent.d.lefebvre@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM || "Portfolio Contact <noreply@laurentlefebvre.me>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input caps — reject oversized payloads early (anti-abuse + cost control).
const MAX = { name: 120, email: 200, message: 5000 };

// Naive in-memory rate limiter (per warm instance). Good-enough first line of
// defense; Turnstile + honeypot do the heavy lifting against bots.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

async function verifyTurnstile(token, ip, secret) {
  // If no secret is configured (e.g. local/dev), skip verification.
  if (!secret) return true;
  try {
    const resp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token || "",
          remoteip: ip || "",
        }),
      },
    );
    const data = await resp.json();
    return data.success === true;
  } catch (err) {
    logger.error("Turnstile verification failed", err);
    return false;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

exports.sendContactEmail = onRequest(
  {
    region: "us-central1",
    secrets: [RESEND_API_KEY, TURNSTILE_SECRET_KEY],
    cors: true,
    maxInstances: 5,
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed." });
      return;
    }

    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.ip ||
      "unknown";

    if (isRateLimited(ip)) {
      res.status(429).json({ error: "Too many messages — please try again in a minute." });
      return;
    }

    const { name, email, message, token, company } = req.body || {};

    // Honeypot: only bots fill this. Pretend success.
    if (company && String(company).trim()) {
      res.status(200).json({ ok: true });
      return;
    }

    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").trim();
    const cleanMessage = String(message ?? "").trim();

    if (
      !cleanName ||
      cleanName.length > MAX.name ||
      !cleanEmail ||
      cleanEmail.length > MAX.email ||
      !EMAIL_RE.test(cleanEmail) ||
      cleanMessage.length < 10 ||
      cleanMessage.length > MAX.message
    ) {
      res.status(400).json({ error: "Please provide a name, a valid email, and a short message." });
      return;
    }

    const verified = await verifyTurnstile(token, ip, TURNSTILE_SECRET_KEY.value());
    if (!verified) {
      res.status(400).json({ error: "Verification failed. Please try the challenge again." });
      return;
    }

    const apiKey = RESEND_API_KEY.value();
    if (!apiKey) {
      logger.error("RESEND_API_KEY is not configured.");
      res.status(500).json({ error: "Email is not configured yet. Please email me directly." });
      return;
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br>");
    // Strip newlines from the subject to avoid header injection.
    const subjectName = cleanName.replace(/[\r\n]+/g, " ").slice(0, 80);

    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        replyTo: cleanEmail,
        subject: `Portfolio message from ${subjectName}`,
        text: `From: ${cleanName} <${cleanEmail}>\nIP: ${ip}\n\n${cleanMessage}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:auto">
            <h2 style="color:#0b2925">New portfolio message</h2>
            <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
            <hr style="border:none;border-top:1px solid #e5e7eb" />
            <p style="white-space:pre-wrap;line-height:1.6">${safeMessage}</p>
          </div>`,
      });
      res.status(200).json({ ok: true });
    } catch (err) {
      logger.error("Resend send error", err);
      res.status(502).json({ error: "Couldn't send right now — please email me directly." });
    }
  },
);
