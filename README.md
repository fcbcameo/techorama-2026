# Techorama 2026 Schedule — Personal PWA

A personal schedule manager for Techorama Belgium 2026, installable on your phone.

## What's in this folder

| File | Purpose |
|---|---|
| `index.html` | Main app page |
| `app.js` | All app logic + the full schedule (Tue + Wed) — pre-compiled, runs instantly |
| `manifest.json` | PWA manifest — makes Android offer "Install app" |
| `service-worker.js` | Caches everything for offline use at the venue |
| `icon-192.png` / `icon-512.png` | App icons |
| `app.jsx` | (Optional) the original source — only needed if you want to edit and recompile |

---

## Step-by-step setup (≈5 minutes)

### Step 1 — Create the GitHub repo

1. Go to **https://github.com/new**
2. **Repository name**: `techorama-2026` (or whatever you like)
3. **Public** ✅ (required for free GitHub Pages)
4. Leave everything else default. Click **Create repository**.

### Step 2 — Upload the files

The fastest way is the web UI:

1. On your new empty repo page, click **"uploading an existing file"** (it's a small link in the middle of the page).
2. Drag **all 6 required files** from this folder into the upload box:
   - `index.html`
   - `app.js`
   - `manifest.json`
   - `service-worker.js`
   - `icon-192.png`
   - `icon-512.png`

   (You can also drop in `app.jsx` and `README.md` if you want them in the repo, but they're not needed for the app to work.)
3. Scroll down, click **Commit changes**.

(Or, if you prefer git CLI: `git clone`, copy files in, `git add . && git commit -m "Initial" && git push`.)

### Step 3 — Enable GitHub Pages

1. In your repo, click **Settings** (top tab).
2. Left sidebar → **Pages**.
3. Under **Source**, select branch **`main`** and folder **`/ (root)`**. Click **Save**.
4. Wait ~30–60 seconds. Refresh the page.
5. You'll see a green box: **"Your site is live at `https://<your-username>.github.io/techorama-2026/`"**
6. Copy that URL.

### Step 4 — Test it in desktop browser first

Open the URL on your laptop. You should see the schedule. Star a few sessions, refresh — your picks should persist. ✅

If something looks broken, check the browser console (F12) — most likely a typo in one of the filenames in step 2.

### Step 5 — Install on Android

1. On your phone, open **Chrome**.
2. Go to your GitHub Pages URL.
3. Tap the **⋮ menu** (top-right) → **Add to Home screen** *or* **Install app** (Chrome detects the manifest and offers the better option).
4. Confirm the name. Tap **Install**.
5. The app appears in your app drawer with the Techorama icon. Tap it — opens fullscreen, no browser chrome.
6. **Open it once while online.** The service worker will cache everything. After that, it works **fully offline** — perfect for the conference.

---

## Updating the app later

If you want to tweak something (e.g. fix a session time, change colors):

1. Edit the file in your GitHub repo (just click the pencil icon on github.com).
2. Commit changes.
3. Wait ~30s for GitHub Pages to rebuild.
4. **Important**: bump `CACHE_NAME` in `service-worker.js` (e.g. `v1` → `v2`) so the service worker fetches the new files instead of serving the old cache. Without this bump, your phone will keep showing the old version.

---

## Troubleshooting

- **"Add to Home screen" doesn't show "Install app"**: Make sure the URL is `https://` (GitHub Pages provides this automatically) — PWAs require HTTPS. Also make sure you visited the page at least once with internet.
- **Picks reset after closing the app**: Some Android browsers clear `localStorage` aggressively when storage is low. This is rare but possible. Picks are stored under the key `techorama-2026-picks` in `localStorage`.
- **Schedule shows old data**: Techorama may publish changes. Re-export the schedule data from the source and replace the `SCHEDULE` array in `app.jsx`.
- **Service worker won't update**: Bump `CACHE_NAME` in `service-worker.js` and re-deploy. On the phone, you may also need to uninstall and reinstall the PWA once to clear stubborn caches.

---

## Notes

- The app works completely offline once installed.
- Picks are stored **on your phone only** — they don't sync to other devices. Install on each device separately.
- The `.ics` and PDF exports work natively (no modal workaround needed) since you're outside the Claude artifact sandbox.
- Source data fetched from `techorama.be/schedule` on May 7, 2026. If sessions get added/changed, update `SCHEDULE` in `app.jsx`.
