# Task: add a dark colour scheme to the Alimo EduCloud marketing site

You are working in a static demo site for **Alimo EduCloud**, a school management
product by Alimo Digital Innovations Ltd. The marketing site was recently
re-themed to the company brand (orange `#E05D06` on near-black, warm neutrals).
That work is committed and correct. See `RETHEME-BRIEF.md` for the palette
reasoning, which still applies.

The site currently has **no dark mode at all**: no `prefers-color-scheme` query,
no `color-scheme` declaration, no theme attribute, no JavaScript. This task adds
one.

Read this whole brief before changing anything. The dark palette below has
already been measured against WCAG, so do not guess at values and do not
re-derive them.

---

## 1. Scope

**In scope. These four files, and nothing else:**

```
style.css       The design system. Token block at :root, line 38
index.html      Landing page
privacy.html    Privacy policy — carries an inline <style> block
terms.html      Terms of service — same arrangement
```

**Explicitly out of scope. Do not open, edit, or rebuild:**

```
portal/         The live demo app, a Vite project. Stays light-only.
portal/dist/    Committed build output. No rebuild is needed or wanted.
main.js         Nav toggle, form validation, copyright year. No colour logic.
vercel.json     Deploy configuration.
```

There is **no build step**. Do not add a bundler, a framework, or a CSS
preprocessor. Do not add a CSS-in-JS runtime or a theme library.

**This work is additive.** The light theme is signed off. If a light-mode value
renders differently after your change, that is a regression, not an improvement.
Do not "while I'm here" the light palette.

---

## 2. The thing that makes this tricky: the hero replica stays light

`index.html` contains a hand-built replica of the portal's admin dashboard inside
a browser frame in the hero (`.portal-shot` and children, `style.css` lines
**928-1071**). It is live markup, not a screenshot, and it carries the demo's
real figures.

Those rules were deliberately pinned to **literal** slate-and-blue values
(`#0F172A`, `#1E293B`, `#2563EB`, `#60A5FA`, `#94A3B8`, `#E2E8F0`, `#F1F5F9`)
rather than tokens, precisely so a theme change cannot leak into them.

**Keep it that way. The replica must render identically in both schemes.**

The portal is not being dark-themed. A dark replica would advertise a product
that does not exist, and the demo is one click away, so anyone comparing would
see the discrepancy immediately. This is an accuracy requirement, not a
stylistic preference. It is the same argument the re-theme brief made, and it has
not changed.

Do not convert those literals to tokens. Do not add a `prefers-color-scheme`
override inside the `.portal-shot*` block. If you find yourself wanting to, stop
and report it instead.

**What this does create is a real design problem worth your attention:** in dark
mode the replica becomes a light rectangle, and will be the brightest object on
the page. The surrounding chrome — the `.browser-frame` border and shadow, the
`.browser-bar`, the `.frame-cta` pill, the `.visual-note` caption — is site
chrome and **should** take the dark palette. Make sure the frame reads as a
deliberate window onto a light product, not as a hole punched in the page. A
slightly stronger frame border, and dropping the shadow, is usually enough.
Report how it actually looks.

---

## 3. Mechanism

Implement as tokens only, with no JavaScript, structured so a toggle can be added
later without restructuring the CSS:

```css
:root {
  color-scheme: light;
  /* existing light tokens, unchanged */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    /* dark tokens */
  }
}

:root[data-theme="dark"] {
  color-scheme: dark;
  /* the same dark tokens */
}
```

Three requirements on this:

1. **`color-scheme` is not optional.** The demo form has text inputs, a `select`,
   a `textarea` and a checkbox. Without `color-scheme: dark` you get white native
   controls, white autofill and a white scrollbar on a dark page.
2. **Guard the media query with `:not([data-theme="light"])`** so a future
   explicit light choice can win over the OS preference.
3. **Define the dark tokens once and reuse them.** Duplicating the block between
   the media query and the attribute selector is acceptable if you keep them
   literally identical; drifting copies is the failure mode here.

**Do not add a visible theme toggle in this pass** unless you flag it first — see
§11. A toggle needs a control in the nav, `localStorage`, and an inline blocking
script in `<head>` to avoid a flash of the wrong theme, which touches `main.js`
and all three pages. That is a separate, larger change.

---

## 4. The dark palette (authoritative, already measured)

