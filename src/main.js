import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import "./style.css";

const MODELS = {
  box: {
    title: "Gehäuse",
    defaults: { width: 80, depth: 60, height: 24, wall: 2.4, bottom: 2.4 },
    fields: [
      ["width", "Breite", 20, 200, 1, "Außenmaß entlang der X-Achse"],
      ["depth", "Tiefe", 20, 200, 1, "Außenmaß entlang der Y-Achse"],
      ["height", "Höhe", 8, 120, 1, "Gesamthöhe des Gehäuses"],
      ["wall", "Wandstärke", 0.8, 8, 0.2, "Empfohlen: mindestens 2 × Düsendurchmesser"],
      ["bottom", "Bodenstärke", 0.8, 8, 0.2, "Stärke der geschlossenen Unterseite"]
    ]
  },
  cylinder: {
    title: "Hülse",
    defaults: { diameter: 50, height: 60, wall: 3, bottom: 2 },
    fields: [
      ["diameter", "Außendurchmesser", 10, 180, 1, "Durchmesser der äußeren Mantelfläche"],
      ["height", "Höhe", 5, 200, 1, "Gesamthöhe der Hülse"],
      ["wall", "Wandstärke", 0, 20, 0.2, "0 mm erzeugt einen massiven Zylinder"],
      ["bottom", "Bodenstärke", 0, 15, 0.2, "0 mm erzeugt ein offenes Rohr"]
    ]
  },
  bracket: {
    title: "Winkelhalter",
    defaults: { width: 70, depth: 50, height: 50, thickness: 5, hole: 6 },
    fields: [
      ["width", "Breite", 20, 180, 1, "Breite des Winkelhalters"],
      ["depth", "Schenkellänge", 15, 120, 1, "Tiefe der horizontalen Fläche"],
      ["height", "Schenkelhöhe", 15, 120, 1, "Höhe der vertikalen Fläche"],
      ["thickness", "Materialstärke", 2, 15, 0.5, "Stärke beider Schenkel"],
      ["hole", "Bohrung", 0, 20, 0.5, "Durchmesser der Befestigungsbohrungen"]
    ]
  },
  lid: {
    title: "Steckdeckel",
    defaults: { width: 80, depth: 60, thickness: 3, lip: 3, clearance: 0.4 },
    fields: [
      ["width", "Breite", 20, 200, 1, "Außenmaß des Deckels"],
      ["depth", "Tiefe", 20, 200, 1, "Außenmaß des Deckels"],
      ["thickness", "Deckelstärke", 1, 10, 0.2, "Stärke der oberen Platte"],
      ["lip", "Steckrand", 1, 12, 0.2, "Höhe des umlaufenden Randes"],
      ["clearance", "Spiel", 0, 1.5, 0.1, "Zusätzliches Spiel zur Gehäusewand"]
    ]
  },
  spacer: {
    title: "Abstandshalter",
    defaults: { outer: 14, inner: 5, height: 20, flange: 2 },
    fields: [
      ["outer", "Außendurchmesser", 5, 50, 0.5, "Durchmesser des Abstandshalters"],
      ["inner", "Schraubenloch", 1, 20, 0.5, "Durchmesser der Durchführung"],
      ["height", "Höhe", 2, 100, 1, "Abstand zwischen den Bauteilen"],
      ["flange", "Fußüberstand", 0, 8, 0.5, "Zusätzlicher Radius am Fuß"]
    ]
  },
  plate: {
    title: "Montageplatte",
    defaults: { width: 100, depth: 70, thickness: 4, hole: 5, inset: 10 },
    fields: [
      ["width", "Breite", 30, 250, 1, "Breite der Platte"],
      ["depth", "Tiefe", 30, 200, 1, "Tiefe der Platte"],
      ["thickness", "Plattenstärke", 1, 15, 0.5, "Materialstärke"],
      ["hole", "Bohrung", 0, 20, 0.5, "Durchmesser der vier Löcher"],
      ["inset", "Randabstand", 4, 35, 1, "Abstand der Löcher vom Rand"]
    ]
  },
  knob: {
    title: "Drehknopf",
    defaults: { diameter: 36, height: 18, shaft: 6, ribs: 20 },
    fields: [
      ["diameter", "Durchmesser", 15, 80, 1, "Außendurchmesser des Knopfs"],
      ["height", "Höhe", 8, 50, 1, "Gesamthöhe"],
      ["shaft", "Achsenbohrung", 2, 20, 0.5, "Durchmesser der Aufnahme"],
      ["ribs", "Rändelung", 8, 36, 1, "Anzahl der Griffrippen"]
    ]
  },
  clip: {
    title: "Kabelclip",
    defaults: { cable: 8, width: 12, wall: 2.4, opening: 5, base: 18 },
    fields: [
      ["cable", "Kabeldurchmesser", 2, 30, 0.5, "Platz für das Kabel"],
      ["width", "Clipbreite", 4, 30, 1, "Breite entlang des Kabels"],
      ["wall", "Wandstärke", 1, 6, 0.2, "Materialstärke des Clips"],
      ["opening", "Öffnung", 2, 20, 0.5, "Breite der Einführöffnung"],
      ["base", "Fußlänge", 8, 40, 1, "Länge der Montagefläche"]
    ]
  },
  wallmount: {
    title: "Wandhalter, 2-teilig",
    defaults: { width: 55, height: 65, thickness: 5, rail: 10, clearance: 0.4 },
    fields: [
      ["width", "Breite", 25, 140, 1, "Breite beider Halterteile"],
      ["height", "Höhe", 30, 160, 1, "Höhe der Wandplatte"],
      ["thickness", "Plattenstärke", 3, 12, 0.5, "Stärke der Grundplatten"],
      ["rail", "Schienenbreite", 5, 25, 0.5, "Breite der Steckschiene"],
      ["clearance", "Spiel", 0.1, 1.2, 0.1, "Spiel zwischen beiden Teilen"]
    ]
  },
  foot: {
    title: "Gerätefuß",
    defaults: { diameter: 28, height: 12, hole: 5, recess: 2 },
    fields: [
      ["diameter", "Durchmesser", 10, 80, 1, "Außendurchmesser des Fußes"],
      ["height", "Höhe", 3, 35, 1, "Gesamthöhe"],
      ["hole", "Schraubenloch", 0, 15, 0.5, "Durchmesser der Befestigung"],
      ["recess", "Vertiefung", 0, 6, 0.5, "Unterseitige Materialaussparung"]
    ]
  },
  washer: {
    title: "Unterlegscheibe",
    defaults: { outer: 24, inner: 8, height: 2 },
    fields: [
      ["outer", "Außendurchmesser", 5, 80, 0.5, "Außendurchmesser"],
      ["inner", "Innendurchmesser", 1, 50, 0.5, "Durchgangsloch"],
      ["height", "Stärke", 0.4, 15, 0.2, "Scheibenstärke"]
    ]
  },
  hook: {
    title: "Wandhaken",
    defaults: { width: 24, height: 50, reach: 42, thickness: 6 },
    fields: [
      ["width", "Breite", 10, 60, 1, "Breite des Hakens"],
      ["height", "Plattenhöhe", 25, 120, 1, "Höhe an der Wand"],
      ["reach", "Ausladung", 15, 100, 1, "Tiefe des Hakens"],
      ["thickness", "Materialstärke", 3, 15, 0.5, "Stärke von Haken und Platte"]
    ]
  },
  handle: {
    title: "Möbelgriff",
    defaults: { length: 110, depth: 28, width: 12, thickness: 8 },
    fields: [
      ["length", "Länge", 50, 220, 1, "Gesamtlänge des Griffs"],
      ["depth", "Abstand", 15, 60, 1, "Abstand zur Front"],
      ["width", "Griffbreite", 6, 30, 1, "Breite der Griffstange"],
      ["thickness", "Materialstärke", 4, 18, 0.5, "Stärke der Konstruktion"]
    ]
  },
  grommet: {
    title: "Kabeldurchführung",
    defaults: { outer: 60, inner: 45, height: 12, flange: 4 },
    fields: [
      ["outer", "Bohrungsmaß", 20, 120, 1, "Außendurchmesser des Einsatzes"],
      ["inner", "Öffnung", 10, 100, 1, "Freier Kabeldurchlass"],
      ["height", "Einstecktiefe", 4, 40, 1, "Tiefe im Tisch"],
      ["flange", "Randbreite", 1, 12, 0.5, "Überstand auf der Tischfläche"]
    ]
  },
  funnel: {
    title: "Trichter",
    defaults: { top: 80, bottom: 16, height: 55, spout: 35, wall: 2 },
    fields: [
      ["top", "Öffnung oben", 30, 180, 1, "Oberer Außendurchmesser"],
      ["bottom", "Auslauf", 5, 50, 1, "Außendurchmesser des Rohrs"],
      ["height", "Trichterhöhe", 20, 120, 1, "Höhe des Konus"],
      ["spout", "Auslauflänge", 10, 100, 1, "Länge des unteren Rohrs"],
      ["wall", "Wandstärke", 0.8, 5, 0.2, "Materialstärke"]
    ]
  },
  phone: {
    title: "Handyhalter",
    defaults: { width: 75, height: 95, depth: 80, thickness: 5, lip: 12 },
    fields: [
      ["width", "Breite", 45, 120, 1, "Breite des Ständers"],
      ["height", "Rückenhöhe", 50, 160, 1, "Auflagehöhe"],
      ["depth", "Standtiefe", 45, 140, 1, "Tiefe der Bodenplatte"],
      ["thickness", "Materialstärke", 3, 12, 0.5, "Stärke der Platten"],
      ["lip", "Vorderkante", 5, 30, 1, "Höhe der Haltekante"]
    ]
  },
  corner: {
    title: "Eckverbinder",
    defaults: { length: 45, width: 24, thickness: 5, hole: 5 },
    fields: [
      ["length", "Schenkellänge", 20, 100, 1, "Länge beider Schenkel"],
      ["width", "Breite", 12, 60, 1, "Breite des Verbinders"],
      ["thickness", "Materialstärke", 3, 15, 0.5, "Stärke der Platten"],
      ["hole", "Bohrung", 0, 15, 0.5, "Befestigungsbohrung"]
    ]
  },
  shelf: {
    title: "Regalbodenträger",
    defaults: { width: 24, depth: 110, height: 90, thickness: 7 },
    fields: [
      ["width", "Breite", 12, 60, 1, "Breite des Trägers"],
      ["depth", "Auflage", 50, 250, 1, "Tiefe der Regalauflage"],
      ["height", "Wandhöhe", 40, 200, 1, "Höhe an der Wand"],
      ["thickness", "Materialstärke", 4, 18, 0.5, "Stärke der Konstruktion"]
    ]
  }
};

