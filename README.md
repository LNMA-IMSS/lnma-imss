# LNMA-IMSS Website

**Laboratorio Nacional de Microscopía Avanzada — IMSS**  
Static website for GitHub Pages with JSON-based content management.

---

## 📁 Project Structure

> **Why `.js` instead of `.json`?** The data files use `.js` so the site works
> both when opened directly from your PC (`file://`) and when hosted on GitHub Pages.
> Each file is just a `const X = { ... };` wrapper around JSON data — you only
> edit the part inside the curly braces, exactly like JSON.

```
lnma-imss/
├── index.html                  ← Main page (rarely needs editing)
├── .nojekyll                   ← Tells GitHub Pages not to use Jekyll
├── css/
│   └── style.css               ← Styles (edit colors, spacing here)
├── js/
│   └── main.js                 ← Engine (renders everything from JSON)
├── data/                       ← ★ CONTENT MANAGEMENT — edit these files ★
│   ├── site-config.js        ← Header, footer, nav, contact info
│   ├── carousel.js           ← Carousel slides
│   ├── equipment.js          ← Equipment catalog
│   └── content.js            ← About section (mission, vision, staff)
└── assets/images/
    ├── logos/                  ← Official logos & yearly graphics
    │   ├── header-left.png     ← Government + IMSS header logo
    │   ├── header-right.png    ← Yearly illustration (e.g., Margarita Maza)
    │   ├── footer-left.png     ← Yearly footer badge
    │   ├── logo-imss.svg       ← IMSS logo for footer
    │   └── logo-secihti.svg    ← SECIHTI logo for footer
    ├── carousel/               ← Carousel images (16:9 ratio recommended)
    ├── equipment/              ← Equipment photos
    └── staff/                  ← Staff photos
```

---

## 🔧 Content Management Guide

### Updating the Carousel (Images, GIFs, Videos)

Edit **`data/carousel.js`**:

The carousel supports three media types, auto-detected from file extension:

| Extension | Type detected | Default display time | Behavior |
|-----------|--------------|---------------------|----------|
| `.jpg`, `.png`, `.svg`, `.webp` | `image` | 5 seconds | Static display, then advance |
| `.gif`, `.apng` | `gif` | 12 seconds | Extended time for animation loops |
| `.mp4`, `.webm` | `video` | Until loop finishes | Autoplay muted, loop, timer paused |

#### Adding a static image slide:
```json
{
  "id": "slide-01",
  "image": "assets/images/carousel/my-photo.jpg",
  "thumbnail": "",
  "title":       { "es": "Título", "en": "Title" },
  "subtitle":    { "es": "LNMA, IMSS", "en": "LNMA, IMSS" },
  "description": { "es": "Descripción...", "en": "Description..." }
}
```

#### Adding an animated GIF slide:
```json
{
  "id": "slide-05",
  "image": "assets/images/carousel/cell-division.gif",
  "duration": 15000,
  "title":       { "es": "División celular", "en": "Cell Division" },
  "subtitle":    { "es": "LNMA, IMSS", "en": "LNMA, IMSS" },
  "description": { "es": "Time-lapse de mitosis en cultivo celular.", "en": "Mitosis time-lapse in cell culture." }
}
```
- `duration` (optional): override display time in ms. Default for GIFs is 12000 (12 sec).

#### Adding a video slide:
```json
{
  "id": "slide-07",
  "type": "video",
  "image": "assets/images/carousel/calcium-signaling.mp4",
  "poster": "assets/images/carousel/calcium-signaling-poster.jpg",
  "loops": 2,
  "title":       { "es": "Señalización por calcio", "en": "Calcium Signaling" },
  "subtitle":    { "es": "LNMA, IMSS", "en": "LNMA, IMSS" },
  "description": { "es": "Registro de ondas de calcio en tejido nervioso.", "en": "Calcium wave recording in neural tissue." }
}
```
- `poster` (optional): preview frame shown before the video loads.
- `loops` (optional): how many times the video loops before advancing (default: 1).
- `type` (optional): set `"video"` explicitly, or let the engine auto-detect from `.mp4`/`.webm`.
- Videos autoplay **muted** with no volume controls — they loop silently.
- The carousel timer **pauses** while a video plays and advances after the loop count.

#### General notes:
- Place files in `assets/images/carousel/` (16:9 ratio recommended for all media).
- To **remove** a slide: delete its entry from the array.
- To **reorder**: change the order in the array.
- `autoplayInterval`: default ms between static image slides (default: 5000 = 5 sec).

