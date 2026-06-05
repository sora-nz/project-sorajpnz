# SoraJPNZ Portfolio Site

Apple-inspired bilingual portfolio site for Sora Oya, built with React, Vite, and local visual assets.

## Build

```bash
npm install
npm run build
```

Netlify publish directory: `out`

## Analytics

Google Analytics 4 is optional. Add this environment variable in Netlify to enable page-view and contact-form-success tracking:

```text
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Notes

- Existing Sora JPNZ icons and project images are stored in `public/assets`.
- The homepage background images and motion are preserved.
- ReaddyAI source assets remain local in `/assets` and are ignored by Git.
