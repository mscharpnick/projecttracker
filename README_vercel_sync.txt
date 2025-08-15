# Shareable Workstream Tracker (Serverless Sync)

This repo can be deployed to **Vercel** for a simple shared board URL (no auth).

## What you get
- `/public/index.html` → the single-file app (use `workstream_tracker_vertical_milestones_v5.html`).
- `/api/boards/[id].js` → serverless API that saves/loads JSON to **Vercel Blob**.
- Share via `?board=<your-id>` — everyone with the link can **Load** and **Save**.

## Steps
1. Create a GitHub repo and add:
   - `public/index.html` (rename the HTML to `index.html`).
   - `api/boards/[id].js` (from this folder).
2. **Deploy to Vercel** (import from GitHub).
3. In Vercel → **Settings → Environment Variables**, add:
   - `BLOB_READ_WRITE_TOKEN` (Vercel Blob token).
4. Redeploy. Your API will be live at:
   - `https://<your-app>.vercel.app/api/boards/<id>`
5. In `index.html`, set `const SYNC.enabled = true;` (search for SYNC) — or leave as-is and it will still work locally with localStorage.
6. Open `https://<your-app>.vercel.app/?board=team-alpha`:
   - Use **Load** to fetch the board.
   - Use **Save** to push your latest changes.
   - Use **Copy Link** to share.

## Notes
- No auth: anyone with the board ID can read/write. Use non-sensitive data.
- Conflict policy: last write wins. For richer collaboration, add a timestamp/version check.
- You can also swap Vercel Blob for **KV** or **Supabase** — the client only calls GET/PUT JSON.
