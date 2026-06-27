export function createGeometryBuilders(THREE, material) {
  let values;

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

function gridbinGeometry() {
  const { width: w, depth: d, height: h, wall, bottom } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, bottom, d), [0, bottom / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, -(d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, (d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [-(w - wall) / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [(w - wall) / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w - 4, 3, d - 4), [0, -1.5, 0]));
  return g;
}

function organizerGeometry() {
  const { width: w, depth: d, height: h, wall, dividers } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, wall, d), [0, wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, -(d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, (d - wall) / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [-(w - wall) / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [(w - wall) / 2, h / 2, 0]));
  for (let i = 1; i < dividers; i++) {
    g.add(mesh(new THREE.BoxGeometry(wall, h * 0.72, d - wall * 2), [-w / 2 + i * w / dividers, h * 0.36, 0]));
  }
  return g;
}

function cablecombGeometry() {
  const { cables, diameter, spacing, thickness, depth } = values;
  const total = cables * diameter + (cables + 1) * spacing;
  const shape = new THREE.Shape();
  shape.moveTo(-total / 2, 0); shape.lineTo(total / 2, 0); shape.lineTo(total / 2, diameter + thickness); shape.lineTo(-total / 2, diameter + thickness); shape.closePath();
  for (let i = 0; i < cables; i++) {
    const hole = new THREE.Path();
    hole.absarc(-total / 2 + spacing + diameter / 2 + i * (diameter + spacing), thickness + diameter / 2, diameter / 2, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 48 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(geometry);
}

function adapterGeometry() {
  const { diameter1, diameter2, length, wall } = values;
  const r1 = diameter1 / 2, r2 = diameter2 / 2;
  const points = [
    new THREE.Vector2(r1, 0), new THREE.Vector2(r2, length),
    new THREE.Vector2(Math.max(.5, r2 - wall), length),
    new THREE.Vector2(Math.max(.5, r1 - wall), 0)
  ];
  return mesh(new THREE.LatheGeometry(points, 96), [0, 0, 0]);
}

function pipeclampGeometry() {
  const { diameter, width, wall, foot } = values;
  const g = new THREE.Group();
  const radius = diameter / 2 + wall / 2;
  const torus = new THREE.TorusGeometry(radius, wall / 2, 16, 80, Math.PI * 1.72);
  torus.rotateY(Math.PI / 2);
  torus.rotateX(Math.PI * 0.14);
  g.add(mesh(torus, [0, radius + wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(foot, wall, width), [-radius, wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(foot, wall, width), [radius, wall / 2, 0]));
  return g;
}

function bearingGeometry() {
  const { bearing, width, height, depth, base } = values;
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0); shape.lineTo(width / 2, 0); shape.lineTo(width / 2, height); shape.lineTo(-width / 2, height); shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, Math.max(bearing / 2 + base, height * .58), bearing / 2, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 72 });
  return mesh(geometry, [0, 0, -depth / 2]);
}

function servoGeometry() {
  const { width: w, depth: d, height: h, wall, flange } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w + wall * 2 + flange * 2, wall, d + wall * 2), [0, wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d + wall * 2), [-(w + wall) / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d + wall * 2), [(w + wall) / 2, h / 2, 0]));
  return g;
}

function drillguideGeometry() {
  const { holes, spacing, hole, width, thickness } = values;
  const length = (holes - 1) * spacing + width;
  const shape = new THREE.Shape();
  shape.moveTo(-length / 2, -width / 2); shape.lineTo(length / 2, -width / 2); shape.lineTo(length / 2, width / 2); shape.lineTo(-length / 2, width / 2); shape.closePath();
  for (let i = 0; i < holes; i++) {
    const p = new THREE.Path();
    p.absarc(-(holes - 1) * spacing / 2 + i * spacing, 0, hole / 2, 0, Math.PI * 2, true);
    shape.holes.push(p);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 48 });
  geometry.rotateX(-Math.PI / 2);
  return mesh(geometry);
}

