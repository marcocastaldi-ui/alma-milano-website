/* ============================================================
   ALMA — Supabase client (browser, anon/publishable key)
   ============================================================ */

const SUPABASE_URL = 'https://utwekatqoausljtydwzn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_O28aFrAGjDJnPpqVaVfl8g_mxn6KvEl';

/* Lightweight REST helper — no npm needed */
async function sbFetch(table, params = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}${params}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) throw new Error(`Supabase error ${res.status}`);
  return res.json();
}

/* Fetch latest entry with a video */
async function getLatestVideo() {
  const data = await sbFetch(
    'speeches',
    '?select=*&video_url=not.is.null&order=speech_date.desc&limit=1'
  );
  return data[0] ?? null;
}

/* Fetch all entries with a video, most recent first */
async function getAllVideos() {
  return sbFetch(
    'speeches',
    '?select=speech_date,speech_text,video_url,weather_snapshot&video_url=not.is.null&order=speech_date.desc'
  );
}
