# Task: re-theme the Alimo EduCloud marketing site to the company brand (orange and black)

You are working in a static demo site for **Alimo EduCloud**, a school management
product by Alimo Digital Innovations Ltd. The client wants the **marketing site**
re-themed from its current slate-and-blue palette to the company's brand colours:
**orange and near-black**, matching https://www.alimodigitalinnovations.com/

Read this whole brief before changing anything. The exact brand values are given
below, already extracted from the live company site, so do not guess at them and
do not re-derive them.

---

## 1. Scope: the marketing site only

**In scope. These four files, and nothing else:**

```
index.html      Landing page: nav, hero, features, how-it-works, editions, demo form, footer
privacy.html    Privacy policy (shares style.css, plus a small inline <style> block)
terms.html      Terms of service (same arrangement)
style.css       The whole design system. Token block at :root, around line 36
```

**Explicitly out of scope. Do not open, edit, or rebuild:**

```
portal/         The live demo app, a Vite project. Keeps its existing slate-and-blue theme.
portal/dist/    Committed build output. No rebuild is needed or wanted.
main.js         Nav toggle, form validation, copyright year. Contains no colour logic.
vercel.json     Deploy configuration.
```

The portal is a separate, deliberate decision by the client. If you believe it
should also change, say so in your report. Do not act on that belief.

There is **no build step** for this work. The marketing site is hand-written
static HTML and CSS. Do not add a bundler, a framework, or a CSS preprocessor.

---

## 2. The one thing this scope makes tricky: the hero

`index.html` contains a hand-built replica of the portal's admin dashboard,
inside a browser frame in the hero. Look for `.portal-shot` and its children
(`.portal-shot-rail`, `.portal-tile`, `.portal-shot-panel`). It is live markup,
not a screenshot, and it carries the demo's real figures.

**It is a depiction of the real portal. The portal is not changing, so the
replica must not change either.** Keep its dark slate rail, its blue accents and
its existing tile colours exactly as they are.

Colouring it orange would advertise a product that does not exist. The demo is
one click away, so anyone comparing would see the discrepancy immediately. This
is not a stylistic preference, it is an accuracy requirement.

A product screenshot carrying its own interface colours inside a branded
marketing page is completely normal and reads correctly. What you should do is
make sure the surrounding frame, caption and call-to-action button sit
comfortably against it: the frame border, the `.frame-cta` pill, the
`.browser-bar` and the `.visual-note` caption are all site chrome and **should**
take the new brand palette. The screen inside the frame should not.

If the result looks genuinely bad once rendered, report it with a screenshot
rather than quietly re-colouring the replica.

---

## 3. The brand palette (authoritative, already verified)

Extracted from the live company site's CSS custom properties, then converted from
HSL to hex. These are exact, not approximations.

| Role | Hex | Source HSL | Where the brand uses it |
|---|---|---|---|
| Primary orange | `#E05D06` | `hsl(24 95% 45%)` | Buttons, icon tiles, stat numbers, one highlighted word per headline |
| Accent orange (lighter) | `#F2690D` | `hsl(24 90% 50%)` | Hover states |
| Near-black | `#0F0F0F` | `hsl(0 0% 6%)` | Full-bleed dark sections, footer |
| Body text | `#141414` | `hsl(0 0% 8%)` | All primary text |
| Muted surface | `#F6F5F4` | `hsl(30 10% 96%)` | Alternating band, a warm off-white |
| Muted text | `#666666` | `hsl(0 0% 40%)` | Secondary and caption text |
| Border | `#E8E6E3` | `hsl(30 10% 90%)` | Card and input borders, warm-tinted |
| Page background | `#FFFFFF` | - | Default page surface |
| Destructive | `#EF4444` | `hsl(0 84.2% 60.2%)` | Errors |

Note the neutrals are **warm** (`#F6F5F4`, `#E8E6E3`, hue 30), not the cool slate
greys currently in use. Keep that warmth. Pairing a warm orange with cool grey
borders is what makes a palette like this look cheap.

