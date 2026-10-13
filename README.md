# Hamza — Frontend Engineer Portfolio

A cinematic, responsive single-page portfolio built with vanilla HTML, CSS, and JavaScript. Vite provides the local development and production build workflow.

## Live Portfolio

**[View the live website](https://jobportfolio3.netlify.app/)**

## Features

- Black and electric-lime visual system with bold condensed typography
- Static hero portrait with a rounded, raised frame
- Full-screen animated title transitions between major sections
- Smooth directional content entrances throughout the site
- Scroll-driven horizontal showcase for featured projects
- Pinned vertical Skills & Stack experience with category progress controls
- About, Projects, Skills, Process, Testimonials, and Contact sections
- Responsive navigation with an animated desktop indicator and mobile menu
- Compact contact form with validation, spam protection, FormSubmit delivery, and success feedback
- GitHub, Instagram, and LinkedIn profile links
- Mobile and short-screen fallbacks that keep project links and sections accessible
- Reduced-motion support for visitors who prefer fewer animations

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vite 5
- FormSubmit
- Netlify

## Run Locally

Use a current Node.js LTS release.

```bash
npm install
npm run dev
```

Create and preview the production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
.
├── index.html                 # Content, metadata, navigation, and contact form
├── main.js                    # Navigation, scroll effects, showcases, and form logic
├── style.css                  # Base layout, components, and responsive rules
├── theme.css                  # Current visual direction and advanced section styling
├── favicon.svg
├── public/
│   └── hero-first-frame.png   # Static hero portrait
└── archived-frames/           # Original hero sequence, excluded from the live website
```

## Interaction Notes

On larger screens, page scrolling drives the projects horizontally and moves skill categories vertically inside a pinned section. Smaller or short screens use natural vertical layouts so content and project actions remain reachable. Full-screen section titles are also the navbar destinations.

## Contact Form

The form collects a name, email, website type, and project details. It validates entries in the browser, includes a hidden spam field, and sends submissions through FormSubmit to the recipient configured in the form's `data-recipient` attribute in `index.html`.

## Social Links

- [GitHub](https://github.com/hamzatanvir-developer)
- [Instagram](https://www.instagram.com/thefrontend_guy/)
- [LinkedIn](https://www.linkedin.com/in/muhammad-hamza-developer)

## Deployment

The production site is deployed on Netlify: [jobportfolio3.netlify.app](https://jobportfolio3.netlify.app/).
