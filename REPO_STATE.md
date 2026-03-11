# REPO_STATE.md

> Generated 2026-03-11. Full snapshot for planning purposes.

---

## 1. File Structure

```
dotcom/
├── .github/
│   └── workflows/
│       └── master.yml          # GitHub Actions deploy workflow (entirely commented out — inactive)
├── css/
│   ├── styles.css              # Primary custom stylesheet (~35k tokens); hand-authored, no preprocessor
│   └── vendor.css              # Bundled third-party CSS: PrismJS (okaidia theme) + Swiper 6.4.5
├── date assets/                # ⚠ Directory name has a space — non-standard, not linked from main site
│   ├── date images/
│   │   ├── bowling pin dancing.gif
│   │   ├── bowling pin.gif
│   │   └── letsgo.gif
│   ├── main.js                 # Interactive "will you go on a date with me?" page JS
│   └── styles.css              # Standalone CSS for the date page
├── images/
│   ├── avatars/                # Empty (only .DS_Store)
│   ├── clients/                # SVG logos: BigCommerce, CSS, Docker, Figma, Git, GitHub, JS, npm,
│   │                           #   Oracle, Python, Sass, Shopify, Slack, Squarespace, TS, VS Code
│   ├── icons/
│   │   ├── icon-close.svg
│   │   ├── icon-close-2.svg
│   │   └── icon-quote.svg
│   ├── thumbs/
│   │   ├── about/              # about-600/1200/2400.jpg (responsive srcset images)
│   │   ├── contact/            # Empty (only .DS_Store)
│   │   ├── home-net/           # home-net-600/1200/2400.jpg, vpn-600/1200/2400.jpg
│   │   ├── single/             # standard-600/1200/2400.jpg (generic blog hero placeholder)
│   │   └── text-editor/        # dracula-theme-600/1200/2400.jpg, standard-600/1200/2400.jpg
│   ├── geometric_shape.svg     # Decorative SVG used in the About section on homepage
│   └── me.jpg                  # Headshot used in hero section
├── js/
│   ├── main.js                 # Site JS: preloader, mobile menu, Swiper init, MailChimp form,
│   │                           #   alert boxes, back-to-top, MoveTo smooth scroll
│   └── plugins.js              # Vendored JS: PrismJS 1.20.0 (markup/CSS/JS/PHP) + MoveTo 1.8.2
├── about/
│   └── index.html              # About page: biography, values, "Why Work With Me"
├── blog/
│   └── index.html              # Blog index: 2 real posts + 1 "Coming Soon" placeholder;
│                               #   static pagination UI (non-functional, all href="#0")
├── building-a-home-network/
│   └── index.html              # Blog post: "Building a Home Network"
├── contact/
│   └── index.html              # Contact page: mailto link + social icons
├── tech/
│   └── index.html              # Services/Tech page: 9 service descriptions
│                               #   (page header says "Services" but nav calls it "Tech")
├── text-editor-setup/
│   └── index.html              # Blog post: "How I Set Up My Text Editor"
├── date.html                   # Empty file (1 line, no content) — effectively a dead stub
├── generic-page-template.html  # Unused layout template; uses relative (non-root) asset paths
├── single-blog-template.html   # Unused single-post template; references images/logo.svg (missing)
├── styles.html                 # Unused style-guide/component-demo page; title still "Monica"
│                               #   (reveals this is based on the "Monica" theme)
├── CNAME                       # GitHub Pages custom domain: ethansheffield.com
├── package-lock.json           # npm lockfile — no dependencies, packages:{} is empty
├── readme.txt                  # ⚠ Has an unresolved git merge conflict (see §6)
└── site.webmanifest            # PWA manifest; android-chrome-192x192 src missing .png extension
```

---

## 2. Build Tools & Package Dependencies

- **No build toolchain.** There is no `package.json`, no bundler (Webpack, Vite, Rollup), no task runner (Gulp, npm scripts), and no preprocessor (Sass, PostCSS).
- `package-lock.json` exists with `"packages": {}` — it was initialized (`npm init`) but nothing was ever installed.
- All JS and CSS are pre-compiled and committed directly to the repo.
- **Deployment** is via GitHub Pages (static file serving). The CNAME file points `ethansheffield.com` to the Pages host.

---

## 3. HTML Template Structure