Warm darks, to match the warmth decision on the light side. Cool slate darks
would reintroduce exactly the cheap warm-orange-on-cool-grey pairing the
re-theme brief warned about.

Note the page background is **not** pure black, mirroring the client's existing
rule against pure white as the page background.

| Token | Light (unchanged) | Dark | Role |
|---|---|---|---|
| `--bg` | `#F6F5F4` | `#121110` | Page background |
| `--bg-raised` | `#FFFFFF` | `#1C1A19` | Card and input surface |
| `--bg-section` | `#EDECEA` | `#191717` | Alternating band |
| `--bg-deep` | `#0F0F0F` | `#0B0A0A` | Footer and card hover fill |
| `--ink` | `#141414` | `#F5F3F1` | Primary text |
| `--ink-2` | `#666666` | `#B5AFA9` | Secondary text |
| `--ink-3` | `#6E6A66` | `#908A84` | Tertiary and caption text |
| `--ink-inverse` | `#F6F5F4` | `#F5F3F1` | Text on `--bg-deep` |
| `--accent` | `#E05D06` | `#E05D06` | **Unchanged.** Fills, large marks |
| `--accent-text` | `#BD4E05` | `#FB923C` | **Inverts.** Small text. See §5 |
| `--accent-dark` | `#BD4E05` | `#F2690D` | Hover on filled controls |
| `--accent-light` | `#FEE9D6` | `#3A2410` | Focus-ring glow, badge fill |
| `--border` | `#E8E6E3` | `#2E2B29` | Decorative separators |
| `--border-strong` | `#D1CFC9` | `#6E6A66` | Input borders. See §5 |
| `--success-bg` | `#ECFDF5` | `#0E2A1E` | Status surface |
| `--success-text` | `#065F46` | `#6EE7B7` | Status text |
| `--danger-bg` | `#FEF2F2` | `#2C1414` | Status surface |
| `--danger-text` | `#991B1B` | `#FCA5A5` | Status text |

`--radius`, `--gap`, the type scale and the font tokens do not change.

---

## 5. Accessibility: the inversion trap

**This is the most important section. Do not skip it.**

The re-theme defined two orange tokens because `#E05D06` fails AA as small text
on white. **In dark mode that logic reverses**, and the darkened orange becomes
the failure:

| Pair | Ratio | AA needs | Result |
|---|---|---|---|
| `#BD4E05` small text on `#121110` | **3.82:1** | 4.5 | **fails** |
| `#FB923C` small text on `#121110` | 8.33:1 | 4.5 | passes |
| `#FB923C` small text on `#1C1A19` | 7.66:1 | 4.5 | passes |
| `#FB923C` small text on `#0B0A0A` | 8.74:1 | 4.5 | passes |
| `#F5F3F1` on `#121110` | 17.04:1 | 4.5 | passes |
| `#B5AFA9` on `#121110` | 8.68:1 | 4.5 | passes |
| `#B5AFA9` on `#1C1A19` | 7.98:1 | 4.5 | passes |
| `#908A84` on `#121110` | 5.53:1 | 4.5 | passes |
| `#908A84` on `#1C1A19` | 5.08:1 | 4.5 | passes |
| `#141414` on `#E05D06` (button) | 5.03:1 | 4.5 | passes |
| `#E05D06` as fill on `#121110` | 5.15:1 | 3.0 | passes |
| `#E05D06` as fill on `#1C1A19` | 4.74:1 | 3.0 | passes |
| `#6E6A66` border on `#1C1A19` | 3.23:1 | 3.0 | passes |
| `#6EE7B7` on `#1C1A19` | 11.38:1 | 4.5 | passes |
| `#FCA5A5` on `#1C1A19` | 9.14:1 | 4.5 | passes |

Rules:

1. **`--accent` does not change between schemes.** It is the brand orange and it
   works as a fill and as large display text in both. Keep it pinned.
2. **`--accent-text` must get lighter in dark mode, not darker.** Every site that
   gets this wrong does so by reusing the light-mode darkened orange. `#FB923C`.
3. **Buttons need no colour change at all.** `#141414` text on `#E05D06` is
   5.03:1 in either scheme. `.btn-primary`, `.nav-cta`, `.btn-submit` and
   `.frame-cta` should look identical in both themes. This is a feature; do not
   "fix" it.
