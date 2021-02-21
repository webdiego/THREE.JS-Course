import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BackSide, Material } from "three";
import * as dat from "dat.gui";

//ADD GUI DEBUG
const gui = new dat.GUI();

/**
 * Textures
 */
//--TEXTURE lOADER
const textureLoader = new THREE.TextureLoader();
//--CUBE TEXTURE LOADER
const cubeTextureLoader = new THREE.CubeTextureLoader()
//--DOORS
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
//!MATCAP
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
const matcapTexture5 = textureLoader.load("/textures/matcaps/5.png");
const matcapTexture8 = textureLoader.load("/textures/matcaps/8.png");

const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

//--CUBES
const environmentMap = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])
//correlated to Mesh toon
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
const gradientTexture5Steps = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture5Steps.minFilter = THREE.NearestFilter;
gradientTexture5Steps.magFilter = THREE.NearestFilter;
//
const metal = textureLoader.load("/textures/metall.jpg");
const alien = textureLoader.load("/textures/alien.jpg");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//!                                    MATERIAL
//?  FIRST PART ---BASIC
// const material = new THREE.MeshBasicMaterial({
//   color: "#2a9d8f",
// //   map: matcapTexture,
// });
//other way to add the texture
//material.map = matcapTexture
//!MATERIAL COLOR
//we cannot use material.color = red
// we have to do material.color.set('yellow') with the color set in the material initialization
//or if we don't put anything inside the material, when we initialize  ,we have to write material.color = new THREE.Color()
//!MATERIAL WIREFRAME
// material.wireframe =true
//!MATERIAL OPACITY
// material.opacity = 0.5;
// material.transparent = true

//?        SECOND PART --- NORMAL
//Mesh normal is all about lighting , reflection and refraction etc
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true // CREATE PIECE OF THE GEOMETRY THAT IS CREATED BY TRIANGLES

//? THIRD PART -- MATCAP
// const material = new THREE.MeshMatcapMaterial()

// material.matcap = metal
// material.map = alien
// alien.minFilter= THREE.NearestFilter

// material.matcap = matcapTexture5

// const material2 = new THREE.MeshMatcapMaterial()
// material2.matcap = metal

// const material3 = new THREE.MeshMatcapMaterial()
// material3.matcap = matcapTexture3

//? FOURTH PART --- DEPTH (more we are close more becomes white and more we are far more black)
// const material = new THREE.MeshDepthMaterial()
// material.
//--SIDE PROPERTY
// material.side = THREE.BackSide
// material.side =THREE.DoubleSide // TRY TO AVOID BECAUSE USE TOO MUCH GPU

//? FIFTH PART-- LAMBERT (Material that is related to the lights)
// const material = new THREE.MeshLambertMaterial()
//? SIXTH PART -- PHONG ( Similar to lambert but without the white lights , less performance of lambert)
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('green')

//? SEVENTH PART -- TOON (cartoon)
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture5Steps

//? EIGHTH PART -- STANDARD
const material = new THREE.MeshStandardMaterial();
 material.metalness = 0.7;
 material.roughness = 0.2;
 //environment
 material.envMap = environmentMap
//--FIRST PART
//*aoMap use the ambient occlusion texture that use the shadow that are in the the img(ambient) and create more realistic img
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// //*Displacement move the vertices to create true relief
// material.displacementMap=doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap =doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// //WHEN WE USE METALMAP AN ROUGHTMAP WE SHOULD REMOVE MATERIAL.MAP
// //*NORMAL MAP IS THE DOOR PURPLE ADD MUCH DETAILS
// material.normalMap =doorNormalTexture
// material.normalScale.set(0.5,0.5)
// //*ALPHA MAP (BLACK AND WHITE IMG)
// material.transparent =true
// material.alphaMap = doorAlphaTexture
//-- SECOND PART


//ADD TWEAKS TO GUI
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);


//!         OBJECTS
//🟠
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
//🟩
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1 ,100, 100), material);
// console.log(plane.geometry.attributes.uv);
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

//⭕
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
    );
    torus.position.x = 1.5;
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
scene.add(sphere, plane, torus);

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
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 10;
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
  const elapsedTime = clock.getElapsedTime(); //every second
  //update object
  sphere.rotation.y = 10 * elapsedTime;
  plane.rotation.y = 1 * elapsedTime;
  torus.rotation.y = 1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