let currentModel = "box";
let values = { ...MODELS.box.defaults };
let modelGroup;

const viewport = document.querySelector("#viewport");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 2000);
camera.position.set(145, 125, 145);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
viewport.prepend(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 15, 0);
controls.maxPolarAngle = Math.PI * 0.49;

scene.add(new THREE.HemisphereLight(0xdfffe8, 0x202820, 2.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(90, 150, 110);
keyLight.castShadow = true;
keyLight.shadow.bias = -0.0002;
keyLight.shadow.normalBias = 0.035;
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xc8ff56, 1.2);
rimLight.position.set(-100, 70, -80);
scene.add(rimLight);

const grid = new THREE.GridHelper(600, 60, 0x5f735e, 0x283129);
grid.material.transparent = true;
grid.material.opacity = 0.36;
scene.add(grid);

const material = new THREE.MeshStandardMaterial({
  color: 0xc8ff56,
  roughness: 0.68,
  metalness: 0.04,
  side: THREE.DoubleSide
});

function mesh(geometry, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(...position);
  item.rotation.set(...rotation);
  item.castShadow = true;
  item.receiveShadow = true;
  return item;
}

function boxGeometry() {
  const { width: w, depth: d, height: h, wall, bottom } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, bottom, d), [0, bottom / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h - bottom, wall), [0, bottom + (h - bottom) / 2, -(d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h - bottom, wall), [0, bottom + (h - bottom) / 2, (d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, h - bottom, d - wall * 2), [-(w - wall) / 2, bottom + (h - bottom) / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h - bottom, d - wall * 2), [(w - wall) / 2, bottom + (h - bottom) / 2, 0]));
  return g;
}

