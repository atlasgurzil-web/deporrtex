import crypto from "crypto";

const META_PIXEL_ID = process.env.META_PIXEL_ID || "1422859033068055";
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "EAANMcvfs0pMBSdirhWIvrsGm4vGYw0eCsRRrlKMEswd4ccPxYNKtAcUxyHbZBAwJdJJhLIWP5c4HMEGmV7Im3ZADcNiLUlFfRGhhRLNr6FsoAtRFXNjZCDs5ZAOTV0BwG2SMZCnZBzlZATuJaSEXTZCmqMQDZBFrwN6r4CFEGp32kOa2rlSSQ6GHWukZCchx07uwZDZD";

function sha256(val) {
  if (!val) return null;
  const str = String(val).trim().toLowerCase();
  if (!str) return null;
  return crypto.createHash("sha256").update(str).digest("hex");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const eventName = body.eventName || "PageView";
    const eventId = body.eventId || `ev_${Date.now()}`;
    const ts = Math.floor(Date.now() / 1000);

    const clientIp = req.headers["x-forwarded-for"] 
      ? req.headers["x-forwarded-for"].split(",")[0].trim() 
      : req.socket?.remoteAddress;
    const clientUserAgent = req.headers["user-agent"] || "";

    const userData = {
      country: [sha256("dz")],
      client_user_agent: clientUserAgent
    };
    if (clientIp) userData.client_ip_address = clientIp;
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    const capiPayload = {
      data: [
        {
          event_name: eventName,
          event_time: ts,
          event_id: eventId,
          action_source: "website",
          event_source_url: body.eventUrl || "https://deporrtex.vercel.app/",
          user_data: userData,
          custom_data: {
            content_category: body.landing_variant || "deportex"
          }
        }
      ]
    };

    const capiRes = await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(capiPayload)
    });
    const result = await capiRes.json();

    return res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error("CAPI error:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