One caveat on the page background: the current site uses `#F8FAFC` rather than
pure white, because the client's design brief says not to use pure white as the
page background. The brand's own warm muted tone `#F6F5F4` is a good substitute
for the page background, with white reserved for cards. Decide, and say which you
chose.

### How the brand actually applies the colour

From a full-page render of the company site:

- Page is white, with full-bleed near-black sections for contrast, and one
  full-bleed orange band for the closing call to action.
- Orange appears as **small, deliberate marks**: a filled rounded-square icon
  tile with a white glyph, a stat number, a button, one highlighted word in a
  headline, a small pill badge (pale orange background with orange text).
- Cards are white, thin warm border, radius around 8px, barely any shadow.
- Orange is never the background of a large reading surface.

Match that restraint. Orange is an accent, not a theme.

---

## 4. The accessibility problem, and exactly how to solve it

**This is the most important section. Do not skip it.**

The brand orange fails WCAG AA for normal-size text. Measured:

| Pair | Ratio | AA needs | Result |
|---|---|---|---|
| `#E05D06` text on white | **3.66:1** | 4.5 | **fails** |
| White text on `#E05D06` button | **3.66:1** | 4.5 | **fails** |
| `#F2690D` text on white | **3.09:1** | 4.5 | **fails** |
| `#141414` text on `#E05D06` | 5.03:1 | 4.5 | passes |
| `#E05D06` on `#0F0F0F` | 5.24:1 | 4.5 | passes |
| `#141414` on white | 18.42:1 | 4.5 | passes |
| `#666666` on white | 5.74:1 | 4.5 | passes |
| `#666666` on `#F6F5F4` | 5.27:1 | 4.5 | passes |
| White on `#0F0F0F` | 19.17:1 | 4.5 | passes |

The company's own site ships the failing combination (white text on an orange
button). **Do not copy that bug.** Match the brand's colour, fix its contrast.

Apply these rules:

1. **Small orange text on light surfaces** (links, labels, captions, badges, the
   `.eyebrow`, the `.required` asterisk, under 24px): use the darkened
   **`#BD4E05`** (`hsl(24 95% 38%)`, **4.93:1** on white). It reads as the same
   orange at text size. `#C75305` (`hsl(24 95% 40%)`) is the absolute lightest
   that passes, at 4.50:1, with no margin for error. Prefer `#BD4E05`.

2. **Orange buttons and filled controls** (`.btn-primary`, `.nav-cta`,
   `.btn-submit`, `.frame-cta`). Pick one and use it consistently:
   - `#E05D06` background with `#141414` text (5.03:1). This is orange-on-black,
     strongly on brand, and keeps the exact brand orange.
   - `#BD4E05` background with `#FFFFFF` text (4.93:1).

   The first option is the better match for the brand's own look.

3. **Large display text** (24px and up, or 19px bold) only needs 3.0:1, so
   `#E05D06` is fine for a highlighted headline word or a big `.stat-value`.

4. **Non-text marks** (`.stat-bar-fill`, `.step-number`, focus rings, borders on
   active elements) need 3.0:1 against their adjacent surface. `#E05D06` is fine
   on white and on the muted band.

5. **Focus rings must stay visible.** `a:focus-visible` and `.btn:focus-visible`
   currently use `--accent`. Whatever orange you choose must remain clearly
   visible against both the page background and the dark footer.

Define both oranges as separate tokens so this stays enforceable, for example
`--accent` (`#E05D06`, for fills and large marks) and `--accent-text`
(`#BD4E05`, for small text on light surfaces). Do not collapse them into one.

---

## 5. Typography

The current typeface is **Public Sans**, loaded from Google Fonts and referenced
by the `--font-display` and `--font-sans` tokens. The brand site uses **Poppins**
for headings and **Inter** for body.

There is a hard constraint from the client's design brief: **Inter is not
permitted.** Poppins is.