function cylinderGeometry() {
  const { diameter, height, wall, bottom } = values;
  const g = new THREE.Group();
  const r = diameter / 2;
  if (wall <= 0 || wall >= r) {
    g.add(mesh(new THREE.CylinderGeometry(r, r, height, 96), [0, height / 2, 0]));
    return g;
  }
  const shape = new THREE.Shape();
  shape.absarc(0, 0, r, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, Math.max(.1, r - wall), 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const tube = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 96 });
  tube.rotateX(-Math.PI / 2);
  g.add(mesh(tube, [0, 0, 0]));
  if (bottom > 0) g.add(mesh(new THREE.CylinderGeometry(r, r, bottom, 96), [0, bottom / 2, 0]));
  return g;
}

function bracketGeometry() {
  const { width: w, depth: d, height: h, thickness: t, hole } = values;
  const g = new THREE.Group();
  if (hole <= 0) {
    g.add(mesh(new THREE.BoxGeometry(w, t, d), [0, t / 2, d / 2 - t]));
    g.add(mesh(new THREE.BoxGeometry(w, h, t), [0, h / 2, -t / 2]));
    return g;
  }
  const plateShape = new THREE.Shape();
  plateShape.moveTo(-w / 2, 0); plateShape.lineTo(w / 2, 0); plateShape.lineTo(w / 2, d - t); plateShape.lineTo(-w / 2, d - t); plateShape.closePath();
  [-w / 4, w / 4].forEach(x => {
    const p = new THREE.Path(); p.absarc(x, (d - t) / 2, hole / 2, 0, Math.PI * 2, true); plateShape.holes.push(p);
  });
  const base = new THREE.ExtrudeGeometry(plateShape, { depth: t, bevelEnabled: false });
  base.rotateX(Math.PI / 2);
  g.add(mesh(base, [0, t, -t]));

  const wallShape = new THREE.Shape();
  wallShape.moveTo(-w / 2, 0); wallShape.lineTo(w / 2, 0); wallShape.lineTo(w / 2, h); wallShape.lineTo(-w / 2, h); wallShape.closePath();
  [-w / 4, w / 4].forEach(x => {
    const p = new THREE.Path(); p.absarc(x, h / 2, hole / 2, 0, Math.PI * 2, true); wallShape.holes.push(p);
  });
  const wall = new THREE.ExtrudeGeometry(wallShape, { depth: t, bevelEnabled: false });
  g.add(mesh(wall, [0, 0, -t]));
  return g;
}

