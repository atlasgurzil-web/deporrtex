import crypto from "crypto";

const NOEST_TOKEN = process.env.NOEST_TOKEN || "JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd";
const NOEST_GUID = process.env.NOEST_GUID || "UHGCDOGE";
const META_PIXEL_ID = process.env.META_PIXEL_ID || "1422859033068055";
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || "EAANMcvfs0pMBSdirhWIvrsGm4vGYw0eCsRRrlKMEswd4ccPxYNKtAcUxyHbZBAwJdJJhLIWP5c4HMEGmV7Im3ZADcNiLUlFfRGhhRLNr6FsoAtRFXNjZCDs5ZAOTV0BwG2SMZCnZBzlZATuJaSEXTZCmqMQDZBFrwN6r4CFEGp32kOa2rlSSQ6GHWukZCchx07uwZDZD";
const TIKTOK_PIXEL_ID = process.env.TIKTOK_PIXEL_ID || "DARV2UBC77U88MSO7R6G";
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN || "";

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
    
    // 1. Generate Order Number
    const orderNumber = "DPX-" + Math.floor(100000 + Math.random() * 900000);
    const unitPrice = Number(body.totalPrice) || 2900;
    const isStopDesk = body.stop_desk === 1 || body.stop_desk === "1" || body.delivery_mode === "stopdesk";
    const stationCode = body.station_code || "";
    
    // Normalize phone for Algeria
    let rawPhone = (body.phone || "").replace(/\D/g, "");
    if (rawPhone.startsWith("213")) {
      rawPhone = "0" + rawPhone.slice(3);
    }
    if (!rawPhone.startsWith("0") && rawPhone.length === 9) {
      rawPhone = "0" + rawPhone;
    }

    const wilayaNum = parseInt(body.wilaya_id || (body.wilaya ? body.wilaya.match(/\d+/)?.[0] : "16"), 10) || 16;
    const customerAddress = isStopDesk 
      ? (`استلام من مكتب ${stationCode}`.trim()) 
      : (body.address || body.commune || "Centre-ville");

    // 2. Create Order in NOEST Delivery API
    const noestPayload = {
      user_guid: NOEST_GUID,
      reference: orderNumber,
      client: body.name || "Client",
      phone: rawPhone,
      adresse: customerAddress,
      wilaya_id: wilayaNum,
      commune: body.commune || "",
      montant: unitPrice,
      remarque: `Couleur: ${body.color || "أسود وأحمر"} | Qte: ${body.quantity || 1}`,
      produit: "نظارات رياضية طبية Deporrtex",
      type_id: 1,
      stop_desk: isStopDesk ? 1 : 0
    };

    if (isStopDesk && stationCode) {
      noestPayload.station_code = stationCode;
    }

    let noestResult = null;
    let noestTracking = null;

    try {
      const noestRes = await fetch("https://app.noest-dz.com/api/public/create/order", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOEST_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(noestPayload)
      });
      noestResult = await noestRes.json();
      if (noestResult && noestResult.tracking) {
        noestTracking = noestResult.tracking;
      }
    } catch (noestErr) {
      console.error("NOEST API Exception:", noestErr.message);
    }

    // 3. Send Server-Side Purchase Event to Meta Conversions API (CAPI)
    const purchaseEventId = body.eventId || `pur_${orderNumber}`;
    const ts = Math.floor(Date.now() / 1000);
    
    // Normalize phone for Meta matching (E.164 without +, e.g. 213550123456)
    let metaPhone = rawPhone;
    if (metaPhone.startsWith("0")) {
      metaPhone = "213" + metaPhone.slice(1);
    }

    // Extract names
    const fullNameParts = (body.name || "").trim().split(/\s+/);
    const firstName = fullNameParts[0] || "";
    const lastName = fullNameParts.slice(1).join(" ") || "";

    const clientIp = req.headers["x-forwarded-for"] 
      ? req.headers["x-forwarded-for"].split(",")[0].trim() 
      : req.socket?.remoteAddress;
    const clientUserAgent = req.headers["user-agent"] || "";

    const userData = {
      country: [sha256("dz")],
      ph: [sha256(metaPhone)],
      client_user_agent: clientUserAgent
    };

    if (clientIp) userData.client_ip_address = clientIp;
    if (firstName) userData.fn = [sha256(firstName)];
    if (lastName) userData.ln = [sha256(lastName)];
    if (body.commune) userData.ct = [sha256(body.commune)];
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) {
      userData.fbc = body.fbc;
    } else if (body.fbclid) {
      userData.fbc = `fb.1.${ts}.${body.fbclid}`;
    }

    const capiPayload = {
      data: [
        {
          event_name: "Purchase",
          event_time: ts,
          event_id: purchaseEventId,
          action_source: "website",
          event_source_url: body.eventUrl || "https://deporrtex.vercel.app/",
          user_data: userData,
          custom_data: {
            currency: "DZD",
            value: unitPrice,
            content_name: `Deporrtex ${body.color || ""}`.trim(),
            content_ids: ["deportex-glasses-2in1"],
            content_type: "product",
            content_category: body.landing_variant || "deportex01",
            num_items: Number(body.quantity) || 1,
            order_id: orderNumber
          }
        }
      ]
    };

    let capiResult = null;
    try {
      const capiRes = await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(capiPayload)
      });
      capiResult = await capiRes.json();
    } catch (capiErr) {
      console.error("Meta CAPI Exception:", capiErr.message);
    }

    // 4. Send Server-Side Purchase Event to TikTok Events API (if access token configured)
    let tiktokCapiResult = null;
    if (TIKTOK_ACCESS_TOKEN) {
      try {
        const ttPayload = {
          event_source: "web",
          event_source_id: TIKTOK_PIXEL_ID,
          data: [
            {
              event: "CompletePayment",
              event_time: ts,
              event_id: purchaseEventId,
              user: {
                phone: sha256(metaPhone),
                client_ip_address: clientIp,
                client_user_agent: clientUserAgent,
                ttclid: body.ttclid || null,
                ttp: body.ttp || null
              },
              properties: {
                currency: "DZD",
                value: unitPrice,
                contents: [
                  {
                    content_id: "deportex-glasses-2in1",
                    content_type: "product",
                    content_name: `Deporrtex ${body.color || ""}`.trim(),
                    quantity: Number(body.quantity) || 1,
                    price: unitPrice
                  }
                ]
              }
            }
          ]
        };
        const ttRes = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
          method: "POST",
          headers: {
            "Access-Token": TIKTOK_ACCESS_TOKEN,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(ttPayload)
        });
        tiktokCapiResult = await ttRes.json();
      } catch (ttErr) {
        console.error("TikTok Events API Exception:", ttErr.message);
      }
    }

    return res.status(200).json({
      ok: true,
      orderNumber: orderNumber,
      tracking: noestTracking,
      noest: noestResult,
      capi: capiResult ? { events_received: capiResult.events_received } : null,
      tiktok_capi: tiktokCapiResult ? { code: tiktokCapiResult.code } : null
    });

  } catch (error) {
    console.error("Order processing error:", error);
    return res.status(500).json({
      ok: false,
      error: error.message,
      orderNumber: "DPX-" + Math.floor(100000 + Math.random() * 900000)
    });
  }
}
