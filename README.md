# Portfolio

Four pages, no build step, no framework. Open `index.html` in a browser and it works.

```
index.html         Film — the landing page
treatments.html    Treatments — pop-up flips through a PDF instead of playing a video
photography.html   Photography — no pop-up, just the reel
profile.html        the profile page
content.js          ← the only file you need to edit
style.css           colours, type, spacing
app.js              the reel, the pop-up, the PDF viewer, the video player
fonts.css           the two typefaces, embedded
fonts/              the original .woff2 files
vendor/pdfjs/       the PDF-reading library, self-hosted (only loads on Treatments)
images/             covers, stills, portrait  ← replace these
documents/          the PDFs that Treatments works flip through
videos/             self-hosted video files, if you use any — see below
```

---

## The three galleries

"Works" in the top nav is now a dropdown: **Film**, **Treatments**, **Photography**.
Each is its own page and its own list in `content.js` — `FILM`, `TREATMENTS`,
`PHOTOGRAPHY` — but they all work the same way described below. The one real
difference is what happens when you click a work:

- **Film** opens the pop-up with a video, description, credits, stills.
- **Treatments** opens the same pop-up, but instead of a video it shows the
  work's PDF as slides you can flip through.
- **Photography** doesn't open anything — clicking a photo does nothing. Only
  `title`, `meta`, `blurb`, `cover`, and `ratio` matter for those entries.

A fourth object, `PAGES`, near the bottom of `content.js`, is what actually
wires each HTML file to its list and gives it its heading:

```js
const PAGES = {
  film:        { heading: `Nathalie Shnider`, mode: `film`,        works: FILM },
  treatments:  { heading: `Treatments`,       mode: `treatments`,  works: TREATMENTS },
  photography: { heading: `Photography`,      mode: `photography`, works: PHOTOGRAPHY },
};
```

Change `heading` to rename what's shown at the top of that page. You shouldn't
need to touch anything else here unless you're adding a fourth gallery.

---

## Adding a work

Open `content.js`. Find the list for the gallery it belongs in (`FILM`,
`TREATMENTS`, or `PHOTOGRAPHY`), scroll to the commented-out **TEMPLATE** at
the bottom of that list, copy everything between the dashed lines, paste it
where you want the work to appear, and fill it in.

