import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
const textureLoader = new THREE.TextureLoader();
const particles_1 = textureLoader.load("/textures/particles/14.png");

//! -----------------  Particles
//--Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const position = new Float32Array(count * 3); // so each position is made by 3 attribute, (y,x,z)
const colors = new Float32Array(count * 3); //colors ,same, rgb (r,g,b)
for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10; //we do this because if is math.random (the position will be from 0 to 1) with minus 0.5 we extend the possibility to position our particles
  colors[i] = Math.random();
}
//add the random values to the geometry
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
//--Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  sizeAttenuation: true, //create a prospective
});
particlesMaterial.transparent = true;
//? HOW TO FIX THE PARTICLES ?
// particlesMaterial.alphaTest= 0.001; //1 we say to the gpu to not show the black part of the img
// particlesMaterial.depthTest = false //2
// we say that is not important that the gpu calculate if the object is in front of another but if we add another object it will be without depth
//!we can crete a portal that bring us in another dimension, like a mirror
particlesMaterial.depthWrite = false; //3 in this case if we add a geometry we say to to not draw inside this object
//4 BLENDING another solution but not too much relate to the other 3
particlesMaterial.blending = THREE.AdditiveBlending;
//with blending we not also draw the pixel like before one of each other , but also the color , this can mean more bright color
particlesMaterial.alphaMap = particles_1;
//--Color
// particlesMaterial.color = new THREE.Color('#52b788')
//add the random colors
particlesMaterial.vertexColors = true;
//Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
// console.log(particlesGeometry.attributes);
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
  //!UPDATE PARTICLES(ALL)

  // particles.rotation.z= .2 * elapsedTime

  // setTimeout(() => {
  //   particles.position.z = 1 * elapsedTime

  // }, 5000);

  //2
  // particles.rotation.y = elapsedTime * 0.2
  //! UPDATE PARTICLES(WAVES)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3; //this because we need 3 value of each vertex(x,y,z)
    const x = particlesGeometry.attributes.position.array[i3 + 0]
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
    //we get access to a specific value in the array adding 0 to get x, +1 y ,+2 x
  }
  particlesGeometry.attributes.position.needsUpdate = true; // for get the animation we need to update
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
