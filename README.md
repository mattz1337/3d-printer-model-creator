# Formwerk

Formwerk is a browser-based parametric model creator for useful 3D-printable parts.
It generates live 3D previews and exports both OpenSCAD (`.scad`) and STL files
directly in the browser.

## Live App

The app is hosted on GitHub Pages:

[https://mattz1337.github.io/3d-printer-model-creator/](https://mattz1337.github.io/3d-printer-model-creator/)

You can also use the standalone build locally by opening `dist/index.html`.

## Features

- 34 parametric model templates
- Interactive Three.js preview
- Browser-side STL export
- OpenSCAD (`.scad`) export for further editing
- Single-file production build
- GitHub Pages deployment via GitHub Actions

## Model Library

Current templates include:

- Case / enclosure
- Tube / sleeve
- Angle bracket
- Push-fit lid
- Spacer
- Mounting plate
- Knurled knob
- Cable clip
- Two-part wall mount
- Device foot
- Washer
- Wall hook
- Furniture handle
- Cable grommet
- Funnel
- Phone stand
- Corner connector
- Shelf bracket
- Grid box
- Compartment organizer
- Cable comb
- Hose adapter
- Pipe clamp
- Bearing holder
- Servo mount
- Drill guide
- Label holder
- Magnet cup
- Kumiko lamp with selectable patterns
- Gridfinity-style insert
- Electronics enclosure
- Modular lamp panel
- Battery holder
- Hinged box

## Kumiko Lamp

The Kumiko lamp template creates a square lantern-style frame with selectable
patterns:

- Asanoha
- Seigaiha
- Kikko
- Shippo

Bottom and top panels can be enabled or disabled independently.

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the static app:

```bash
npm run build
```

The production output is written to `dist/`.

## Deployment

GitHub Pages is deployed automatically from `main` using
`.github/workflows/pages.yml`.

The workflow:

1. Installs dependencies with `npm ci`
2. Builds the app with `npm run build`
3. Uploads `dist/` as a Pages artifact
4. Deploys it to GitHub Pages

## Notes

Formwerk is intended for quick, practical parametric parts. Always verify exported
STL files in your slicer before printing, especially for tight fits, load-bearing
parts, and snap or hinge mechanisms.
