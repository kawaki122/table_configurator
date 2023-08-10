import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
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
  camera.position.z = 20;
  camera.position.y = 10;
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

function attachListeners() {
  const length = document.getElementById("lengthInput")
  const lengthLabel = document.getElementById("lengthLabel");
  const width = document.getElementById("widthInput")
  const widthLabel = document.getElementById("widthLabel");
  const height = document.getElementById("heightInput")
  const heightLabel = document.getElementById("heightLabel");
  const color = document.getElementById("colorInput")

  length.oninput = function() {
    frame.children[6].scale.setZ(1+(this.value/20));
    frame.children[7].scale.setZ(1+(this.value/20));

    frame.children[3].position.setZ((this.value*30.8))
    frame.children[1].position.setZ(-(this.value*30.8))
    frame.children[5].position.setZ((this.value*30.8))

    frame.children[0].position.setZ(-(this.value*30.8))
    frame.children[2].position.setZ(-(this.value*30.8))
    frame.children[4].position.setZ((this.value*30.8))
    lengthLabel.innerHTML = 20+Number(this.value)
  }

  width.oninput = function () {
    frame.children[0].scale.setX(1+(this.value/20))
    frame.children[3].scale.setX(1+(this.value/20))

    frame.children[5].position.setX((this.value*11.1))
    frame.children[1].position.setX(-(this.value*11.1))
    frame.children[4].position.setX(-(this.value*11.1))
    frame.children[2].position.setX((this.value*11.1))

    frame.children[6].position.setX(-(this.value*11.1))
    frame.children[7].position.setX((this.value*11.1))
    widthLabel.innerHTML = 10+Number(this.value)
  }

  height.oninput = function () {
    frame.children[1].scale.setY(1+(this.value/20))
    frame.children[2].scale.setY(1+(this.value/20))
    frame.children[4].scale.setY(1+(this.value/20))
    frame.children[5].scale.setY(1+(this.value/20))

    frame.children[0].position.setY((this.value*36.45))
    frame.children[3].position.setY((this.value*36.45))
    frame.children[6].position.setY((this.value*36.45))
    frame.children[7].position.setY((this.value*36.45))
    heightLabel.innerHTML = 10+Number(this.value)
  }

  color.oninput = function (event) {
    frame.children[0].material.color.set(event.target.value);
    frame.children[1].material.color.set(event.target.value);
    frame.children[2].material.color.set(event.target.value);
    frame.children[3].material.color.set(event.target.value);
    frame.children[4].material.color.set(event.target.value);
    frame.children[5].material.color.set(event.target.value);
    frame.children[6].material.color.set(event.target.value);
    frame.children[7].material.color.set(event.target.value);
  }
}

function loadModel() {
  const loader = new OBJLoader(loadManager);
  loader.load(`./assets/models/thusia.obj`, (obj) => {
    frame = obj;
    obj.scale.set(0.01, 0.01, 0.01)
    console.log(obj)
    scene.add(obj);
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