function labelholderGeometry() {
  const { width: w, height: h, base, thickness: t, slot } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, t, base), [0, t / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h, t), [0, h / 2, -slot / 2 - t / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h * .35, t), [0, h * .175, slot / 2 + t / 2]));
  return g;
}

function magnetcupGeometry() {
  const { magnet, height, wall, base, clearance } = values;
  const inner = Math.max(.5, (magnet + clearance) / 2);
  const g = new THREE.Group();
  const ring = new THREE.ExtrudeGeometry(ringShape(inner + wall, inner), { depth: height, bevelEnabled: false, curveSegments: 72 });
  ring.rotateX(-Math.PI / 2);
  g.add(mesh(ring));
  g.add(mesh(new THREE.CylinderGeometry(inner + wall, inner + wall, base, 72), [0, base / 2, 0]));
  return g;
}

function lineMesh(length, thickness, depth, x, y, angle = 0) {
  return mesh(new THREE.BoxGeometry(length, thickness, depth), [x, y, 0], [0, 0, angle]);
}

function kumikoPanel(width, height, frame, depth, cell, pattern) {
  const panel = new THREE.Group();
  panel.add(lineMesh(width, frame, depth, 0, frame / 2));
  panel.add(lineMesh(width, frame, depth, 0, height - frame / 2));
  panel.add(lineMesh(height, frame, depth, -width / 2 + frame / 2, height / 2, Math.PI / 2));
  panel.add(lineMesh(height, frame, depth, width / 2 - frame / 2, height / 2, Math.PI / 2));
  const innerW = width - frame * 2;
  const innerH = height - frame * 2;
  const bar = Math.max(1.2, frame * .32);
  const cols = Math.max(2, Math.floor(innerW / cell));
  const rows = Math.max(3, Math.floor(innerH / cell));
  const dx = innerW / cols, dy = innerH / rows;
  const addLine = (x1, y1, x2, y2) => {
    const length = Math.hypot(x2 - x1, y2 - y1);
    panel.add(lineMesh(length, bar, depth, (x1 + x2) / 2, (y1 + y2) / 2, Math.atan2(y2 - y1, x2 - x1)));
  };
  if (pattern === "kikko") {
    const radius = Math.min(dx, dy) * .38;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cx = -innerW / 2 + dx / 2 + c * dx;
      const cy = frame + dy / 2 + r * dy;
      const pts = Array.from({ length: 6 }, (_, i) => [cx + Math.cos(i * Math.PI / 3) * radius, cy + Math.sin(i * Math.PI / 3) * radius]);
      pts.forEach((p, i) => {
        const q = pts[(i + 1) % 6];
        if ([...p, ...q].every(Number.isFinite)) addLine(...p, ...q);
      });
      addLine(cx - dx / 2, cy, cx + dx / 2, cy);
      addLine(cx, cy - dy / 2, cx, cy + dy / 2);
    }
  } else if (pattern === "shippo") {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cx = -innerW / 2 + dx / 2 + c * dx, cy = frame + dy / 2 + r * dy;
      const radius = Math.min(dx, dy) * .43;
      const curve = new THREE.EllipseCurve(cx, cy, radius, radius, 0, Math.PI * 2, false, 0);
      const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curve.getPoints(24).map(p => new THREE.Vector3(p.x, p.y, 0)), true), 24, bar / 2, 6, true);
      panel.add(mesh(geometry));
      addLine(cx - radius, cy, cx + radius, cy);
      addLine(cx, cy - dy / 2, cx, cy + dy / 2);
    }
  } else if (pattern === "seigaiha") {
    for (let r = 0; r < rows; r++) {
      const cy = frame + (r + 1) * dy;
      for (let c = 0; c < cols; c++) {
        const x0 = -innerW / 2 + c * dx;
        const curve = new THREE.EllipseCurve(x0 + dx / 2, cy, dx / 2, dy * .72, Math.PI, Math.PI * 2, false, 0);
        const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(curve.getPoints(18).map(p => new THREE.Vector3(p.x, p.y, 0))), 18, bar / 2, 6, false);
        panel.add(mesh(geometry));
        addLine(x0, cy, x0 + dx, cy);
      }
      addLine(-innerW / 2 + dx / 2, cy - dy, -innerW / 2 + dx / 2, cy);
    }
  } else {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x0 = -innerW / 2 + c * dx, y0 = frame + r * dy;
      const cx = x0 + dx / 2, cy = y0 + dy / 2;
      addLine(x0, y0, x0 + dx, y0 + dy);
      addLine(x0 + dx, y0, x0, y0 + dy);
      addLine(cx, y0, cx, y0 + dy);
      addLine(x0, cy, x0 + dx, cy);
    }
  }
  return panel;
}

