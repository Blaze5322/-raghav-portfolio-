# Raghav Gupta — Personal Portfolio

3D cinematic scroll portfolio built with React + React Three Fiber.

## Stack

- **React 18** + **Vite**
- **React Three Fiber** (@react-three/fiber) — React renderer for Three.js
- **Drei** (@react-three/drei) — R3F helpers
- **GSAP** — smooth camera animation
- **CSS Modules** — scoped styles per component

## Project Structure

```
src/
├── App.jsx                        ← Root component, wires everything
├── main.jsx                       ← Entry point
├── data/
│   └── content.js                 ← All your real content lives here
├── hooks/
│   ├── useScrollSection.js        ← Section navigation logic
│   ├── useAudio.js                ← Ambient fire/wind audio
│   └── useCursor.js               ← Custom cursor behavior
├── styles/
│   └── global.css                 ← Design tokens, reset, base styles
└── components/
    ├── Scene.jsx                  ← Main R3F canvas + all 3D objects
    ├── CameraRig.jsx              ← GSAP-driven camera between sections
    ├── MobileLayout.jsx           ← Separate 2D layout for mobile
    ├── sections/
    │   ├── Hero.jsx / .module.css
    │   ├── About.jsx / .module.css
    │   ├── Projects.jsx / .module.css
    │   ├── Skills.jsx / .module.css
    │   ├── Certs.jsx / .module.css
    │   └── Contact.jsx / .module.css
    └── ui/
        ├── Loader.jsx / .module.css
        ├── Nav.jsx / .module.css
        ├── ProgressDots.jsx / .module.css
        ├── SectionLabel.jsx / .module.css
        ├── ScrollHint.jsx / .module.css
        ├── CustomCursor.jsx / .module.css
        └── ProjectModal.jsx / .module.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Updating Content

All your personal content is in **one file**: `src/data/content.js`

- Add new projects to the `PROJECTS` array
- Add certifications to the `CERTS` array
- Update skills in the `SKILLS` object
- Change personal info in the `PERSON` object

## Camera Positions

The camera journey is defined in `CAMERA_PATH` inside `src/data/content.js`.
Each entry maps to one section: `{ pos: [x, y, z], look: [x, y, z] }`.

## Sections

| # | Name          | 3D Metaphor     |
|---|---------------|-----------------|
| 0 | Hero          | The Field       |
| 1 | About         | The Desk        |
| 2 | Projects      | The Gallery     |
| 3 | Skills        | The Toolshed    |
| 4 | Certifications| The Wall        |
| 5 | Contact       | The Door        |

## Deployment

Works with any static host:
- **Vercel**: `vercel deploy`
- **Netlify**: drag & drop the `dist/` folder
- **GitHub Pages**: push `dist/` to `gh-pages` branch
