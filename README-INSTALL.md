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

## Round 2.1 fix — Program Hub was showing "0 programs found"

Turned out the real `content/programs.json` in this repo is shaped like `{"programs": [ ...113 entries... ] }` (an object with a `programs` key), not a bare list like `[ ...entries... ]`. The page code originally only understood the bare-list shape, so it silently loaded zero programs instead of erroring. `js/programs.js` and `js/program-detail.js` are both fixed to handle the real shape now (and the sample `content/programs.json` in this zip was updated to match, for consistency). No changes needed to your actual CMS data — this was purely a code fix.

## Round 3 (2026-08-16) — carousel autoplay, one-line program rows, focused detail page

- **Videos loop, start muted, and autoplay:** added the `autoplay` attribute alongside `muted`/`loop`/`playsinline`, and the carousel script now also sets `.muted = true` and `.loop = true` in JavaScript right before each slide plays, for maximum browser compatibility.
- **Program Hub cards → one-line rows:** each program is now a single compact row showing Day, Title, Type badge, and a "Details" button — no more multi-line cards.
- **Program detail page, simplified:** now shows exactly Title → Day/Time/Room → Video → Description → Cost, in that order.
- **Note on "Cost":** your `content/programs.json` doesn't currently have a dedicated cost/price field, so the Cost box shows whatever's in that program's `notes` field (e.g. "Session fee applies."), falling back to "Free / included with membership — call to confirm" when notes are blank. If you'd like a true dedicated cost field with real dollar amounts per program, that would mean adding a new field to the Decap CMS config and re-entering that data for each program — let me know if you want to do that as a follow-up.

## Round 5 — new file: `programs-embed.html`, for embedding in WordPress (or any other site)

This is a stripped-down version of the Program Hub — same live filters, same CMS-driven data — but with **no nav bar, no hero heading, no footer**. It's built specifically to sit inside an `<iframe>` on another site (like your WordPress staging page) without duplicating that site's own navigation.

**To use it:** once this file is uploaded to GitHub and deployed (same as everything else), the embed URL is:
`https://activityhaven-cms.netlify.app/programs-embed.html`

In WordPress, in the Custom HTML block that currently has:
```html
<iframe src="https://dazzling-stardust-a4aed1.netlify.app/programs" style="width:100%; min-height:1600px; border:none;" title="Activity Haven Programs - Live Searchable Schedule" loading="lazy"></iframe>
```
change the `src` to:
```html
<iframe src="https://activityhaven-cms.netlify.app/programs-embed.html" style="width:100%; min-height:6000px; border:none;" title="Activity Haven Programs - Live Searchable Schedule" loading="lazy"></iframe>
```
(Bumped `min-height` to 6000px since the real list has 113 programs, much longer than the demo's sample rows — better to have extra blank space at the bottom than a cut-off list. Adjust up or down once you see how it looks live.)

Each program's "Details" button opens the full detail page in the main window (not trapped inside the iframe), so visitors land on the real Netlify site with its own proper navigation once they click through.

## Round 3.1 — "Who We Are" video is live

The About page now embeds the real 3-minute "Who We Are" video via its VideoPress link, replacing the placeholder box. No file upload was needed — it's linked directly from videopress.com.

## Round 3.2 — "Our Story" button now auto-plays the video

The homepage's "Our Story" button now links to `/about.html?play=1#who-we-are`. When the About page detects that `?play=1` flag, it swaps the video embed to an autoplay (muted, as browsers require) version and smooth-scrolls straight to it. Visiting the About page any other way (nav menu, direct link) still shows the video as a normal click-to-play embed — it only auto-starts when someone arrives via that specific homepage button.

## Round 4 — Program Hub rows expanded, detail page media + cost logic

- Each Program Hub row now shows Day, Title, Time, Room, Type badge, and a Details button, still on one line on desktop (wraps gracefully on phones).
- The program detail page now shows a program's **image** if it has one and no video (video still wins if both are present).
- **Cost only shows for Instructional programs now** — Drop-in and Special Events rows no longer show a Cost box at all, since that's where it's actually relevant. (Same caveat as before: this pulls from the `notes` field since there's no dedicated cost field yet.)

## After it's live

- Edit programs the same way you already do, through `/admin`.
- All 9 hero videos are self-hosted in `/videos` — the site no longer depends on the demo site staying online. The only remaining external link is the Billiards program's video field in `content/programs.json` (a demo-hosted URL) — worth migrating the same way if/when you touch that program in the CMS.

## Round 6 (2026-08-18)

- **Program Hub sort order:** rows (and the Day/Type dropdown option order) now follow Day → Time → Type. Special Events are the one exception — if you type an actual date into a Special Event's "Day" field (e.g. "August 20" or "2026-08-20") instead of a weekday, that event will sort by that date instead of by weekday/time. Leaving a weekday in there still works exactly as before.
- **Nav label shortened:** "Programs/Events" is now just "Activities" on every page, to help the menu bar fit on one line more often.
- **Gallery page fleshed out** to match the demo's full section set: Special Events is now a 4-poster placeholder grid, added a "This Week" (Facebook) section, and expanded "Around the Centre" to 8 photo placeholders.
- **New homepage banner:** added a centred badge/logo mark, "Activity Haven Recreation Centre for Adults 50+" heading, and "Join Us, Come Out & Play!" tagline above the nav bar on the homepage only — matching the demo's layout while keeping our own nav bar untouched. This uses a plain CSS circle badge ("AH") since there's no real logo image file yet; send me the actual logo image whenever you have it and I'll drop it in.
- Confirmed: no video on the site currently requires a click to start (carousel already autoplays; program-detail videos are intentionally click-to-play since they can run several minutes) — no changes needed there this round.

## Round 6.1 (2026-08-18) — program-detail videos now autoplay too

Correction to the note above: the individual program videos (the ones that show on a program's own detail page, like Billiards or Chair Yoga) now also autoplay, start muted, and loop, same as the homepage carousel — no click needed. They still keep their play/pause/volume controls, so visitors can pause or unmute if they want, but nothing requires a click to get started. Applies to both direct video files and YouTube-linked videos.
