# Hamza — Developer Portfolio

A responsive, single-page developer portfolio built with vanilla HTML, CSS, and JavaScript, using Vite for local development and production builds.

## Highlights

- Static hero photo using the original first frame, displayed without cropping
- About, featured projects, skills, process, testimonials, and contact sections
- Continuous black-and-lime layout, responsive mobile navigation, and section-aware navigation
- Open editorial sections and a scroll-driven horizontal project showcase, with vertical scrolling on smaller screens and for reduced motion
- Skills stay in a pinned area while scrolling vertically through every category, then release into the next section; reduced motion uses the normal layout
- Contact form with validation, spam protection, delivery feedback, and FormSubmit integration
- Compact contact form with side-by-side name/email fields, website type, and project details; uploads are currently disabled

## Local Setup

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Create an optimized build with `npm run build`, then preview it locally with `npm run preview`.

## Project Structure

- `index.html` — page content, metadata, and contact form
- `style.css` — responsive layout, visual system, and animations
- `theme.css` — reference-inspired typography, colors, and connected section styling
- `main.js` — navigation, scroll entrances, project showcase, and form handling
- `public/hero-first-frame.png` — static hero image
- `archived-frames/` — original sequence kept locally, excluded from the website build

## Contact Form

Messages are submitted to the FormSubmit recipient set in the form's `data-recipient` attribute in `index.html`. The form accepts images and videos, prevents duplicate selections, enforces upload limits, and lists files inside a fixed scrollable tray so the page does not grow with every attachment.
