import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { HemisphereLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

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
 * Lights //LIGHTS USE LOTS OF GPU, ADD FEW AS POSSIBLE
 */
//--AMBIENT LIGHT COMES FROM EVERYWHERE (MINIMAL COST)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
//**DIRECTION LIGHT COMES FROM A SIDE (PARALLELE) LIKE THE SUN ON EARTH, MORE IN EQUATOR LESS ON POLE

//--DIRECTIONAL (MODERATE COST)
const directionalLight = new THREE.DirectionalLight("blue", 0.5);
//*when we move the position of this light ,the direction of the lights goes in to the center
//*at thi point the light if is close or not doesn't affect the result
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

//--HEMISPHERE  (MINIMAL COST)
const hemisphereLight = new THREE.HemisphereLight("red", "blue", 1);
//* we get 2 color one (red) from the top and the second (blue) from the bottom
scene.add(hemisphereLight);
//--POINT LIGHT (MODERATE COST)
//*is infinite small,that illuminate every direction(from that point)
//* we can add distance and decay how fast the light decay, means that the light loose the intensy
const pointLight = new THREE.PointLight("white", 0.4, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
//--RECT AREA (HIGH COST)
//*color,intensity,widht,height
//*is a plane area lights,(like in photo shots)
//! it works only with meshStandard and meshPhysical
const rectAreaLight = new THREE.RectAreaLight("green", 1, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
//for move the lights in the center, we use lookAt, with a new 3V3 empty that means position property to 0
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

//--SPOT LIGHT (HIGH COST)
//Is light a torch
//color/intensity,distance,angle(wide/angle of light),penumbra/blur , decay
const spotLight = new THREE.SpotLight("blue", 1, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
//rotate the spot light, we need to add a target where the spot light look at
scene.add(spotLight);
spotLight.target.position.x = -1.75;
scene.add(spotLight.target);

//!BAKING
//baking the light inside the texture using blender example, the problem we cannot move the light

//--HELPERS
//second value is the size of the helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.2
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
  spotLightHelper.update();
});

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

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
  75,
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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