4. **Input borders are a required UI indicator** and need 3.0:1 against the field
   surface, which is why `--border-strong` jumps to `#6E6A66` in dark mode.
   Decorative card and section borders are **not** covered by WCAG 1.4.11 and
   should stay at `--border` (`#2E2B29`, 1.34:1). Forcing 3.0:1 on every
   separator would put glaring light lines around every card. If you disagree,
   flag it rather than changing it.
5. **Focus rings must stay visible in both schemes.** `a:focus-visible` and
   `.btn:focus-visible` use `--accent`, which is 5.15:1 on the dark page and
   4.74:1 on dark cards. Verify on the footer too.

Compute real ratios for any pair you introduce that is not in the table above,
and report the numbers. Do not eyeball.

---

## 6. Dark-on-dark: the two surfaces that stop working

Both of these currently use near-black **for contrast against a light page**. In
dark mode that relationship collapses and has to be inverted.

### 6a. The footer (`style.css` 777-818)

`.site-footer` is `--bg-deep`. On a dark page it stops being distinguishable.
`--bg-deep` is `#0B0A0A` in dark mode, i.e. *darker* than the page, which
preserves the separation. Verify it actually reads; if it does not, a top border
is the fallback, not a lighter fill.

The footer's text colours are currently **hard-coded literals**, because until
now it was the only dark surface on the site:

```
789  .footer-brand .wordmark          #FFFFFF
790  .footer-brand .wordmark-accent   #FDBA74
793  .footer-tagline                  #D4D0CB
799  .footer-address                  #888480
810  .footer-links a                  #D4D0CB
811  .footer-links a:hover            #FFFFFF
815  .footer-legal p                  #888480
779  .site-footer border-top          #333330
```

These are correct in light mode and happen to be close to correct in dark mode,
since the surface stays dark. **Tokenise them anyway** — introduce footer-scoped
tokens (or reuse `--ink-inverse` and add an `--ink-inverse-2`) so the footer is
not a pocket of literals the next theme change has to rediscover. Keep the
rendered light-mode result identical.

### 6b. The edition card hover (`style.css` 592-619)

`.edition-card:hover` and `:focus-within` turn **any** card from white to
`--bg-deep` with white / `#D4D0CB` / `#FDBA74` text and a lifted shadow. In dark
mode a card that is already dark hovering to near-black gives **no visible
feedback at all**, and the shadow is invisible.

In dark mode the hover must move the other way: lighten the surface, or hold the
surface and move the border to `--accent`. Pick one, keep the transform, and
state which you chose. The hover text literals (`#FFFFFF`, `#D4D0CB`, `#FDBA74`)
need dark-scheme equivalents that pass against whatever surface you land on.

Two notes on this block:

- `.edition-card.edition-card--featured p` at line **573** and the matching
  hover rule at **610-611** use a doubled class to win a specificity fight. The
  featured card no longer has its own persistent background, so these look
  redundant. **They are not safe to delete** — leave them alone; that is not this
  task.
- `--ink-inverse` is used in exactly one place, line **598**. Keep it meaningful.

---

## 7. Where the rest of the colour lives

Sweep these. Each is a value baked into a rule rather than a token:

- **Shadows, lines 61-62.** `--shadow-sm` and `--shadow-md` are
  `rgba(15,15,15,...)` and are invisible on a dark background. This design system
  is border-led by intent, so flatten both to `none` in dark mode and let
  `--border` carry the structure. Do **not** substitute a glow — the re-theme
  brief forbids glows and that still holds.
- **Extra hard-coded shadows** at lines **343** (`.frame-cta`) and **600**
  (`.edition-card:hover`), both `rgba(15,15,15,...)`. Same treatment.
- **The select arrow, line 697.** The chevron is a URL-encoded inline SVG with a
  hard-coded `stroke` of `#666666`. A data URI **cannot** read a CSS custom
  property, so dark mode needs a second `background-image` declaration with a
  lighter stroke. This is the single most commonly missed item in a change like
  this.
- **`.field-error` (731) and the invalid-field ring (742)**, which uses a
  hard-coded `rgba(220,38,38,0.16)`.
- **`.form-status` states (753, 759, 766).** Success and error pull from tokens
  but hard-code their borders (`#A7F3D0`, `#FECACA`). The `notice` state is fully
  hard-coded (`#FFFBEB`, `#FDE68A`, `#92400E`) and is the one the live form
  actually shows, since the form is deliberately not connected to an inbox.
  All three are pale surfaces with dark text and will glow on a dark page.
