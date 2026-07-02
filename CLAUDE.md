# CLAUDE.md — Rosa Diosa (rosadiosa.com)

## Project Overview

- **Live site:** https://www.rosadiosa.com
- **Repo folder:** `repo-temp/` (this directory)
- **Vercel project:** `wills-projects-c6f398a3/repo-temp`
- **GitHub repo:** `willvjonesiii/RosaDiosa`, branch: `v2`
- **Deploy command:** `NODE_TLS_REJECT_UNAUTHORIZED=0 vercel --prod` (run from inside `repo-temp/`)
- **Client email:** rosadiazdl@gmail.com

## Bilingual Site Rule — CRITICAL

This site is fully bilingual EN/ES via an i18n object in `index.html`. **Every content change must be made in both languages simultaneously.** When Will says "remove X" or "change Y to Z", update both the `en:{}` and `es:{}` translation keys before deploying. Never update one language and leave the other stale.

The Spanish variant is **Latin American Spanish** — not Spain. Key markers:
- "Descargo" not "Aviso Legal"
- "inténtalo de nuevo" not "intenta de nuevo"
- "la sensación corporal" for the somatic felt-sense concept

## i18n Architecture

Translations live in the `var i18n = { en: {...}, es: {...} }` object inside the `<script>` block of `repo-temp/index.html`. All translatable elements use `data-i18n="key"` attributes; form placeholders use `data-i18n-ph="key"`. The `applyLang(lang)` function sets `innerHTML` for all keyed elements.

`rosadiosa.com/es` is a thin bootstrap page (`es.html`) that sets `localStorage.setItem('rosaLang','es')` and redirects to `/` — used for sharing the Spanish version directly.

## Deployment Pattern

1. Edit `repo-temp/index.html` (or other files)
2. `git add` + `git commit` + `git push` (to `v2` branch for GitHub backup)
3. `NODE_TLS_REJECT_UNAUTHORIZED=0 vercel --prod` (from inside `repo-temp/`) for the live deploy

GitHub pushes alone do NOT update the live site — Vercel is CLI-deployed, not GitHub-connected auto-deploy.

## Mobile Layout Notes

- Hero: `align-items:center` on mobile (overrides desktop `flex-end`)
- Lang toggle sits to the LEFT of the hamburger on mobile via CSS `order` (toggle: 2, burger: 3)
- Hero eyebrow: letter-spacing reduced and `.hero-line` hidden on mobile to prevent wrapping
- All mobile overrides are inside `@media(max-width:960px)` — never modify base rules to fix mobile

## Key Files

- `repo-temp/index.html` — entire site (single file)
- `repo-temp/es.html` — Spanish redirect bootstrap
- `repo-temp/api/contact.js` — Resend serverless contact form → rosadiazdl@gmail.com
- `repo-temp/vercel.json` — `{ "cleanUrls": true }` — do not modify
- `repo-temp/favicon.png` — rose PNG with transparent background
- `repo-temp/rosa-social-share-image.jpg` — OG social share card