```js
{
  title: `Name of the work`,
  meta: `Medium · Year`,
  blurb: `One short line for the reel.`,
  cover: `images/your-image.jpg`,
  ratio: `16/9`,
  awards: [`Official Selection — Festival Name 2026`],
  description: `The longer text for the pop-up.`,
  embed: `https://vimeo.com/000000`,
  link: { label: `Watch it`, url: `https://example.com` },
  credits: [`Director — Name`, `Editor — Name`],
  stills: [`images/still-1.jpg`, `images/still-2.jpg`],
},
```

Two rules and you can't break it:

1. Every entry sits between `{` and `}` and ends with a **comma**.
2. Text goes between `` `backticks` ``, not quotes. Backticks let you use
   apostrophes and quote marks inside your text without escaping anything.

Only `title` is required. Delete any line you don't need — a work with no
video just won't show a player, a work with no stills won't show a stills row.

**`ratio`** is the shape of the cover: `16/9`, `4/3`, `1/1`, `3/4`, `4/5`.
Every cover on the reel is the same height, so this decides how wide the plate
is. Mixing shapes is the point — don't feel you have to make them match.

**`awards`** is a list of one-line strings — festival selections, prizes,
press mentions — shown just above the description, in a more understated
style than the description itself. Leave it out entirely for works that don't
have any.

**`embed`** takes a normal YouTube or Vimeo link copied straight from your
browser's address bar. It gets converted to a player automatically. All of these
work:

```
https://www.youtube.com/watch?v=abc123
https://youtu.be/abc123
https://vimeo.com/123456789
https://vimeo.com/123456789/a1b2c3      (unlisted videos)
```

**Images** go in the `images/` folder. Any format a browser can show — jpg, png,
webp, gif, svg. Covers look best around 1600px on the long edge; stills can be
smaller. Keep them under ~400KB each so the page stays quick. Animated GIFs
work exactly the same way as any other image — just point `cover` or a
`stills` entry at a `.gif` file. Worth knowing: a GIF is usually a much bigger
file than the equivalent short video for the same clip, since it has no real
compression. If file size matters, a muted looping video is the modern,
much lighter replacement for the same effect — ask if you want that added.

---

## Making a few words italic

In `blurb`, `description`, `credits`, `awards`, or a profile paragraph, wrap
the words you want italic in single asterisks:

```js
blurb: `*Director* and producer.`,
description: `A young woman wanders through *Paris* at night.`,
```

This is deliberately narrow and safe — it can't be used to inject any other
HTML, only italics. `title` and `meta` are left as plain text on purpose;
they're short and structural, and one's already in small caps.

One limitation worth knowing: asterisks pair up left to right, two at a time.
If a field only ever has matched pairs — the normal case — it just works. A
genuine stray `*` character sitting *before* a real pair in the same field
will incorrectly grab the next asterisk as its partner instead of being left
alone. For ordinary prose this never comes up; just don't type a bare `*`
unless you mean it to open or close italics.

---

## A self-hosted video, instead of a link

For Film works, `embed` is almost always the right choice — YouTube and Vimeo
give you free hosting, automatic quality adjustment for slow connections, and
work reliably everywhere. But if you have a real reason to host the file
yourself (something short and private, no account tied to it), add a `video`
field instead:

```js
video: `videos/your-clip.mp4`,
```

Drop the file itself into the `videos/` folder. If a work has `pdf`, `video`,
and `embed` all set, the priority is **PDF beats video beats embed** — only
one plays.

**Use `.mp4`, not `.mov`.** A `.mov` exported from Final Cut or QuickTime
almost always has a perfectly normal, web-friendly video stream inside it —
the problem is the `.mov` *container* itself, which Chrome and Firefox
support less reliably than `.mp4`, even with identical video data inside.
Converting costs nothing and loses nothing:

```
ffmpeg -i yourclip.mov -c copy -movflags +faststart yourclip.mp4
```

That re-wraps the exact same video in an `.mp4` shell — instant, no
re-encoding, no quality loss.

**The player is custom, not the browser's default one.** Native
`<video controls>` puts play/pause, volume, and a tiny scrub bar at the
bottom of the video — that scrub bar is only a few pixels tall and easy to
miss a click on, so instead there's a purpose-built play button, a full-width
seek bar, and a time display, styled to match the rest of the site. Clicking
anywhere on the video also toggles play/pause, same as most video players. If
a browser genuinely can't decode the file, it shows a short message and a
direct link to the file instead of a silent black box.

**If seeking looks broken while testing locally, it's very likely your local
server, not the site.** Dragging the seek bar relies on the server supporting
HTTP Range requests. Real hosting (Vercel, Netlify, GitHub Pages) all support
this automatically. `python3 -m http.server` — the simplest way to preview
locally — does *not*, and will make every video appear stuck at the start no
matter where you click. This is only a local-testing quirk; it disappears
once deployed.

**On file size — this matters more than it might seem, given free hosting.**
GitHub refuses to accept any single file over 100MB outright. More
importantly: Vercel's free plan caps the *entire site* at 100GB of bandwidth
a month, and crossing that pauses the whole site until the next month — not a
slowdown, an outage. A self-hosted video eats into that cap every single time
someone opens it; an embedded YouTube/Vimeo video costs you nothing at all
against it, since it streams from their servers instead. Rough numbers: a
20MB clip allows roughly 5,000 plays a month before hitting the cap; a full
100MB file, closer to 1,000. Keep anything self-hosted short — aiming for
under ~15–20MB (about 20–30 seconds at 1080p, `.mp4`, ~5 Mbps) keeps this
comfortably safe. For anything longer than a teaser, `embed` isn't just
easier, it's the more reliable choice for whoever's watching.

---

## Adding a treatment (PDF flip-through)

Same idea, but in the `TREATMENTS` list, and with one extra field:

```js
{
  title: `Name of the treatment`,
  meta: `Treatment · Year`,
  blurb: `One short line for the reel.`,
  cover: `images/your-image.jpg`,
  ratio: `3/4`,
  pdf: `documents/your-treatment.pdf`,
  description: `The longer text for the pop-up.`,
  credits: [`Written by — Name`],
},
```

Drop the PDF file itself into the `documents/` folder, and point `pdf` at it.
The pop-up shows it as slides with prev/next arrows, a page counter, arrow-key
navigation, and clicking the slide itself also advances to the next page.

If a work has both `pdf` and `embed`, the PDF wins. Delete `pdf` and add
`embed` instead if you'd rather that particular one play a video like a Film
entry does.

The PDF-reading library only loads when someone actually opens a treatment —
Film and Photography pages never download it, so they stay just as light as
before.

---

## Editing the profile page

Same file, further down, in `SITE.profile`. Each string in `body` is one
paragraph — add or delete as many as you like. `details` is the small label/value
list, `links` is the row of contact links at the bottom.

`SITE.name` is the script wordmark in the top-left of every page.

---

## Changing the look

Everything visual is at the top of `style.css`:

```css
--paper:      #FBFCFE;   /* background            */
--blue:       #5B84C9;   /* display type, accents */
--blue-deep:  #2E4C93;   /* body text             */
--blue-mist:  #9DB2E0;   /* captions              */
--hairline:   #DCE4F5;   /* rules and threads     */
```

`--blue-deep` is deliberately darker than `--blue`. If you lighten it, small
text stops being readable against the paper — the cornflower on its own doesn't
have enough contrast at 11–14px.

**Don't add letter-spacing to `.script`.** It's currently `letter-spacing: 0`,
and that's load-bearing, not just a style choice. Pinyon Script (like most
connecting cursive fonts) only draws its letters touching correctly when
tracking is at *exactly* zero — even a tiny offset like `0.01em` breaks the
joined-up look for the whole typeface, and no amount of negative spacing
brings it back, since the letters just crowd together without ever actually
reconnecting. If a specific letter pair still shows a small gap even at zero
(a few do — it's a property of the font's own glyphs, not something CSS can
fix), that's expected and not a setting to chase further.

**Drift speed** is `DRIFT_SPEED` at the top of `app.js`, in pixels per second.
22 is a slow walking pace. `RESUME_AFTER` is how long the reel waits after you
stop touching it before it starts drifting again.

**A different script face.** Download one from fonts.google.com as `.woff2`,
drop it in `fonts/`, then point the `@font-face` in `fonts.css` at the new file
and change `--script` in `style.css`. Closest alternatives to Pinyon Script:
Italianno (thinner, more flourish), Great Vibes (heavier, rounder), Tangerine
(very light). Worth testing any candidate against the actual names/words used
on the site before committing — the same "some letter pairs don't connect"
issue can show up differently in a different typeface.

---

## Publishing — GitHub + Vercel

This is the path this site is actually built for. Netlify Drop, GitHub Pages,
and similar all work too, in case anything ever changes, but the steps below
assume GitHub + Vercel throughout.

1. **Push the whole folder to a GitHub repository.** If you're starting from
   scratch:
   ```
   cd portfolio
   git init
   git add -A
   git commit -m "start"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
