import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Mesh, Material } from "three";
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
const Texture_12= textureLoader.load("/textures/matcaps/12.jpg");


Texture_3.magFilter= THREE.NearestFilter
/**
 * Object
 */

// const Material_Tex_1 = new THREE.MeshStandardMaterial({map:Texture_7});
// const Geometry_Ball =new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64),Material_Tex_1);

const Geometry_Ball = new THREE.SphereGeometry(0.5, 64, 64);
const Material_Tex_1 = new THREE.MeshToonMaterial();
const Mesh_1 = new THREE.Mesh(Geometry_Ball, Material_Tex_1);

//!
const Geometry_Cube = new THREE.BoxGeometry(1, 1, 1);
const Material_Tex_2 = new THREE.MeshMatcapMaterial();
const Mesh_2 = new THREE.Mesh(Geometry_Cube, Material_Tex_2);
Material_Tex_2.matcap = Texture_11;
//!
const Geometry_Cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 64);
const Material_Tex_3 = new THREE.MeshMatcapMaterial();
const Mesh_3 = new THREE.Mesh(Geometry_Cylinder, Material_Tex_3);
Material_Tex_3.matcap = Texture_8;

scene.add(
    Mesh_1, Mesh_2, Mesh_3);

Mesh_2.position.x = -2;
Mesh_3.position.x = 2;




//! LIGHTS
const ambientLight = new THREE.AmbientLight("purple", 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight("blue", 0.5);
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
  Mesh_1.rotation.y = 1.5 * elapsedTime;
  Mesh_1.rotation.x = 1.5 * elapsedTime;
  Mesh_2.rotation.y = 2 * elapsedTime;
  Mesh_2.rotation.x = 2 * elapsedTime;
  Mesh_3.rotation.y = 1 * elapsedTime;
  Mesh_3.rotation.x = 1 * elapsedTime;
  


  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
