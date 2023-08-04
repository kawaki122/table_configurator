import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const colorsEnum = {
  color1: "#ffffff",
};

let scene, camera, renderer, controls, loadManager, frame;
let selectedColor = colorsEnum.color1;

initialize();
animate();
loadModel();
lightUp();
attachListeners();

function initialize() {
  const container = document.getElementById("myCanvas");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI / 2;
  // controls.autoRotate = true;

  scene.background = new THREE.Color("#ffffff");

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  camera.position.z = 2;
  camera.position.y = 1;
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

function attachListeners() {
  const length = document.getElementById("lengthInput")
  const lengthLabel = document.getElementById("lengthLabel");

  length.oninput = function() {
    console.log(this.value);
    frame.children[0].scale.set(1, 1+(this.value/20), 1)
    frame.children[1].scale.set(1, 1+(this.value/20), 1)
    frame.children[0].position.set(0.28, -(this.value/25), 0)
    frame.children[1].position.set(0, -(this.value/25), 0)
    frame.children[2].position.set(0, (this.value/33)-0.097, 0)
    frame.children[3].position.set(0, -((this.value/33)-0.097), 0)
    lengthLabel.innerHTML = 10+Number(this.value)
  }
}

function loadModel() {
  const loader = new GLTFLoader(loadManager);
  loader.load(`./assets/models/thusia.glb`, (obj) => {
    frame = new THREE.Group();
    let suport1 = createMesh(obj.scene.children[0].geometry);
    let suport2 = createMesh(obj.scene.children[1].geometry);
    let legs1 = createMesh(obj.scene.children[2].geometry);
    let legs2 = createMesh(obj.scene.children[3].geometry);

    suport1.position.set(0.28, 0, 0);
    legs1.position.set(0, -0.097, 0);
    legs2.position.set(0, 0.097, 0);

    console.log(suport1)

    frame.add(suport1);
    frame.add(suport2);
    frame.add(legs1);
    frame.add(legs2);

    frame.rotation.set(Math.PI / 2, 0, 0);
    frame.position.set(-0.35, 0, -0.8);

    scene.add(frame);
  });
}

function createMesh(geometry) {
  const material = new THREE.MeshStandardMaterial({
    color: "#A9ACB6",
    metalness: 0.3,
    roughness: 0.5,
    emissiveIntensity: 0.1,
    emissive: "#ffffff",
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function lightUp() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight7 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight8 = new THREE.DirectionalLight(0xffffff, 0.15);
  const directionalLight9 = new THREE.DirectionalLight(0xffffff, 0.15);
  const light = new THREE.AmbientLight(0x404040, 2);

  directionalLight.position.x = 25;
  directionalLight.position.y = 20;
  directionalLight2.position.x = -25;
  directionalLight2.position.y = 20;

  directionalLight3.position.z = -25;
  directionalLight3.position.y = 10;
  directionalLight4.position.z = 25;
  directionalLight4.position.y = 10;

  directionalLight5.position.z = -25;
  directionalLight5.position.x = -25;
  directionalLight5.position.y = -10;
  directionalLight6.position.z = 25;
  directionalLight6.position.x = 25;
  directionalLight6.position.y = -10;

  directionalLight7.position.z = 25;
  directionalLight7.position.x = -25;
  directionalLight7.position.y = -10;
  directionalLight8.position.z = -25;
  directionalLight8.position.x = 25;
  directionalLight8.position.y = -10;

  directionalLight9.position.y = 25;

  scene.add(light);
  scene.add(directionalLight);
  scene.add(directionalLight2);
  scene.add(directionalLight3);
  scene.add(directionalLight4);
  scene.add(directionalLight5);
  scene.add(directionalLight6);
  scene.add(directionalLight7);
  scene.add(directionalLight8);
}