function ringShape(outerRadius, innerRadius) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, Math.max(0.1, innerRadius), 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function lidGeometry() {
  const { width: w, depth: d, thickness: t, lip, clearance } = values;
  const rim = Math.max(1.2, 2.4 - clearance);
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, t, d), [0, lip + t / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w - 2 * clearance, lip, rim), [0, lip / 2, -(d - rim) / 2 + clearance]));
  g.add(mesh(new THREE.BoxGeometry(w - 2 * clearance, lip, rim), [0, lip / 2, (d - rim) / 2 - clearance]));
  g.add(mesh(new THREE.BoxGeometry(rim, lip, d - 2 * rim), [-(w - rim) / 2 + clearance, lip / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(rim, lip, d - 2 * rim), [(w - rim) / 2 - clearance, lip / 2, 0]));
  return g;
}

function spacerGeometry() {
  const { outer, inner, height, flange } = values;
  const g = new THREE.Group();
  const body = new THREE.ExtrudeGeometry(ringShape(outer / 2, Math.min(inner / 2, outer / 2 - 0.5)), { depth: height, bevelEnabled: false, curveSegments: 64 });
  body.rotateX(-Math.PI / 2);
  g.add(mesh(body));
  if (flange > 0) {
    const foot = new THREE.ExtrudeGeometry(ringShape(outer / 2 + flange, Math.min(inner / 2, outer / 2 - 0.5)), { depth: 2, bevelEnabled: false, curveSegments: 64 });
    foot.rotateX(-Math.PI / 2);
    g.add(mesh(foot));
  }
  return g;
}

function plateGeometry() {
  const { width: w, depth: d, thickness: t, hole, inset } = values;
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, -d / 2); shape.lineTo(w / 2, -d / 2); shape.lineTo(w / 2, d / 2); shape.lineTo(-w / 2, d / 2); shape.closePath();
  if (hole > 0) {
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([x,z]) => {
      const p = new THREE.Path();
      p.absarc(x * (w / 2 - inset), z * (d / 2 - inset), hole / 2, 0, Math.PI * 2, true);
      shape.holes.push(p);
    });
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false, curveSegments: 48 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(geometry);
}

function knobGeometry() {
  const { diameter, height, shaft, ribs } = values;
  const g = new THREE.Group();
  const body = new THREE.ExtrudeGeometry(ringShape(diameter / 2, Math.min(shaft / 2, diameter / 2 - 1)), { depth: height, bevelEnabled: false, curveSegments: 96 });
  body.rotateX(-Math.PI / 2);
  g.add(mesh(body));
  for (let i = 0; i < ribs; i++) {
    const angle = i / ribs * Math.PI * 2;
    const radius = diameter / 2 + 0.7;
    g.add(mesh(new THREE.BoxGeometry(2, height * 0.72, 2.2), [Math.cos(angle) * radius, height * 0.46, Math.sin(angle) * radius], [0, -angle, 0]));
  }
  return g;
}

function clipGeometry() {
  const { cable, width, wall, opening, base } = values;
  const g = new THREE.Group();
  const radius = cable / 2 + wall / 2;
  const gapAngle = Math.min(Math.PI * 0.85, Math.max(0.3, opening / radius));
  const torus = new THREE.TorusGeometry(radius, wall / 2, 16, 72, Math.PI * 2 - gapAngle);
  torus.rotateY(Math.PI / 2);
  torus.rotateX(gapAngle / 2);
  g.add(mesh(torus, [0, radius + wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(base, wall, width), [0, wall / 2, 0]));
  return g;
}

function wallmountGeometry() {
  const { width: w, height: h, thickness: t, rail, clearance } = values;
  const g = new THREE.Group();
  const offset = w * 0.7;
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-w / 2, -h / 2); wallShape.lineTo(w / 2, -h / 2); wallShape.lineTo(w / 2, h / 2); wallShape.lineTo(-w / 2, h / 2); wallShape.closePath();
  [-h / 3, h / 3].forEach(y => {
    const hole = new THREE.Path();
    hole.absarc(0, y, 2.5, 0, Math.PI * 2, true);
    wallShape.holes.push(hole);
  });
  const wallPlate = new THREE.ExtrudeGeometry(wallShape, { depth: t, bevelEnabled: false, curveSegments: 48 });
  g.add(mesh(wallPlate, [-offset, h / 2, -t / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h * 0.65, t), [offset, h * 0.325, 0]));
  g.add(mesh(new THREE.BoxGeometry(rail, h * 0.72, t + rail / 2), [-offset, h * 0.52, t / 2]));
  g.add(mesh(new THREE.BoxGeometry(rail + clearance * 2, h * 0.55, t + rail / 2), [offset, h * 0.34, t / 2]));
  return g;
}

