# Font & logo update — matches activityhaven.org

This zip contains the full site with two changes applied, scoped exactly to your request: fonts and logo now match https://activityhaven.org/?page_id=2860 (the live WordPress site's actual applied styles).

## What changed

**Fonts** — every one of the 13 HTML pages:
- Headings (`--font-display`): Fraunces → **Playfair Display** (this is what activityhaven.org actually uses for its site title, page titles, and widget titles)
- Body/UI text (`--font-body`): Public Sans → **Alegreya Sans** (what activityhaven.org uses for body copy, buttons, nav, and footer)
- The Google Fonts `<link>` tag was updated accordingly. The decorative handwriting accent font (Caveat, used sparingly for a "Join Us!" sticker) was left as-is since it isn't part of the brand match.

**Logo** — on the homepage (`index.html`) only, since the interior pages don't currently show a logo image at all (nav-only header — a separate gap, not part of this request):
- The header banner illustration and the footer logo were both placeholder graphics generated for the prototype. They're now replaced with the real Activity Haven logo, downloaded directly from activityhaven.org: the 50th-anniversary icon mark (header) and the full stacked wordmark version (footer), both as transparent PNGs so they sit cleanly on the cream header and dark footer backgrounds.
- Source logo files are included in `assets/` for future reuse.

## How to get this live

This site deploys from your GitHub repo (`qoxebupa/activity-haven-site`), which Claude could read from directly (it's public) but doesn't have push/write access to in this session — the same permissions gap noted in earlier session notes. To publish these changes, replace the files in your repo with the ones in this zip (drag-and-drop overwrite on GitHub's web UI works fine for this many files), or ask Claude to try again in a session where repo write access has been enabled.

Netlify will auto-redeploy once the repo is updated, since it deploys straight from GitHub.

## Not changed

Nothing else was touched — layout, copy, colors, and all other styling are exactly as they were.