2. **In Vercel, "Add New… → Project" and import that repository.**
3. **On the import screen, set Framework Preset to "Other."** There's no
   build step — leave the Build Command empty and the Output Directory as
   the project root. Vercel will just serve the files as they are.
4. **Deploy.** From here on, every `git push` to `main` triggers a new
   deployment automatically — no dashboard visits needed for routine updates.

**Two free-tier limits worth knowing about up front**, since they're easy to
hit by surprise with video/image-heavy content and neither shows up as an
error message until it happens:

- **GitHub blocks any single file over 100MB.** The push just fails outright.
- **Vercel's free (Hobby) plan caps total bandwidth at 100GB a month, for the
  whole site combined** — and going over it pauses the site until next month
  rather than slowing it down or charging more. See the video section above
  for what this means in practice for self-hosted clips.

Also worth a quick look: Vercel's Hobby plan is licensed for personal,
non-commercial use. A working director's professional portfolio may or may
not fall inside that depending on how it's used — worth checking Vercel's
current terms rather than assuming, since it's a licensing condition, not a
technical limit that would show up as a warning.

---

## Accessibility and behaviour, briefly

- The reel pauses on hover, drag, scroll, keyboard focus, and when the tab is
  in the background. It resumes after a couple of seconds of stillness.
- It doesn't drift at all for anyone who has "reduce motion" turned on.
- On Film and Treatments, every plate is a real button, so the reel is fully
  keyboard-navigable. On Photography, plates aren't buttons at all — there's
  nothing for a keyboard or screen reader to activate, since there's nothing
  to open.
- The duplicated set used for the seamless loop is hidden from screen readers
  and skipped by Tab.
- The pop-up is a native `<dialog>`: Escape closes it, focus returns to the
  plate you came from, and the video/PDF viewer's own listeners are torn down
  on close.