---

### Updating Equipment

Edit **`data/equipment.js`**:

1. Place equipment photo in `assets/images/equipment/`
2. Add entry to the `items` array:

```json
{
  "id": "my-new-equipment",
  "category": "microscopy",
  "name":             { "es": "Nombre", "en": "Name" },
  "image":            "assets/images/equipment/photo.jpg",
  "shortDescription": { "es": "Breve...", "en": "Brief..." },
  "fullDescription":  { "es": "Detallada...", "en": "Detailed..." },
  "specs": {
    "es": ["Especificación 1", "Especificación 2"],
    "en": ["Specification 1", "Specification 2"]
  }
}
```

**Categories:** `"microscopy"`, `"histology"`, `"other"`  
To add a new category, add it to `categories` object and use it in items.

- To **remove**: delete the entry.
- To **change all descriptions at once**: use find-and-replace in your editor across the JSON file.

---

### Updating About Section (Mission, Vision, Staff)

Edit **`data/content.js`**:

- `intro`, `mission.text`, `vision.text`: bilingual text blocks.
- `staff` array: add/remove people, update `links`, `bio`, `photo`.

---

### Updating Contact Information

Edit **`data/site-config.js`** → `contact` section:

- `address`, `hours`, `phone`, `email`, `facebook`.
- `mapEmbed`: Google Maps embed URL.

---

### Yearly Template Changes (Header/Footer Graphics)

1. Replace files in `assets/images/logos/`:
   - `header-left.png` — Government + IMSS header
   - `header-right.png` — Yearly illustration
   - `footer-left.png` — Yearly footer badge
2. Update alt text in `data/site-config.js` → `header` and `footer`.
3. Update `site.year`.

---

### Adding a New Section

1. In `index.html`, add a new `<section>` before the Contact section:
```html
<section id="recursos" class="section">
  <!-- Content rendered by JS or static HTML -->
</section>
```

2. In `data/site-config.js`, add to the `nav` array:
```json
{ "id": "recursos", "es": "Recursos", "en": "Resources" }
```

3. Optionally, add a render function in `js/main.js`.

---

### Language Toggle

The site supports ES/EN. Every text field in the JSON files uses:
```json
{ "es": "Texto en español", "en": "English text" }
```

User preference is saved in `localStorage`.

---

### Changing Colors & Styles

Edit CSS custom properties at the top of **`css/style.css`**:

```css
:root {
  --color-primary:  #006847;  /* Main green */
  --color-accent:   #8B0D24;  /* Government red */
  --color-gold:     #BC955C;  /* Gold accent */
  /* ... */
}
```

---

## 🚀 Deployment on GitHub Pages — Step by Step

### 1. Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it (e.g., `lnma-imss` — the URL will be `https://<username>.github.io/lnma-imss/`)
3. Set it to **Public** (required for free GitHub Pages)
4. **Do not** add README, .gitignore, or license (we already have files)
5. Click **Create repository**

### 2. Push the website files

Unzip the downloaded file, open a terminal in the `lnma-imss` folder, and run:

```bash
git init
git add .
git commit -m "Initial LNMA-IMSS website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/lnma-imss.git
git push -u origin main
```

> Replace `<YOUR-USERNAME>` with your GitHub username.

### 3. Enable GitHub Pages

1. In your repository, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Set branch to **main** and folder to **/ (root)**
4. Click **Save**
5. Wait 1–2 minutes, then visit `https://<username>.github.io/lnma-imss/`

### 4. Updating content after deployment

After making edits to any data file:

```bash
git add .
git commit -m "Updated carousel images"
git push
```

GitHub Pages will auto-deploy within ~1 minute.

### Local preview (optional)

The site works by simply opening `index.html` in your browser (double-click it).
No local server is needed — this was a design goal.

---

## 📋 Quick Reference: File to Edit

| I want to change...            | Edit this file                  |
|--------------------------------|---------------------------------|
| Carousel images/text           | `data/carousel.js`            |
| Equipment list                 | `data/equipment.js`           |
| Mission/Vision/Staff           | `data/content.js`             |
| Contact info & map             | `data/site-config.js`         |
| Navigation items               | `data/site-config.js` → `nav` |
| Header/Footer logos            | `data/site-config.js` + replace images in `assets/images/logos/` |
| Colors and spacing             | `css/style.css` → `:root`       |
| Add a new page section         | `index.html` + `data/site-config.js` → `nav` |