Every page follows the same consistent shell:

```html
<html class="no-js">  <!-- JS class toggled immediately via inline <script> -->
<head>
  <!-- viewport, title, inline JS class swap -->
  <link rel="stylesheet" href="/css/vendor.css">
  <link rel="stylesheet" href="/css/styles.css">
  <!-- favicon links (apple-touch, 32x32, 16x16, manifest) -->
</head>
<body id="top">
  <div id="preloader">          <!-- Animated dot preloader; hidden after window load -->
  <div id="page" class="s-pagewrap [page-modifier]">
    <header class="s-header">   <!-- Logo anchor + hamburger toggle + nav with CTA button -->
    <section id="content" class="s-content">
      <!-- Page-specific content:
           - Homepage:    s-intro > s-about > s-expertise > s-clients
           - Inner pages: s-pageheader (h1) > s-pagecontent (pagemain, pagemedia, pageintro)
      -->
    </section>
    <section id="cta" class="s-cta">   <!-- "Get in touch" CTA band (all pages except contact) -->
    <footer class="s-footer">
      <!-- 3-column: about blurb | site links | newsletter form -->
      <!-- Footer bottom: social icons + ss-go-top button -->
    </footer>
  </div>
  <script src="/js/plugins.js"></script>
  <script src="/js/main.js"></script>
</body>
```

**Homepage-specific body class:** `ss-home` on `#page`.
**Inner pages:** no extra body modifier class.
**Blog post pages:** nav still links to `/services/` (stale — should be `/tech/`).

---

## 4. CSS: Framework & Custom Properties

**No external CSS framework** (no Bootstrap, Tailwind, etc.). Entirely custom.

### CSS Custom Properties (defined in `:root`)

#### Fonts
| Variable | Value |
|---|---|
| `--font-1` | `"Roboto Flex"` (sans-serif) — loaded from Google Fonts |
| `--font-2` | `"DM Serif Display"` (serif) — loaded from Google Fonts |
| `--font-mono` | `Consolas, "Andale Mono", Courier, "Courier New", monospace` |

#### Brand Colors
| Variable | Value |
|---|---|
| `--color-1` | `hsla(35, 87%, 49%)` — amber/orange |
| `--color-2` | `hsla(127, 8%, 22%)` — dark muted green |
| `--color-3` | `hsla(39, 93%, 95%)` — warm off-white |

Full tint/shade scales exist for each: `-lightest`, `-lighter`, `-light`, `-dark`, `-darker`, `-darkest`.

Also defined: `--color-error`, `--color-success`, `--color-info`, `--color-notice` (feedback), and a full gray scale (`--color-gray-1` through `--color-gray-19` plus `--color-black` / `--color-white`).

Additional variables cover spacing, typescale, and grid configuration (defined elsewhere in the file).

### Grid System
Custom CSS grid: column classes `xl-*`, `lg-*`, `md-*`, `tab-*`, `mob-*` with breakpoints at approximately 1800px, 1200px, 900px, 800px, 600px, 400px.

### vendor.css
- **PrismJS 1.20.0** — okaidia dark theme for code blocks
- **Swiper 6.4.5** — slider/carousel component styles

---

## 5. JavaScript Libraries (vendored in `js/plugins.js`)

| Library | Version | Purpose |
|---|---|---|
| **PrismJS** | 1.20.0 | Syntax highlighting; languages: markup, CSS, JS, PHP |
| **MoveTo** | 1.8.2 | Lightweight smooth-scroll animation |

**Site JS (`js/main.js`) — "Monica 1.0.0"** implements:
- `ssPreloader` — fade-out preloader on `window load`
- `ssMobileMenu` — hamburger toggle, close on link click, reset on resize
- `ssSwiper` — initializes two Swiper instances (`.home-slider`, `.page-slider`) — note: neither slider markup actually exists in the current pages
- `ssMailChimpForm` — JSONP-based MailChimp subscribe; `cfg.mailChimpURL` is **empty string** (form is non-functional)
- `ssAlertBoxes` — dismiss alert boxes
- `ssBackToTop` — show/hide back-to-top button at 900px scroll
- `ssMoveTo` — smooth scroll for all `.smoothscroll` anchors

---

## 6. GitHub Actions Workflows

**File:** [.github/workflows/master.yml](.github/workflows/master.yml)

