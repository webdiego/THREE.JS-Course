import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// console.log(OrbitControls);
//--CURSOR
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  // console.log(e.clientX,e.clientY);
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: "#3477eb" })
);
scene.add(mesh);

// Camera
//STEREO CAMERA = mimic the our eyes , two camera that see the object
//CUBE CAMERA = render 6 camera one for each different direction
//ORTHOGRAPHIC CAMERA = render the scene without perspective
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  2, //how close
  1000 //how far
);
//Arguments of perspectiveCamera:
//FIELD OF VIEW : 75 is the degree in vertical not horizontal, also called fov
//ASPECT RATIO
//NEAR AND FAR : how close and how fare the camera can see

//--    ORTHOGRAPHIC CAMERA
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
console.log(camera.position.length(mesh));
// camera.lookAt(mesh.position);
scene.add(camera);

//--Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
//--CONTROLS
const controls = new OrbitControls(camera, canvas);
// controls.target.y =2
// controls.update()
controls.enableDamping = true;

//--Animate
// const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update objects
  // mesh.rotation.y = elapsedTime;
  // mesh.position.y = cursor.y * 10; IS ATTACH TO THE MOUSE USING MESH.POSITION

  //Camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 3;

  // camera.lookAt(mesh.position);

  //UPDATE CONTROLS OF DAMPING
  controls.update()
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