function kumikoGeometry() {
  const { size, height, frame, depth, cell, pattern, bottom, top } = values;
  const g = new THREE.Group();
  const panelDefs = [
    [[0, 0, -size / 2], [0, 0, 0]],
    [[0, 0, size / 2], [0, Math.PI, 0]],
    [[-size / 2, 0, 0], [0, Math.PI / 2, 0]],
    [[size / 2, 0, 0], [0, -Math.PI / 2, 0]]
  ];
  panelDefs.forEach(([position, rotation]) => {
    const panel = kumikoPanel(size, height, frame, depth, cell, pattern);
    panel.position.set(...position);
    panel.rotation.set(...rotation);
    g.add(panel);
  });
  [frame / 2, height - frame / 2].forEach(y => {
    g.add(mesh(new THREE.BoxGeometry(size + frame, frame, frame), [0, y, -size / 2]));
    g.add(mesh(new THREE.BoxGeometry(size + frame, frame, frame), [0, y, size / 2]));
    g.add(mesh(new THREE.BoxGeometry(frame, frame, size - frame), [-size / 2, y, 0]));
    g.add(mesh(new THREE.BoxGeometry(frame, frame, size - frame), [size / 2, y, 0]));
  });
  if (bottom) g.add(mesh(new THREE.BoxGeometry(size - frame * 2, depth, size - frame * 2), [0, depth / 2, 0]));
  if (top) g.add(mesh(new THREE.BoxGeometry(size - frame * 2, depth, size - frame * 2), [0, height - depth / 2, 0]));
  return g;
}

function gridinsertGeometry() {
  const { cols, rows, height, kind, holes } = values;
  const w = cols * 42, d = rows * 42, wall = 2.2;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, 3, d), [0, 1.5, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, height, wall), [0, height / 2, -d / 2 + wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, height, wall), [0, height / 2, d / 2 - wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, height, d), [-w / 2 + wall / 2, height / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, height, d), [w / 2 - wall / 2, height / 2, 0]));
  const deckY = Math.max(6, height * 0.28);
  g.add(mesh(new THREE.BoxGeometry(w - wall * 4, 2.2, d - wall * 4), [0, deckY, 0]));
  const dia = kind === "bits" ? 7 : kind === "nozzles" ? 8.5 : 2.8;
  const count = Math.min(holes, 24);
  const pitch = kind === "cards" ? 16 : 14;
  const margin = kind === "cards" ? 13 : 14;
  const columns = Math.max(1, Math.floor((w - margin * 2) / pitch) + 1);
  const pocketMaterial = material.clone();
  pocketMaterial.color = new THREE.Color(0x0c100e);
  pocketMaterial.roughness = 0.9;
  for (let i = 0; i < count; i++) {
    const x = -w / 2 + margin + (i % columns) * pitch;
    const z = -d / 2 + margin + Math.floor(i / columns) * pitch;
    if (x > w / 2 - margin || z > d / 2 - margin) break;
    if (kind === "cards") {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, dia + 3), pocketMaterial);
      slot.position.set(x, deckY + 1.2, z);
      g.add(slot);
      g.add(mesh(new THREE.BoxGeometry(1.4, 5, dia + 4), [x - 5.7, deckY + 3, z]));
      g.add(mesh(new THREE.BoxGeometry(1.4, 5, dia + 4), [x + 5.7, deckY + 3, z]));
    } else {
      const pocket = new THREE.Mesh(new THREE.CylinderGeometry(dia / 2, dia / 2, 1.4, 32), pocketMaterial);
      pocket.position.set(x, deckY + 1.3, z);
      g.add(pocket);
      const collar = new THREE.ExtrudeGeometry(ringShape(dia / 2 + 1.4, dia / 2), { depth: 2.4, bevelEnabled: false, curveSegments: 32 });
      collar.rotateX(-Math.PI / 2);
      g.add(mesh(collar, [x, deckY + 1.6, z]));
    }
  }
  return g;
}

