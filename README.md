

## ✨ Features

- **Gavel Strike Intro Sequence:** A synchronized, realistic double gavel-strike animation built with GSAP and custom inline SVG graphics representing a golden-and-wood gavel and sounding block.
- **Dynamic Visual Effects:** Includes screen shaking, expanding shockwave rings, and coordinate-mapped radiant particle bursts synced perfectly to each gavel strike impact.
- **Immersive Audio:** Dynamic sound design featuring a realistic court gavel strike sound effect and low-frequency ambient background room tone.
- **Glassmorphic Navigation:** A floating glass-effect navbar showcasing sponsor and partner logos (MUJ, SDG, Litmus) with active animated gold-streak accent lines.
- **Vibrant Heritage Theme:** A rich, deep burgundy and gold radial background gradient that expands from the center once the intro is unlocked.
- **Responsive Layout:** Designed to scale beautifully across mobile, tablet, and ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

- **Core:** React 19, JavaScript (ES6+), HTML5, CSS3
- **Styling:** Tailwind CSS v4 (incorporating custom Google Fonts: *Cinzel* & *Outfit*)
- **Animations:** GSAP (GreenSock Animation Platform) & `@gsap/react`
- **Build Tool:** Vite

---

## 🚀 How to Install and Run Locally

Follow these step-by-step instructions to get the project running on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or higher recommended) and **npm** installed on your system. You can verify this by running:
```bash
node -v
npm -v
```

### 2. Install Dependencies
Navigate to the project directory and install the required node packages:
```bash
npm install
```

### 3. Run the Development Server
Launch the local Vite development server:
```bash
npm run dev
```
Once the server starts, you will see output in your terminal similar to:
```text
  VITE v8.0.12  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Open in Browser
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## 🔍 Step-by-Step Test Guide

To fully test all aspects and features of the landing page, follow this walkthrough:

### Phase 1: The Gesture Overlay (Audio Safety Lock)
1. **Observation:** Upon opening the page, you will see a completely black screen. This is intentional. Modern browsers block programmatic audio playback until the user interacts with the page.
2. **Action:** Click anywhere on the screen.
3. **Expectation:** The black screen immediately fades out, initiating the introduction sequence.

### Phase 2: The Intro Animation & Audio Sync
1. **Observation:** Immediately after clicking, the sound block (gavel base) will spring onto the screen.
2. **Observation:** The gavel will swing down-left and strike the sound block twice in rapid succession.
3. **Verification Points:**
   - **Audio Playback:** Check that the double gavel-strike sound effect plays perfectly at the exact moments of contact.
   - **Squish/Stretch:** The sounding block should squish down on impact and snap back.
   - **Shockwaves:** Two separate radial circles should ripple outwards from the center of impact.
   - **Radiant Particles:** Ten golden sparks should burst outward in a circle from the impact zone.
   - **Screen Shake:** The entire screen viewport should shake rapidly on the first (heavy) and second (light) impact.

### Phase 3: The Reveal
1. **Observation:** The gavel flies away, the sounding block tilts forward and fades out, and the official golden **MUJMUN** logo scales up into the center with an elastic bounce.
2. **Observation:** The background gradient expands in a radial circle to reveal the deep burgundy color.
3. **Observation:** The top glassmorphic navbar slides down from the top, and background ambient music starts playing.

### Phase 4: Navbar & Responsive Checks
1. **Verification Points:**
   - Check that the logos in the navbar (MUJ on the left, SDG in the center, Litmus on the right) are properly aligned and scale well.
   - Resize your browser window (or use Chrome DevTools device mode) to test the UI on mobile, tablet, and desktop viewports. The central logo and the navbar should adjust sizes fluidly.

---

## 📦 Production Build and Preview

To generate the optimized production files and preview the final build locally, run the following commands:

```bash
# 1. Compile the project files
npm run build

# 2. Preview the production build locally
npm run preview
```
This will host the compiled static assets in `dist/` on a local port (usually `http://localhost:4173/`) so you can test the production-ready build.

---

## 📁 Project Directory Structure

```text
MUJ-MUN-13.0/
├── public/                 # Static assets (Favicons, base icons)
├── src/
│   ├── assets/             # Images (logos) & Audio files (sound effects, background track)
│   ├── App.css             # Page-specific style rules
│   ├── index.css           # Global Tailwind directives and custom CSS keyframes
│   ├── App.jsx             # Main Application code (GSAP timelines and structure)
│   └── main.jsx            # Entry point rendering the React App
├── index.html              # Core HTML structure
├── package.json            # Configuration and script definition
├── vite.config.js          # Vite compilation configurations
└── README.md               # Setup and testing guide (This document)
```

---
*Developed for Manipal University Jaipur Model United Nations 13.0.*