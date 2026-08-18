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

Same steps you already used successfully:

1. Go to `https://github.com/qoxebupa/AH-Netifly-Hub2/upload/main`.
2. Click "choose your files" and select everything from this folder **except** the `content` folder.
3. Type a commit message (e.g. "Fix carousel performance, add narratives and richer program cards") and click **Commit changes** (with "Commit directly to the main branch" selected).
4. Netlify redeploys automatically within a minute or two.

## What changed in this round (2026-08-16, round 2)

- **Performance fix:** the hero carousel previously loaded all 9 videos into the page at once, which is what made it sluggish/jumpy. Now only the video currently showing (plus the next one, preloaded a couple seconds ahead) is ever loaded — should feel snappy again.
- **Carousel narratives:** each slide now has a short warm sentence under its title, not just a one-word label.
- **"Who We Are" video:** added a placeholder spot on the About page (look for the teal box that says "Full 'Who We Are' video coming here soon"). Once Mike sends that file, it'll be dropped into `/videos/who-we-are.mp4` and this placeholder swapped for the real embedded video.
- **Friendlier Program Hub cards:** each card now shows a short description snippet and a clear "View details →" link, instead of just the bare schedule info.

## After it's live

- Edit programs the same way you already do, through `/admin`.
- All 9 hero videos are self-hosted in `/videos` — the site no longer depends on the demo site staying online. The only remaining external link is the Billiards program's video field in `content/programs.json` (a demo-hosted URL) — worth migrating the same way if/when you touch that program in the CMS.