function footGeometry() {
  const { diameter, height, hole, recess } = values;
  const inner = Math.min(hole / 2, diameter / 2 - 0.5);
  const geometry = hole > 0
    ? new THREE.ExtrudeGeometry(ringShape(diameter / 2, inner), { depth: height, bevelEnabled: false, curveSegments: 72 })
    : new THREE.CylinderGeometry(diameter / 2, diameter / 2, height, 72);
  if (hole > 0) geometry.rotateX(-Math.PI / 2);
  const g = new THREE.Group();
  g.add(mesh(geometry, hole > 0 ? [0, 0, 0] : [0, height / 2, 0]));
  if (recess > 0) g.add(mesh(new THREE.TorusGeometry(diameter * 0.34, Math.min(recess, diameter * 0.08), 12, 64), [0, recess, 0], [Math.PI / 2, 0, 0]));
  return g;
}

function washerGeometry() {
  const { outer, inner, height } = values;
  const geometry = new THREE.ExtrudeGeometry(ringShape(outer / 2, Math.min(inner / 2, outer / 2 - 0.2)), { depth: height, bevelEnabled: false, curveSegments: 72 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(geometry);
}

function hookGeometry() {
  const { width: w, height: h, reach, thickness: t } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, h, t), [0, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, t, reach), [0, t / 2, reach / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, t * 3, t), [0, t * 1.5, reach - t / 2]));
  return g;
}

function handleGeometry() {
  const { length, depth, width, thickness: t } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(length, width, t), [0, depth, 0]));
  g.add(mesh(new THREE.BoxGeometry(t, depth, width), [-(length - t) / 2, depth / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(t, depth, width), [(length - t) / 2, depth / 2, 0]));
  return g;
}

function grommetGeometry() {
  const { outer, inner, height, flange } = values;
  const g = new THREE.Group();
  const body = new THREE.ExtrudeGeometry(ringShape(outer / 2, Math.min(inner / 2, outer / 2 - 0.5)), { depth: height, bevelEnabled: false, curveSegments: 72 });
  body.rotateX(-Math.PI / 2);
  g.add(mesh(body));
  const rim = new THREE.ExtrudeGeometry(ringShape(outer / 2 + flange, Math.min(inner / 2, outer / 2 - 0.5)), { depth: 2, bevelEnabled: false, curveSegments: 72 });
  rim.rotateX(-Math.PI / 2);
  g.add(mesh(rim, [0, height, 0]));
  return g;
}

function funnelGeometry() {
  const { top, bottom, height, spout, wall } = values;
  const g = new THREE.Group();
  const points = [
    new THREE.Vector2(bottom / 2, 0),
    new THREE.Vector2(top / 2, height),
    new THREE.Vector2(Math.max(0.5, top / 2 - wall), height),
    new THREE.Vector2(Math.max(0.5, bottom / 2 - wall), 0)
  ];
  g.add(mesh(new THREE.LatheGeometry(points, 96)));
  const tube = new THREE.ExtrudeGeometry(ringShape(bottom / 2, Math.max(0.5, bottom / 2 - wall)), { depth: spout, bevelEnabled: false, curveSegments: 64 });
  tube.rotateX(-Math.PI / 2);
  g.add(mesh(tube, [0, -spout, 0]));
  return g;
}

function phoneGeometry() {
  const { width: w, height: h, depth: d, thickness: t, lip } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, t, d), [0, t / 2, 0]));
  const angle = -Math.PI / 9;
  g.add(mesh(new THREE.BoxGeometry(w, h, t), [0, h / 2, -d * 0.23], [angle, 0, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, lip, t), [0, lip / 2, d / 2 - t / 2]));
  return g;
}

function cornerGeometry() {
  const { length, width, thickness: t, hole } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(width, t, length), [0, t / 2, length / 2 - t]));
  g.add(mesh(new THREE.BoxGeometry(width, length, t), [0, length / 2, -t / 2]));
  if (hole > 0) {
    const collar = new THREE.ExtrudeGeometry(ringShape(hole, hole / 2), { depth: t, bevelEnabled: false, curveSegments: 48 });
    collar.rotateX(-Math.PI / 2);
    g.add(mesh(collar, [0, 0, length / 2]));
  }
  return g;
}

function shelfGeometry() {
  const { width: w, depth: d, height: h, thickness: t } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, t, d), [0, h, d / 2 - t]));
  g.add(mesh(new THREE.BoxGeometry(w, h, t), [0, h / 2, -t / 2]));
  const diagonal = Math.hypot(d * 0.72, h * 0.72);
  const angle = Math.atan2(h, d);
  g.add(mesh(new THREE.BoxGeometry(w * 0.7, t, diagonal), [0, h * 0.48, d * 0.45], [angle, 0, 0]));
  return g;
}

const GEOMETRY_BUILDERS = {
  box: boxGeometry, cylinder: cylinderGeometry, bracket: bracketGeometry,
  lid: lidGeometry, spacer: spacerGeometry, plate: plateGeometry,
  knob: knobGeometry, clip: clipGeometry, wallmount: wallmountGeometry,
  foot: footGeometry, washer: washerGeometry, hook: hookGeometry,
  handle: handleGeometry, grommet: grommetGeometry, funnel: funnelGeometry,
  phone: phoneGeometry, corner: cornerGeometry, shelf: shelfGeometry
};

function disposeGroup(group) {
  if (!group) return;
  group.traverse(child => child.geometry?.dispose());
  scene.remove(group);
}

