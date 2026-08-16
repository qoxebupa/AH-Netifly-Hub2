# Activity Haven — New Public Site (install guide)

This is the rebuilt public-facing site for **activityhaven-cms**, matching the look and feel of the demo (dazzling-stardust-a4aed1.netlify.app), but pulling all program data from `content/programs.json` — the file your Decap CMS `/admin` panel already edits. There is **no Google Sheets / gviz connection anywhere in this code.**

## What's in this folder

- `index.html`, `about.html`, `programs.html`, `program.html`, `gallery.html`, `newsletter.html`, `membership.html`, `donate.html`, `contact.html` — the public pages
- `css/style.css` — the whole design system (teal/coral/gold/cream, Fraunces + Public Sans)
- `js/nav.js`, `js/carousel.js`, `js/programs.js`, `js/program-detail.js` — small, dependency-free scripts (no build step, no npm install needed)
- `content/programs.json` — a **sample** file with 5 example programs, just so you can preview the site. **Do not upload this over your real one.**
- `videos/` — all 9 hero carousel clips (dance, cardio-drumming, chair-yoga, line-dancing, billiards, euchre, allans-band, garden, food-line), now hosted in this repo. **No hero video depends on the demo site anymore.**

## Important — what NOT to touch

- **Do not replace your real `content/programs.json`** in the repo with the sample one in this folder. Your live file (edited through `/admin`) already has the real program list in the right format — I confirmed the field names match exactly (`day`, `status`, `program`, `time`, `room`, `type`, `image`, `video`, `leaders`, `description`, `notes`), so the new pages will read your existing data with zero changes needed.
- **Do not touch your `admin/` folder** (the Decap CMS config and login page). It's untouched by this rebuild and should keep working exactly as it does now.

## How to add this to your GitHub repo (no coding needed)

1. Go to your repo on github.com: `AH-Netifly-Hub2`.
2. For each file in this zip **except `content/programs.json`**, either:
   - Click "Add file → Upload files" in GitHub's web interface and drag the matching files/folders in (GitHub will ask to confirm overwriting existing files with the same name — say yes), or
   - Ask whoever manages your GitHub connector in Claude to do it for you (once GitHub tools are available in this session, I can commit these directly instead of you uploading anything).
3. Commit the changes with a message like "Rebuild public site to match demo, using CMS programs.json."
4. Netlify will automatically redeploy — check the Netlify dashboard for `activityhaven-cms` a minute or two later, then visit the live site to confirm.

## After it's live

- Edit programs the same way you already do, through `/admin`.
- All 9 hero videos are now self-hosted in `/videos` — the site no longer depends on the demo site staying online. The only remaining external link is the Billiards program's video field in `content/programs.json` (a demo-hosted URL) — worth migrating the same way if/when you touch that program in the CMS.