function electronicsGeometry() {
  const { width: w, depth: d, height: h, wall, vents, bosses } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, wall, d), [0, wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, -d / 2 + wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, d / 2 - wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [-w / 2 + wall / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [w / 2 - wall / 2, h / 2, 0]));
  if (bosses) [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([x,z]) => {
    g.add(mesh(new THREE.CylinderGeometry(3.8, 3.8, h * .45, 32), [x * (w / 2 - 12), wall + h * .225, z * (d / 2 - 12)]));
    g.add(mesh(new THREE.CylinderGeometry(1.3, 1.3, h * .47, 24), [x * (w / 2 - 12), wall + h * .235, z * (d / 2 - 12)]));
  });
  if (vents) for (let i = -2; i <= 2; i++) g.add(mesh(new THREE.BoxGeometry(18, 1.2, wall * 1.4), [i * 12, h * .7, d / 2]));
  return g;
}

function lamppanelGeometry() {
  const { width: w, height: h, frame, depth, pattern, density } = values;
  const g = new THREE.Group();
  g.add(lineMesh(w, frame, depth, 0, frame / 2));
  g.add(lineMesh(w, frame, depth, 0, h - frame / 2));
  g.add(lineMesh(h, frame, depth, -w / 2 + frame / 2, h / 2, Math.PI / 2));
  g.add(lineMesh(h, frame, depth, w / 2 - frame / 2, h / 2, Math.PI / 2));
  const innerW = w - 2 * frame, innerH = h - 2 * frame;
  const cols = Math.max(2, density);
  const rows = Math.max(2, Math.round(innerH / (innerW / cols)));
  const dx = innerW / cols, dy = innerH / rows;
  const bar = Math.max(1.6, frame * .35);
  for (let i = 1; i < cols; i++) g.add(lineMesh(innerH, bar, depth, -innerW / 2 + i * dx, h / 2, Math.PI / 2));
  for (let r = 1; r < rows; r++) g.add(lineMesh(innerW, bar, depth, 0, frame + r * dy));
  if (pattern === "diagonal") {
    for (let i = -rows; i <= cols; i += 2) {
      const x = -innerW / 2 + i * dx;
      g.add(lineMesh(Math.hypot(innerH, innerH), bar * .85, depth, x + innerH / 2, h / 2, Math.PI / 4));
    }
  } else if (pattern === "waves") {
    for (let r = 0; r < rows; r++) {
      const y = frame + dy / 2 + r * dy;
      const curve = new THREE.CatmullRomCurve3(Array.from({ length: cols + 1 }, (_, i) => new THREE.Vector3(-innerW / 2 + i * dx, y + Math.sin(i * Math.PI) * dy * .22, 0)));
      g.add(mesh(new THREE.TubeGeometry(curve, cols * 8, bar / 2, 6, false)));
    }
  } else {
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      g.add(mesh(new THREE.TorusGeometry(Math.min(dx, dy) * .22, bar / 3, 8, 24), [-innerW / 2 + dx / 2 + c * dx, frame + dy / 2 + r * dy, 0], [Math.PI / 2, 0, 0]));
    }
  }
  return g;
}