- **The focus-ring glow, line 693**, `box-shadow: 0 0 0 3px var(--accent-light)`.
  Driven by the token, so it flips for free — confirm it is actually visible
  against the dark input surface.
- **`accent-color: var(--accent)` on the checkbox, line 725.** Works in both
  schemes once `color-scheme` is set. Verify, do not assume.
- **`.draft-notice` in `privacy.html` and `terms.html`**, inline `<style>` at
  lines **21-29** of each, using `#FEF3E2` / `#FDBA74` / `#7C3A06`. A pale amber
  panel on a dark page. Either duplicate the media query into both inline blocks
  or move the rule into `style.css` — moving it is cleaner, but say what you did.
  **Do not remove the `[PENDING: ...]` markers** in the body copy; they mark
  legal details awaiting client confirmation.

---

## 8. Typography — no changes

`--font-display` is Poppins (600/700), `--font-sans` is Public Sans
(400/500/600/700). Both are correct and the Google Fonts links in all three pages
are already right.

**Do not touch the font links.** A previous pass dropped Public Sans 700 from the
link while `.portal-shot-brand` and `.portal-tile-value` still used weight 700,
which silently gave the replica synthetic bold. That is fixed. Leave it fixed.

---

## 9. Design constraints, carried over

Still in force from the client's brief:

- Do not use Inter, Geist, Space Grotesk, or Lucide icons.
- **No gradients and no glows.** Dark themes attract both. Flat colour only.
- No radial orbs, dot grids, glassmorphism, decorative stripes, sparkle icons,
  emojis, or animated arrows.
- **Do not reach for shadows to create depth in dark mode.** Surface steps and
  thin borders carry it here.
- Do not round every corner. The 6px/12px scale is deliberate.
- Keep motion restrained and respect `prefers-reduced-motion`, which the current
  CSS already honours for the mobile nav.
- Orange stays an accent, never the background of a large reading surface. This
  matters more in dark mode, where a large orange area is genuinely painful.
- Hierarchy comes from typography, spacing and alignment, not decoration.

---

## 10. What must NOT change

- **Any content, copy or figure.** This is a colour change only. The numbers on
  the landing page (20 students, 7 teachers, ₦1,195,000 collected, 88%,
  ₦165,000 outstanding, 5 owing, 176 of 200 attendance days, the report card
  rows, the exam configuration) are the live demo's real data, quoted
  deliberately. Changing them would make the page inaccurate.
- **The honest copy.** Earlier work removed invented statistics, a fake payment
  gateway, a timetable module that does not exist, and a form that pretended to
  submit. Do not reintroduce claims the product cannot back.
- **The light theme's rendered output.** Byte-level identity is not required, but
  every computed colour in light mode must match what it is today.
- **The hero replica**, per §2.
- **The `[PENDING: ...]` markers** in the legal pages.
- **Layout and structure.** Sections, grid, breakpoints and the mobile nav
  behaviour all stay. If a colour change exposes a layout problem, fix that
  problem, but do not restructure the page.
- `main.js`, including the deliberate "not connected to an inbox" form status.
- Everything under `portal/`.

---

## 11. Judgement calls — flag these, do not decide silently

- **Toggle or OS-only.** This brief specifies OS-only with `[data-theme]` hooks
  in place. If you think the client needs a visible switch now, say so and what
  it would cost; do not build it unasked.
- **The edition card hover direction in dark mode** (§6b): lighten the surface,
  or hold the surface and accent the border. Say which and why.
- **The footer separation** (§6a): darker-than-page fill, or a border. Say which
  you ended up with and whether it actually reads.
- **The light replica inside the dark hero** (§2). This is the one thing in this
  task that cannot be predicted from contrast numbers. Report what it looks like,
  with a screenshot, and say plainly if it looks bad. Do not re-colour the
  replica to fix it.
- **The status and draft-notice palettes.** Green, amber and red on dark is where
  brand-neutral semantics and a warm orange brand can start to fight. If your
  dark values look foreign against the palette, flag it.

---

## 12. How to verify, without guessing

A browser is available and you are expected to actually look at the result.
Chrome is at `C:/Program Files/Google/Chrome/Application/chrome.exe`, and Node 24
has a native `WebSocket`, so you can drive Chrome over CDP directly with no extra
dependencies. **Do not install Playwright or Puppeteer.**

