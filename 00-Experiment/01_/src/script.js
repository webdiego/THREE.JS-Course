import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Mesh, Material } from "three";
import gsap from "gsap";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
//FUNCTION
const randomPositionScale = function (position, dimension, rotation) {
  position.position.x = (Math.random() - 0.5) * 10;
  position.position.y = (Math.random() - 0.5) * 10;
  position.position.z = (Math.random() - 0.5) * 10;

  const scale = Math.random();
  dimension.scale.set(scale, scale, scale);

  rotation.rotation.x = Math.random() * Math.PI;
  rotation.rotation.y = Math.random() * Math.PI;
};
const gsapAnimation = function (object) {
  gsap.fromTo(
    object.rotation,
    { duration: 10, x: 0, y: 1 },
    { duration: 100, x: 100, y: 200 }
  );
};
const gsapAnimation2 = function (object) {
  gsap.fromTo(object.position, { x: 100 }, { duration: 4, x: 0 });
};
/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const Texture_1 = textureLoader.load("/textures/matcaps/1.png");
const Texture_2 = textureLoader.load("/textures/matcaps/2.png");
const Texture_3 = textureLoader.load("/textures/matcaps/3.png");
const Texture_4 = textureLoader.load("/textures/matcaps/4.png");
const Texture_5 = textureLoader.load("/textures/matcaps/5.png");
const Texture_6 = textureLoader.load("/textures/matcaps/6.png");
const Texture_7 = textureLoader.load("/textures/matcaps/7.png");
const Texture_8 = textureLoader.load("/textures/matcaps/8.png");
const Texture_9 = textureLoader.load("/textures/matcaps/9.jpg");
const Texture_10 = textureLoader.load("/textures/matcaps/10.jpg");
const Texture_11 = textureLoader.load("/textures/matcaps/11.jpg");
const Texture_12 = textureLoader.load("/textures/matcaps/12.jpg");
//WOOD MATERIAL
const wood_ao = textureLoader.load("/material/WOOD/ambientOcclusion.jpg");
const wood_height = textureLoader.load("/material/WOOD/height.jpg");
const wood_normal = textureLoader.load("/material/WOOD/normal.jpg");
const wood_rough = textureLoader.load("/material/WOOD/roughness.jpg");
const wood_base = textureLoader.load("/material/WOOD/basecolor.jpg");

/**
 * Object
 */

// const Material_Tex_1 = new THREE.MeshStandardMaterial({map:Texture_7});
// const Geometry_Ball =new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64),Material_Tex_1);

const Geometry_Ball = new THREE.SphereGeometry(0.5, 64, 64);
const Material_Tex_1 = new THREE.MeshStandardMaterial();
// Material_Tex_1.matcap = Texture_4;
// const Mesh_1 = new THREE.Mesh(Geometry_Ball, Material_Tex_1);
Material_Tex_1.map = wood_base;
Material_Tex_1.aoMap = wood_ao;
Material_Tex_1.aoMapIntensity = 1;
Material_Tex_1.displacementMap = wood_height;
Material_Tex_1.displacementScale = 0.5;
Material_Tex_1.roughnessMap = wood_rough;
Material_Tex_1.normalMap = wood_normal;
// Material_Tex_1.transparent = true

//!
const Geometry_Cube = new THREE.BoxGeometry(1, 1, 1);
const Material_Tex_2 = new THREE.MeshMatcapMaterial();

// const Mesh_2 = new THREE.Mesh(Geometry_Cube, Material_Tex_2);
Material_Tex_2.matcap = Texture_7;
//!
const Geometry_Cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 64);
const Material_Tex_3 = new THREE.MeshMatcapMaterial();

// const Mesh_3 = new THREE.Mesh(Geometry_Cylinder, Material_Tex_3);
Material_Tex_3.matcap = Texture_10;

// scene.add(
//     Mesh_1, Mesh_2, Mesh_3);

for (let object = 0; object < 70; object++) {
  const Mesh_1 = new THREE.Mesh(Geometry_Ball, Material_Tex_1);
  const Mesh_2 = new THREE.Mesh(Geometry_Cube, Material_Tex_2);
  const Mesh_3 = new THREE.Mesh(Geometry_Cylinder, Material_Tex_3);

  randomPositionScale(Mesh_1, Mesh_1, Mesh_1);
  randomPositionScale(Mesh_2, Mesh_2, Mesh_2);
  randomPositionScale(Mesh_3, Mesh_3, Mesh_3);

  gsapAnimation(Mesh_2);
   gsapAnimation(Mesh_1);
  Mesh_1.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(Mesh_1.geometry.attributes.uv.array, 2)
  );
  scene.add(Mesh_1);
}

//!-- GUI DEBUG
gui.add(Material_Tex_1, "roughness").min(0).max(1).step(0.01);
gui.add(Material_Tex_1, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(Material_Tex_1, "displacementScale").min(0).max(1).step(0.0001);

//! LIGHTS
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight("white", 0.5);
pointLight.position.x = 2;
pointLight.position.y = 2;
pointLight.position.z = 2;
scene.add(pointLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  105,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