function updateModel() {
  disposeGroup(modelGroup);
  modelGroup = GEOMETRY_BUILDERS[currentModel]();
  scene.add(modelGroup);
  updateStats();
}

function renderForm() {
  const form = document.querySelector("#parameter-form");
  form.innerHTML = "";
  MODELS[currentModel].fields.forEach(([key, label, min, max, step, help]) => {
    const percent = ((values[key] - min) / (max - min)) * 100;
    const field = document.createElement("div");
    field.className = "field";
    field.innerHTML = `
      <div class="field-head">
        <label for="${key}">${label}</label>
        <span class="number-wrap"><input type="number" id="${key}-number" min="${min}" max="${max}" step="${step}" value="${values[key]}"><span>mm</span></span>
      </div>
      <input type="range" id="${key}" min="${min}" max="${max}" step="${step}" value="${values[key]}" style="--fill:${percent}%">
      <p class="field-help">${help}</p>`;
    const range = field.querySelector('input[type="range"]');
    const number = field.querySelector('input[type="number"]');
    const sync = (raw) => {
      values[key] = Math.max(min, Math.min(max, Number(raw)));
      range.value = values[key]; number.value = values[key];
      range.style.setProperty("--fill", `${((values[key] - min) / (max - min)) * 100}%`);
      updateModel();
    };
    range.addEventListener("input", e => sync(e.target.value));
    number.addEventListener("change", e => sync(e.target.value));
    form.appendChild(field);
  });
}

function updateStats() {
  let triangles = 0;
  modelGroup.updateMatrixWorld(true);
  modelGroup.traverse(child => {
    if (child.isMesh) triangles += child.geometry.index ? child.geometry.index.count / 3 : child.geometry.attributes.position.count / 3;
  });
  document.querySelector("#triangle-count").textContent = Math.round(triangles).toLocaleString("de-DE");
  const size = new THREE.Vector3();
  new THREE.Box3().setFromObject(modelGroup).getSize(size);
  const dimensions = `${size.x.toFixed(0)} × ${size.z.toFixed(0)} × ${size.y.toFixed(0)} mm`;
  let volume = 0;
  modelGroup.traverse(child => {
    if (!child.isMesh) return;
    const geometry = child.geometry.toNonIndexed();
    const p = geometry.attributes.position;
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    for (let i = 0; i < p.count; i += 3) {
      a.fromBufferAttribute(p, i).applyMatrix4(child.matrixWorld);
      b.fromBufferAttribute(p, i + 1).applyMatrix4(child.matrixWorld);
      c.fromBufferAttribute(p, i + 2).applyMatrix4(child.matrixWorld);
      volume += Math.abs(a.dot(b.clone().cross(c)) / 6);
    }
    geometry.dispose();
  });
  volume /= 1000;
  document.querySelector("#top-dimensions").textContent = dimensions;
  document.querySelector("#volume").textContent = volume.toFixed(1).replace(".", ",");
}

function resetCamera() {
  const box = new THREE.Box3().setFromObject(modelGroup);
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const direction = new THREE.Vector3(1, 0.82, 1).normalize();
  const distance = Math.max(35, sphere.radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.25);
  controls.target.copy(sphere.center);
  camera.position.copy(sphere.center).add(direction.multiplyScalar(distance));
  camera.near = Math.max(0.1, distance / 100);
  camera.far = distance * 20;
  camera.updateProjectionMatrix();
  controls.update();
}