The entire workflow is **commented out**. When active it would:
- Trigger on push to `main`
- Run on `ubuntu-latest`
- Check out code with `actions/checkout@v3`
- FTP-deploy to `ftp.ethansheffield.com:/public_html/` using `SamKirkland/FTP-Deploy-Action@v4.3.4`
- Credentials via secrets: `FTP_USERNAME`, `FTP_PASSWORD`

**Current state:** No CI/CD is running. The site is presumably deployed via GitHub Pages directly (evidenced by the CNAME file), making the FTP workflow obsolete/superseded.

---

## 7. Issues, Broken Items & Inconsistencies

### Critical / Broken

| # | File | Issue |
|---|---|---|
| 1 | [readme.txt](readme.txt) | **Unresolved git merge conflict** — contains raw conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>> 28c9176`) with essentially empty content on both sides. File is unusable. |
| 2 | [index.html:109](index.html#L109) | Hero `<img src="images/meg.jpg">` — file `meg.jpg` does not exist. The srcset correctly references `me.jpg` (which does exist) but the primary `src` will 404. |
| 3 | [date.html](date.html) | File is completely empty (1 line). The `date assets/` directory with its JS, CSS, and GIFs exists but there is no HTML to load them. |
| 4 | [site.webmanifest](site.webmanifest) | First icon entry is `"src":"/android-chrome-192x192"` — **missing `.png` extension**. Will fail PWA icon lookup. |
| 5 | [js/main.js:13](js/main.js#L13) | `cfg.mailChimpURL` is `''` — the newsletter subscribe form silently does nothing on submit. |

### Navigation / Link Inconsistencies

| # | Files Affected | Issue |
|---|---|---|
| 6 | `tech/index.html`, `contact/index.html` (footer) | `href="https://https://ethansheffield.com"` — **double-protocol typo**, will 404. |
| 7 | `building-a-home-network/index.html` (logo + footer) | Same `https://https://` double-protocol typo. |
| 8 | `index.html` (footer), `tech/index.html` (nav) | `href="/index/"` — no `/index/` directory exists; should be `/` or `https://ethansheffield.com`. |
| 9 | `text-editor-setup/index.html`, `building-a-home-network/index.html` (nav) | Link to `/services/` — no `/services/` directory exists; should be `/tech/`. |
| 10 | `contact/index.html` (footer social icons) | All four social icon `href` values are `#0` (placeholder) — not linked to real profiles. Other pages link them correctly. |

### Content / Template Leftovers

| # | File | Issue |
|---|---|---|
| 11 | [styles.html](styles.html) | Title still reads `"Styles - Monica"` — reveals the site is built on the **"Monica" theme** (v1.0.0). This file is a raw theme style-guide and should either be removed or kept private. |
| 12 | [single-blog-template.html](single-blog-template.html) | References `images/logo.svg` — file does not exist. Template is unused but would be broken if used. |
| 13 | [generic-page-template.html](generic-page-template.html) | Uses **relative** (non-root) asset paths (`css/vendor.css`, not `/css/vendor.css`) — inconsistent with all inner pages. |
| 14 | `tech/index.html` | Page `<h1>` says "High-Impact Services" / pretitle "Services" but the nav calls this page "Tech". Content mismatch. |
| 15 | `blog/index.html` | Pagination HTML is fully static with all links set to `#0`. Third blog card links to `href=""` (empty). |
| 16 | `images/avatars/` | Exists but is empty (only `.DS_Store`). |
| 17 | `images/thumbs/contact/` | Exists but is empty (only `.DS_Store`). |
| 18 | `index.html` | Slack SVG path tag has a stray `>` after `</path>` (`</path>>`) — appears in homepage and is copied verbatim into every other page's social icon blocks. Technically invalid HTML but browsers tolerate it. |

### No `<meta>` SEO / OG Tags
None of the pages include `<meta name="description">`, Open Graph tags, Twitter Card tags, or structured data. The `<title>` tags are minimal (e.g., "Blog - Ethan").

---

## 8. Current Branch State

- **Branch:** `feature/2026-refresh`
- **Base:** `main` (single commit: "Initial commit" — `73cc21d`)
- **Uncommitted changes:** `package-lock.json` is modified (shows as `M` in git status)
- No `.gitignore` file exists — `.DS_Store` files are tracked throughout the repo
