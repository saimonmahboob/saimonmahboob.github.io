# Saimon Mahboob — Career Site

Static portfolio site. No build step — everything is loaded directly in the browser via React + Babel standalone (in-browser JSX compilation).

## Structure

```
.
├── index.html              # Entry point
├── app.jsx                 # Root App component + Tweaks panel wiring
├── tweaks-panel.jsx        # Reusable Tweaks panel primitives
├── components/
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── Marquee.jsx
│   ├── Metrics.jsx
│   ├── Work.jsx
│   ├── Experience.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
└── assets/                 # Images (headshot + portfolio screenshots)
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `portfolio`).
2. Push the contents of this folder to the repo root.
3. In the repo: **Settings → Pages → Source → Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. After ~30 seconds your site is live at `https://<your-username>.github.io/<repo-name>/`.

For a custom domain, add a `CNAME` file in the root with the domain on a single line, and configure your DNS provider with a `CNAME` record pointing to `<your-username>.github.io`.

## Local preview

Because the page loads JSX files via `<script src>`, opening `index.html` directly with `file://` may be blocked by the browser's CORS rules. Run any static server from this folder:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000/`.

## Editing

- Copy edits live in `components/*.jsx` and the data arrays inside (e.g. the `items` array in `Work.jsx`).
- Images sit in `assets/` and are referenced by relative path.
- Brand color, headline, serif font, background tone, and grain texture are all live-toggleable via the in-page Tweaks panel.
