const NOEST_TOKEN = process.env.NOEST_TOKEN || "JlLZKsPRF6eClTd4v2NaDfS60JZLbgxtWfd";

const communeCache = {};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const wilayaId = req.query.wilaya || "16";

  if (communeCache[wilayaId]) {
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).json({ ok: true, communes: communeCache[wilayaId], cached: true });
  }

  try {
    const response = await fetch(`https://app.noest-dz.com/api/public/get/communes/${wilayaId}`, {
      headers: { "Authorization": `Bearer ${NOEST_TOKEN}` }
    });

    if (!response.ok) {
      throw new Error(`NOEST communes returned status ${response.status}`);
    }

    const communes = await response.json();
    communeCache[wilayaId] = communes;

    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    return res.status(200).json({ ok: true, communes });
  } catch (error) {
    console.error(`Error fetching communes for wilaya ${wilayaId}:`, error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