function scadSource() {
  const stamp = new Date().toISOString().slice(0, 10);
  if (currentModel === "box") {
    const { width:w, depth:d, height:h, wall, bottom } = values;
    return `// Formwerk Gehäuse — ${stamp}\n// Maße in Millimetern\n\nwidth = ${w};\ndepth = ${d};\nheight = ${h};\nwall = ${wall};\nbottom = ${bottom};\n\nunion() {\n  cube([width, depth, bottom]);\n  translate([0, 0, bottom]) {\n    cube([width, wall, height-bottom]);\n    translate([0, depth-wall, 0]) cube([width, wall, height-bottom]);\n    cube([wall, depth, height-bottom]);\n    translate([width-wall, 0, 0]) cube([wall, depth, height-bottom]);\n  }\n}\n`;
  }
  if (currentModel === "cylinder") {
    const { diameter, height, wall, bottom } = values;
    if (wall <= 0) return `// Formwerk Zylinder — ${stamp}\n$fn = 128;\ndiameter = ${diameter};\nheight = ${height};\n\ncylinder(d=diameter, h=height);\n`;
    return `// Formwerk Hülse — ${stamp}\n$fn = 128;\ndiameter = ${diameter};\nheight = ${height};\nwall = ${wall};\nbottom = ${bottom};\n\ndifference() {\n  cylinder(d=diameter, h=height);\n  translate([0, 0, bottom]) cylinder(d=diameter-2*wall, h=height-bottom+0.01);\n}\n`;
  }
  if (currentModel === "bracket") {
    const { width:w, depth:d, height:h, thickness:t, hole } = values;
    return `// Formwerk Winkelhalter — ${stamp}\n$fn = 64;\nwidth = ${w};\ndepth = ${d};\nheight = ${h};\nthickness = ${t};\nhole = ${hole};\n\ndifference() {\n  union() {\n    cube([width, depth, thickness]);\n    cube([width, thickness, height]);\n  }\n  if (hole > 0) {\n    for (x = [width/4, width*3/4]) {\n      translate([x, depth/2, -0.01]) cylinder(d=hole, h=thickness+0.02);\n      translate([x, -0.01, height/2]) rotate([-90,0,0]) cylinder(d=hole, h=thickness+0.02);\n    }\n  }\n}\n`;
  }
  if (currentModel === "lid") {
    const { width, depth, thickness, lip, clearance } = values;
    return `// Formwerk Steckdeckel — ${stamp}\nwidth=${width}; depth=${depth}; thickness=${thickness}; lip=${lip}; clearance=${clearance}; wall=2.4;\n\nunion() {\n  translate([0,0,lip]) cube([width,depth,thickness]);\n  difference() {\n    cube([width-2*clearance,depth-2*clearance,lip]);\n    translate([wall,wall,-0.01]) cube([width-2*clearance-2*wall,depth-2*clearance-2*wall,lip+0.02]);\n  }\n}\n`;
  }
  if (currentModel === "spacer") {
    const { outer, inner, height, flange } = values;
    return `// Formwerk Abstandshalter — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height}; flange=${flange};\n\ndifference() {\n  union() { cylinder(d=outer,h=height); cylinder(d=outer+2*flange,h=2); }\n  translate([0,0,-0.01]) cylinder(d=inner,h=height+0.02);\n}\n`;
  }
  if (currentModel === "plate") {
    const { width, depth, thickness, hole, inset } = values;
    return `// Formwerk Montageplatte — ${stamp}\n$fn=64; width=${width}; depth=${depth}; thickness=${thickness}; hole=${hole}; inset=${inset};\n\ndifference() {\n  cube([width,depth,thickness]);\n  for (x=[inset,width-inset], y=[inset,depth-inset]) translate([x,y,-0.01]) cylinder(d=hole,h=thickness+0.02);\n}\n`;
  }
  if (currentModel === "knob") {
    const { diameter, height, shaft, ribs } = values;
    return `// Formwerk Drehknopf — ${stamp}\n$fn=128; diameter=${diameter}; height=${height}; shaft=${shaft}; ribs=${ribs};\n\ndifference() {\n  union() {\n    cylinder(d=diameter,h=height);\n    for (a=[0:360/ribs:359]) rotate([0,0,a]) translate([diameter/2,0,height/2]) cube([2,2,height*0.72],center=true);\n  }\n  translate([0,0,-0.01]) cylinder(d=shaft,h=height+0.02);\n}\n`;
  }
  if (currentModel === "wallmount") {
    const { width, height, thickness, rail, clearance } = values;
    return `// Formwerk zweiteiliger Wandhalter — ${stamp}\n$fn=64; width=${width}; height=${height}; thickness=${thickness}; rail=${rail}; clearance=${clearance};\n\n// Wandteil\ntranslate([0,0,0]) difference() {\n  union() {\n    cube([width,height,thickness]);\n    translate([(width-rail)/2,height*0.14,thickness]) cube([rail,height*0.72,rail/2]);\n  }\n  for(y=[height/3,height*2/3]) translate([width/2,y,-0.01]) cylinder(d=5,h=thickness+0.02);\n}\n// Geräteteil, separat drucken\ntranslate([width+15,0,0]) difference() {\n  cube([width,height*0.65,thickness+rail/2]);\n  translate([(width-rail-clearance*2)/2,height*0.08,thickness]) cube([rail+clearance*2,height*0.55,rail/2+0.1]);\n}\n`;
  }
  if (currentModel === "foot") {
    const { diameter, height, hole, recess } = values;
    return `// Formwerk Gerätefuß — ${stamp}\n$fn=96; diameter=${diameter}; height=${height}; hole=${hole}; recess=${recess};\n\ndifference() {\n  cylinder(d=diameter,h=height);\n  translate([0,0,-0.01]) cylinder(d=hole,h=height+0.02);\n  if (recess>0) translate([0,0,-0.01]) cylinder(d=diameter*0.68,h=recess);\n}\n`;
  }
  if (currentModel === "washer") {
    const { outer, inner, height } = values;
    return `// Formwerk Unterlegscheibe — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height};\n\ndifference(){ cylinder(d=outer,h=height); translate([0,0,-0.01]) cylinder(d=inner,h=height+0.02); }\n`;
  }
  if (currentModel === "hook") {
    const { width, height, reach, thickness } = values;
    return `// Formwerk Wandhaken — ${stamp}\nwidth=${width}; height=${height}; reach=${reach}; thickness=${thickness};\n\nunion(){ cube([width,thickness,height]); cube([width,reach,thickness]); translate([0,reach-thickness,0]) cube([width,thickness,thickness*3]); }\n`;
  }
  if (currentModel === "handle") {
    const { length, depth, width, thickness } = values;
    return `// Formwerk Möbelgriff — ${stamp}\nlength=${length}; depth=${depth}; width=${width}; thickness=${thickness};\n\nunion(){ translate([0,depth,0]) cube([length,thickness,width]); cube([thickness,depth,width]); translate([length-thickness,0,0]) cube([thickness,depth,width]); }\n`;
  }
  if (currentModel === "grommet") {
    const { outer, inner, height, flange } = values;
    return `// Formwerk Kabeldurchführung — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height}; flange=${flange};\n\ndifference(){ union(){ cylinder(d=outer,h=height); translate([0,0,height]) cylinder(d=outer+2*flange,h=2); } translate([0,0,-0.01]) cylinder(d=inner,h=height+2.02); }\n`;
  }
  if (currentModel === "funnel") {
    const { top, bottom, height, spout, wall } = values;
    return `// Formwerk Trichter — ${stamp}\n$fn=128; top=${top}; bottom=${bottom}; height=${height}; spout=${spout}; wall=${wall};\n\ndifference(){ union(){ cylinder(d1=bottom,d2=top,h=height); translate([0,0,-spout]) cylinder(d=bottom,h=spout); } translate([0,0,-spout-0.01]) cylinder(d=bottom-2*wall,h=spout+0.02); translate([0,0,0]) cylinder(d1=bottom-2*wall,d2=top-2*wall,h=height+0.01); }\n`;
  }
  if (currentModel === "phone") {
    const { width, height, depth, thickness, lip } = values;
    return `// Formwerk Handyhalter — ${stamp}\nwidth=${width}; height=${height}; depth=${depth}; thickness=${thickness}; lip=${lip};\n\nunion(){ cube([width,depth,thickness]); translate([0,depth*0.25,thickness]) rotate([70,0,0]) cube([width,height,thickness]); translate([0,depth-thickness,thickness]) cube([width,thickness,lip]); }\n`;
  }
  if (currentModel === "corner") {
    const { length, width, thickness, hole } = values;
    return `// Formwerk Eckverbinder — ${stamp}\nlength=${length}; width=${width}; thickness=${thickness}; hole=${hole};\n\nunion(){ cube([width,length,thickness]); cube([width,thickness,length]); }\n`;
  }
  if (currentModel === "shelf") {
    const { width, depth, height, thickness } = values;
    return `// Formwerk Regalbodenträger — ${stamp}\nwidth=${width}; depth=${depth}; height=${height}; thickness=${thickness};\n\nunion(){ translate([0,0,height-thickness]) cube([width,depth,thickness]); cube([width,thickness,height]); hull(){ translate([width*.15,thickness,height*.15]) cube([width*.7,thickness,thickness]); translate([width*.15,depth*.72,height*.82]) cube([width*.7,thickness,thickness]); } }\n`;
  }
  const { cable, width, wall, opening, base } = values;
  return `// Formwerk Kabelclip — ${stamp}\n$fn=96; cable=${cable}; width=${width}; wall=${wall}; opening=${opening}; base=${base};\n\nunion() {\n  cube([base,width,wall]);\n  translate([base/2,width,wall+cable/2]) rotate([90,0,0])\n    difference() {\n      cylinder(d=cable+2*wall,h=width);\n      translate([0,0,-0.01]) cylinder(d=cable,h=width+0.02);\n      translate([0,-opening/2,-0.01]) cube([cable+2*wall,opening,width+0.02]);\n    }\n}\n`;
}