function batteryholderGeometry() {
  const { cells, type, wall, height } = values;
  const dia = type === "aaa" ? 11 : type === "18650" ? 18.8 : 14.5;
  const pitch = dia + wall;
  const w = cells * pitch + wall, d = dia + wall * 2;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, wall, d), [0, wall / 2, 0]));
  for (let i = 0; i < cells; i++) {
    const x = -w / 2 + wall + dia / 2 + i * pitch;
    g.add(mesh(new THREE.CylinderGeometry(dia / 2 + wall / 2, dia / 2 + wall / 2, height, 36, 1, true), [x, height / 2, 0], [0, 0, 0]));
  }
  return g;
}

function hingeboxGeometry() {
  const { width: w, depth: d, height: h, wall, lid, hinge } = values;
  const g = new THREE.Group();
  g.add(mesh(new THREE.BoxGeometry(w, wall, d), [0, wall / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, -d / 2 + wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(w, h, wall), [0, h / 2, d / 2 - wall / 2]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [-w / 2 + wall / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(wall, h, d), [w / 2 - wall / 2, h / 2, 0]));
  g.add(mesh(new THREE.BoxGeometry(w * .28, wall * 1.8, wall * 2), [0, h * .72, d / 2 + wall / 2]));

  const lidZ = -d - hinge * 1.4;
  g.add(mesh(new THREE.BoxGeometry(w, lid, d), [0, h + lid / 2, lidZ]));
  g.add(mesh(new THREE.BoxGeometry(w - wall * 4, wall, d - wall * 4), [0, h - wall / 2, lidZ]));
  g.add(mesh(new THREE.BoxGeometry(w * .22, wall * 1.8, wall * 2), [0, h + lid + wall, lidZ + d / 2 + wall / 2]));

  [-0.32, 0.32].forEach(x => {
    g.add(mesh(new THREE.CylinderGeometry(hinge / 2, hinge / 2, w * .28, 24), [x * w, h + hinge / 2, -d / 2], [0, 0, Math.PI / 2]));
  });
  g.add(mesh(new THREE.CylinderGeometry(hinge / 2, hinge / 2, w * .34, 24), [0, h + hinge / 2, lidZ + d / 2], [0, 0, Math.PI / 2]));
  return g;
}

const GEOMETRY_BUILDERS = {
  box: boxGeometry, cylinder: cylinderGeometry, bracket: bracketGeometry,
  lid: lidGeometry, spacer: spacerGeometry, plate: plateGeometry,
  knob: knobGeometry, clip: clipGeometry, wallmount: wallmountGeometry,
  foot: footGeometry, washer: washerGeometry, hook: hookGeometry,
  handle: handleGeometry, grommet: grommetGeometry, funnel: funnelGeometry,
  phone: phoneGeometry, corner: cornerGeometry, shelf: shelfGeometry,
  gridbin: gridbinGeometry, organizer: organizerGeometry, cablecomb: cablecombGeometry,
  adapter: adapterGeometry, pipeclamp: pipeclampGeometry, bearing: bearingGeometry,
  servo: servoGeometry, drillguide: drillguideGeometry, labelholder: labelholderGeometry,
  magnetcup: magnetcupGeometry, kumiko: kumikoGeometry,
  gridinsert: gridinsertGeometry, electronics: electronicsGeometry,
  lamppanel: lamppanelGeometry, batteryholder: batteryholderGeometry,
  hingebox: hingeboxGeometry
};

  return Object.fromEntries(Object.entries(GEOMETRY_BUILDERS).map(([key, builder]) => [
    key,
    nextValues => {
      values = nextValues;
      return builder();
    }
  ]));
}