Method that works here:

1. Serve the repo root over HTTP with a small Node static server.
2. Launch Chrome with `--headless=new --remote-debugging-port=9222
   --remote-allow-origins=*`, poll `http://127.0.0.1:9222/json/list` for the page
   target, connect to its `webSocketDebuggerUrl`.
3. **Force the scheme with CDP, do not rely on the host OS setting:**
   `Emulation.setEmulatedMedia` with
   `{ features: [{ name: 'prefers-color-scheme', value: 'dark' }] }`, and again
   with `'light'` for the control pass.
4. `Emulation.setDeviceMetricsOverride` for the width, `Page.navigate`, wait for
   the webfont, then `Page.captureScreenshot` with `captureBeyondViewport: true`.
5. For close inspection, pass a `clip` from an element's
   `getBoundingClientRect()` with a `scale` of 1.5 to 2.

Screenshot **at minimum**, in **both schemes**:

- `index.html` at 1440 wide and at 390 wide
- The hero in close-up, to judge the light replica against the dark page
- The editions section, including a forced `:hover` / `:focus-within` state on a
  card — drive focus with CDP rather than trusting the static render
- The demo form in its default, error and success/notice states
- The footer
- `privacy.html` and `terms.html`, for the draft notice

Then check, and report what you actually observed:

- **Contrast.** Real computed WCAG ratios for every new pair, not eyeballed.
  4.5:1 for text, 3.0:1 for large text and required non-text indicators. Report
  the numbers.
- **Cascade, not source.** Read colours out of the live DOM with
  `getComputedStyle` under emulated dark, not from the CSS file. A previous pass
  on this repo set a colour correctly in the source and it still rendered wrong,
  because a later rule of equal specificity overrode it. Checking the file would
  not have caught it; checking the rendered page did.
  `.edition-card--featured p` is exactly where that happened.
- **The light theme did not move.** Dump computed colours for a fixed list of
  elements under emulated *light* before and after your change and diff them.
  This is the main regression risk and it is cheap to check.
- **The replica did not move.** Same dump, scoped to `.portal-shot` and its
  children, in both schemes. All three results must be identical.
- **Native controls.** Confirm the `select`, the checkbox, the scrollbar and
  autofill render dark. `color-scheme` is what does this; prove it took effect.
- **The main action.** Drive the demo form for real in dark mode: submit empty,
  submit with an invalid email, then submit valid. Confirm the error text, the
  `aria-invalid` attributes, the focus move to the first invalid field and the
  status message all still work and are legible.
- **Overflow at 390px.** Confirm `document.documentElement.scrollWidth` is not
  greater than `clientWidth` on all three pages, in both schemes.
- **Leftovers.** Grep the four in-scope files for light-only literals that never
  got a dark counterpart. Every hex listed in §6 and §7 should either be
  tokenised or have a documented dark override.

---

## 13. Definition of done

- [ ] Dark scheme implemented via `prefers-color-scheme`, with `[data-theme]`
      hooks present for a future toggle, and no JavaScript added.
- [ ] `color-scheme` declared, and native controls proven to render dark.
- [ ] Every text pair passes WCAG AA in both schemes, with measured ratios
      reported.
- [ ] `--accent` identical in both schemes; `--accent-text` lightened, not
      darkened.
- [ ] Buttons render identically in both schemes.
- [ ] Footer and edition-card hover both give visible separation and feedback in
      dark mode.
- [ ] Shadows flattened in dark mode; no gradients or glows introduced.
- [ ] The select-arrow SVG has a dark-mode override.
- [ ] Status states and both `.draft-notice` blocks have dark treatments; the
      `[PENDING]` markers remain.
- [ ] Footer literals tokenised, with light-mode output unchanged.
- [ ] The hero replica renders identically in both schemes, still on its pinned
      slate-and-blue literals.
- [ ] Light mode verified unchanged by computed-style diff.
- [ ] No copy, figures, layout or form behaviour changed.
- [ ] No horizontal scroll at 390px on any page, in either scheme.
- [ ] Nothing under `portal/` modified. `git status` proves it.
- [ ] Screenshots taken in both schemes at both widths, and genuinely inspected.
- [ ] Report states what was tested, what was observed, and what was not checked,
      and answers every item in §11.

Do not claim to have inspected a page you did not render. If something could not
be verified, say so plainly.