function download(data, filename, type) {
  const blob = new Blob([data], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  toast(`${filename} wurde erstellt`);
}

function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
}

document.querySelectorAll(".model-card").forEach(button => {
  button.addEventListener("click", () => {
    currentModel = button.dataset.model;
    values = { ...MODELS[currentModel].defaults };
    document.querySelectorAll(".model-card").forEach(x => x.classList.toggle("active", x === button));
    document.querySelector("#model-title").textContent = MODELS[currentModel].title;
    renderForm(); updateModel(); resetCamera();
  });
});
document.querySelector("#reset-params").addEventListener("click", () => {
  values = { ...MODELS[currentModel].defaults }; renderForm(); updateModel();
});
document.querySelector("#reset-view").addEventListener("click", resetCamera);
document.querySelector("#toggle-grid").addEventListener("click", e => {
  grid.visible = !grid.visible; e.currentTarget.classList.toggle("active", grid.visible);
});
document.querySelector("#export-scad").addEventListener("click", () => download(scadSource(), `${currentModel}-parametric.scad`, "text/plain"));
document.querySelector("#export-stl").addEventListener("click", () => {
  const exporter = new STLExporter();
  const binary = exporter.parse(modelGroup, { binary: true });
  download(binary, `${currentModel}-print.stl`, "model/stl");
});

function resize() {
  const { clientWidth:w, clientHeight:h } = viewport;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener("resize", resize);
function animate() {
  controls.update(); renderer.render(scene, camera); requestAnimationFrame(animate);
}

renderForm();
updateModel();
resize();
animate();