Recommended:

- **Poppins** (600/700) for `--font-display`, which drives `h1`-`h4`, the
  `.wordmark` and `.stat-value`. This matches the brand's geometric headline look.
- **Keep Public Sans** for `--font-sans`, which carries body copy, form controls
  and table text.
- Load only the weights actually used. Update the Google Fonts `<link>` in
  `index.html`, `privacy.html` and `terms.html`. Do not touch
  `portal/index.html`.

Note that the hero replica currently inherits `--font-sans`. Since the portal
uses Public Sans, leaving the replica on Public Sans keeps it accurate. If you
change `--font-sans`, pin the replica to Public Sans explicitly.

---

## 6. Design constraints, carried over from the client's brief

These were set by the client and still apply:

- Do not use Inter, Geist, Space Grotesk, or Lucide icons.
- **No harsh gradients.** The brand site uses an orange gradient and a glow
  shadow. Take the palette; leave those treatments behind. Flat orange only.
- No radial orbs, dot grids, glassmorphism, decorative stripes, sparkle icons,
  emojis, or animated arrows.
- Do not put shadows on everything. Thin borders carry the structure here.
- Do not round every corner. The existing 6px/12px scale is deliberate.
- Keep motion restrained and respect `prefers-reduced-motion`, which the current
  CSS already honours for the mobile nav.
- Hierarchy comes from typography, spacing and alignment, not from decoration.
- Do not default to three feature cards, bento grids, or decorative terminal
  windows.

---

## 7. What must NOT change

- **Any content, copy or figure.** This is a colour and type change only. The
  numbers on the landing page (20 students, 7 teachers, ₦1,195,000 collected,
  88%, ₦165,000 outstanding, 5 owing, 176 of 200 attendance days, the report card
  rows, the exam configuration) are the live demo's real data and are quoted
  deliberately. Changing them would make the page inaccurate.
- **The honest copy.** Earlier work removed invented statistics, a fake payment
  gateway, a timetable module that does not exist, and a form that pretended to
  submit. Do not reintroduce marketing claims the product cannot back.
- **The `[PENDING: …]` draft markers** in `privacy.html` and `terms.html`. They
  mark legal details awaiting client confirmation. Restyle the `.draft-notice`
  block to suit the new palette; do not remove the markers.
- **Layout and structure.** Sections, grid, responsive breakpoints and the mobile
  nav behaviour all stay. If a colour change exposes a layout problem, fix that
  problem, but do not restructure the page.
- `main.js`, including the deliberate "not connected to an inbox" form status.
- Everything under `portal/`.

---

## 8. Where the colour actually lives

- `style.css`, the `:root` token block near **line 36**, is the main edit. Most
  of the file already uses tokens, so this does most of the work.
- Then sweep for values baked into individual rules. Known spots:
  - `--shadow-sm` and `--shadow-md`, built on `rgba(15,23,42,…)`, a slate tint
    that should become a warm or neutral black.
  - The inline SVG select arrow in the `select` rule, URL-encoded as
    `stroke='%235E6D83'`.
  - `.edition-card--featured`, a dark card with its own colours including
    `#93C5FD` on the badge and `#CBD5E1` on the body text. Note it uses the
    selector `.edition-card.edition-card--featured p` to win a specificity fight;
    keep that.
  - `.form-status` success, error and notice states, plus `.field-error`.
  - `.frame-cta`, which has its own shadow.
- `privacy.html` and `terms.html` each carry an inline `<style>` block with a
  `.draft-notice` using `#FFFBEB`, `#FDE68A` and `#92400E`.
- Leave every `.portal-shot*` and `.portal-tile*` rule alone, per section 2.

---

## 9. How to verify, without guessing

A browser is available and you are expected to actually look at the result.
Chrome is installed at `C:/Program Files/Google/Chrome/Application/chrome.exe`,
and Node 24 has a native `WebSocket`, so you can drive Chrome over CDP directly
with no extra dependencies. Do not install Playwright or Puppeteer.

