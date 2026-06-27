import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { MODELS } from './models.js';
import { createGeometryBuilders } from './geometry.js';
import { scadSource } from './scad.js';
import './style.css';

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

const GEOMETRY_BUILDERS = createGeometryBuilders(THREE, material);

function disposeGroup(group) {
  if (!group) return;
  group.traverse(child => child.geometry?.dispose());
  scene.remove(group);
}

function updateModel() {
  disposeGroup(modelGroup);
  modelGroup = GEOMETRY_BUILDERS[currentModel](values);
  scene.add(modelGroup);
  updateStats();
}

function renderForm() {
  const form = document.querySelector("#parameter-form");
  form.innerHTML = "";
  MODELS[currentModel].fields.forEach(fieldConfig => {
    if (!Array.isArray(fieldConfig)) {
      const field = document.createElement("div");
      field.className = "field";
      if (fieldConfig.type === "toggle") {
        field.innerHTML = `<div class="field-head"><label for="${fieldConfig.key}">${fieldConfig.label}</label>
          <input class="toggle-input" type="checkbox" id="${fieldConfig.key}" ${values[fieldConfig.key] ? "checked" : ""}></div>
          <p class="field-help">${fieldConfig.help}</p>`;
        field.querySelector("input").addEventListener("change", e => {
          values[fieldConfig.key] = e.target.checked;
          updateModel();
        });
        form.appendChild(field);
        return;
      }
      field.innerHTML = `<div class="field-head"><label for="${fieldConfig.key}">${fieldConfig.label}</label></div>
        <select class="select-input" id="${fieldConfig.key}">${fieldConfig.options.map(([value, label]) => `<option value="${value}" ${values[fieldConfig.key] === value ? "selected" : ""}>${label}</option>`).join("")}</select>
        <p class="field-help">${fieldConfig.help}</p>`;
      field.querySelector("select").addEventListener("change", e => {
        values[fieldConfig.key] = e.target.value;
        updateModel();
      });
      form.appendChild(field);
      return;
    }
    const [key, label, min, max, step, help] = fieldConfig;
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
  document.querySelector("#triangle-count").textContent = Math.round(triangles).toLocaleString("en-US");
  const size = new THREE.Vector3();
  new THREE.Box3().setFromObject(modelGroup).getSize(size);
  const dimensions = `${size.x.toFixed(0)} x ${size.z.toFixed(0)} x ${size.y.toFixed(0)} mm`;
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
  document.querySelector("#volume").textContent = volume.toFixed(1);
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

function download(data, filename, type) {
  const blob = new Blob([data], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  toast(`${filename} created`);
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
document.querySelector("#export-scad").addEventListener("click", () => download(scadSource(currentModel, values), `${currentModel}-parametric.scad`, "text/plain"));
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

