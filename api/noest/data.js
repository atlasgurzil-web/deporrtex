const NOEST_TOKEN = process.env.NOEST_TOKEN || "JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd";

let cache = {
  fees: null,
  desks: null,
  time: 0
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const now = Date.now();
  if (cache.fees && cache.desks && now - cache.time < 3600000) {
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ ok: true, fees: cache.fees, desks: cache.desks, cached: true });
  }

  try {
    const [feesRes, desksRes] = await Promise.all([
      fetch("https://app.noest-dz.com/api/public/fees", {
        headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
      }),
      fetch("https://app.noest-dz.com/api/public/desks", {
        headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
      })
    ]);

    if (!feesRes.ok || !desksRes.ok) {
      throw new Error(`NOEST API responded with fees:${feesRes.status}, desks:${desksRes.status}`);
    }

    const [fees, desks] = await Promise.all([
      feesRes.json(),
      desksRes.json()
    ]);

    cache = { fees, desks, time: now };

    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({ ok: true, fees, desks });
  } catch (error) {
    console.error("Error fetching NOEST data:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