Method that works here:

1. Serve the repo root over HTTP with a small Node static server.
2. Launch Chrome with `--headless=new --remote-debugging-port=9222
   --remote-allow-origins=*`, poll `http://127.0.0.1:9222/json/list` for the page
   target, and connect to its `webSocketDebuggerUrl`.
3. `Emulation.setDeviceMetricsOverride` for the width, `Page.navigate`, wait for
   the webfont, then `Page.captureScreenshot` with `captureBeyondViewport: true`.
4. For close inspection, pass a `clip` built from an element's
   `getBoundingClientRect()` plus a `scale` of 1.5 to 2.

Navigate and screenshot **at minimum**:

- `index.html` at 1440 wide and at 390 wide
- The hero in close-up, to confirm the replica still reads correctly against the
  new palette
- The editions section, which contains the dark featured card
- The demo form, including its error and success states
- `privacy.html` and `terms.html`, for the draft notice

Then check, and report what you actually observed:

- **Contrast.** Compute real WCAG ratios for every new token pair rather than
  eyeballing. Every text pair must clear 4.5:1, or 3.0:1 for large text and
  non-text marks. Report the numbers.
- **Cascade, not source.** Read computed styles out of the live DOM with
  `getComputedStyle`, not from the CSS file. A previous pass on this repo set a
  colour correctly in the source and it still rendered wrong, because a later
  rule of equal specificity overrode it. Checking the file would not have caught
  it; checking the rendered page did. `.edition-card--featured p` is exactly
  where this happened.
- **The main action.** Drive the demo form for real: submit it empty, submit it
  with an invalid email, then submit it valid. Confirm the error text, the
  `aria-invalid` attributes, the focus move to the first invalid field, and the
  status message all still work and are legible in the new palette.
- **Overflow at 390px.** Confirm `document.documentElement.scrollWidth` is not
  greater than `clientWidth`, and list any element whose right edge exceeds the
  viewport.
- **Leftovers.** Grep the four in-scope files for the old blue and slate values
  (`#2563EB`, `#1D4ED8`, `#0F172A`, `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#475569`,
  `#5E6D83`, `#CBD5E1`, `#93C5FD`) and confirm none remain except inside the
  `.portal-shot*` rules, where they are correct and intentional.

---

## 10. Definition of done

- [ ] The marketing site uses the brand palette: orange accent, near-black, warm
      neutrals.
- [ ] Every text pair passes WCAG AA, with the measured ratios reported.
- [ ] Orange is used as an accent, not as a large reading surface.
- [ ] Neutrals are warm, not slate.
- [ ] The hero's portal replica is unchanged and still matches the real portal.
- [ ] No gradients, glows, or decoration added.
- [ ] Nothing under `portal/` was modified. `git status` proves it.
- [ ] No copy, figures, layout or form behaviour changed.
- [ ] The demo form still validates, focuses and reports correctly.
- [ ] No horizontal scroll at 390px on any of the three pages.
- [ ] Screenshots taken at desktop and mobile, and genuinely inspected.
- [ ] Report states what was tested, what was observed, and what was not checked.

Do not claim to have inspected a page you did not render. If something could not
be verified, say so plainly.

---

## 11. Judgement calls worth flagging back

Raise these rather than deciding silently:

- **Orange buttons: black text or white text.** Both pass. Black-on-orange is
  closer to the brand; white-on-darker-orange is more conventional. Pick one,
  apply it consistently, and say which you chose and why.
- **Page background.** Warm `#F6F5F4` versus keeping a very light neutral. The
  client's brief rules out pure white for the page background.
- **The portal still being blue.** Once the site is orange, the two halves no
  longer match. The client has chosen this deliberately and it is out of scope,
  but include an honest note in your report on how the seam looks in practice,
  especially at the hero and on the "Live Demo" link, so they can decide later
  with real information rather than a guess.
