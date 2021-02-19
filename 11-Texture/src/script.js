import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import imageSource from "./color.jpg";
// console.log(imageSource);
/**
 * Base
 */

//--TEXTURE
//! how to load a image before
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.addEventListener('load', () =>
// {
//     texture.needsUpdate = true
// })
// image.src = '/textures/door/color.jpg'

const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () =>
// {
//     console.log('loading started')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('loading finished')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('loading progressing')
// }
// loadingManager.onError = () =>
// {
//     console.log('loading error')
// }
//!One textureLoader can load multiple texture
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')

const checkBoardMini = textureLoader.load('/textures/checkerboard-1024x1024.png')
const checkBoardMagni = textureLoader.load('/textures/checkerboard-8x8.png')
const minecraft =  textureLoader.load('/textures/minecraft.png')
const pixelArt =  textureLoader.load('/textures/pixelart.png')
const metal= textureLoader.load('/textures/metal.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


//we can repeat the texture by using the repeat property, it's a VECTOR2 (2D) with X and Y properties
//IF WE APPLY X=1 Y=2 WE SEE ON EACH FACE OF THE GEOMETRY, THE IMAGE TAKING HALF OF THE FACE (1/2)
// colorTexture.repeat.x =2
// colorTexture.repeat.y=3

// // colorTexture.wrapS = THREE.RepeatWrapping
// // colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// //offset , is like bringing the image in the angle (DEVIATION OF THE IMAGE)
// colorTexture.offset.x =0.5
// colorTexture.offset.y =0.5

// //ROTATION
// //! Math.PI = Half rotation
// //! Math.PI * 2  = Full rotation
// //! Math.PI / 4 or Math.PI * O.25 = 1/4 Rotation


// colorTexture.rotation = Math.PI 
// //the rotation by default is doing from the angle of the cube
// //for center the rotation
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5


//MIPMAPPING
//Mipmapping (or "mip mapping" with a space) is a technique that consists of creating half a smaller version of a texture again and again until you get a 1x1 texture. 
//!minification. when the picture is big, bigger than the object/geometry 
// checkBoardMini.minFilter = THREE.NearestFilter
//if we are using THREE.NearestFilter on minFilter we don't need mipmap so 
//checkBoardMini.generateMipmaps = false
//!Magnification  the pixel of the texture are bigger than the pixel ( the texture is too small fo the surface it covers)
//  checkBoardMagni.magFilter = THREE.NearestFilter
// checkBoardMagni.magFilter = THREE.LinearFilter
minecraft.magFilter = THREE.NearestFilter
pixelArt.magFilter = THREE.NearestFilter


metal.magFilter = THREE.NearestFilter
//SIZE
// The texture width and height must be a power of 2. That is mandatory so that Three.js can divide the size of the texture by 2.
//Some examples: 512x512, 1024x1024 or 512x2048 can be divided by 2 until it reaches 1
//DATA








// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const geometry = new THREE.SphereBufferGeometry(1, 32, 32);
//! console.log(geometry.attributes.uv); 
// for see the coordinates of the plain image and how the plane image is apply on the geometry
const material = new THREE.MeshBasicMaterial({ map: metal });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.z = 1;
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
