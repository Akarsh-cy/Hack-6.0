# Vaporwave Horizon (Hack 6.0)

A highly optimized, production-ready React 18 + Vite port of the Vaporwave Horizon landing page.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Local Dev Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Modifying the Timeline

To update the hackathon event dates, you only need to edit one file:
`src/data/timeline.js`

This file contains an array of objects. Modifying this array will automatically update the number of cards rendered and mathematically recalculate the connecting neon snake SVG path without touching any other code!

## React Port Architecture Notes

* **Direct CSS Property Injection**: For the ultra-smooth 60fps mouse tracking tilt (on the cards) and the scroll-parallax (on the background), `requestAnimationFrame` was abstracted into `useParallaxEngine`. This hook directly mutates CSS Custom Properties on the `:root` and skips React's state-reconciliation cycle entirely to prevent lag.
* **Seeded City Generator**: The background city skyline is procedurally generated with a seeded RNG and memoized using `useMemo`, ensuring the server output matches the client output perfectly and it only calculates once.
* **Snake Math**: The snake bezier curves were converted from hardcoded values into a pure function `useMemo` in `SnakePath.jsx` which derives its total height and curve segments purely from `timelineEvents.length`.
* **Intersection Observer**: Abstracted into a tiny, reusable `useInView` hook that attaches to the timeline cards for their stagger entrances.

## Deployment

A GitHub action workflow (`.github/workflows/deploy.yml`) has been included. When you push to the `main` branch, it will automatically build and deploy the React app to your GitHub pages environment using the base path `/hack-krrish/`.
