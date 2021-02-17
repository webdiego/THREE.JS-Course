import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time =Date.now()

//--ANIMATION USING DATE
// const tick = () => {
//   //time
//   const currentTime = Date.now()
//   const deltaTime =  currentTime - time
//   time = currentTime
// //   console.log(deltaTime);

//   //update object
//   mesh.rotation.x += 0.04 ;
//   mesh.rotation.y += 0.02 * deltaTime;

//   //render
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

//--ANIMATION USING THREE.CLOCK
// const clock = new THREE.Clock()

// const tick  = () => {
//     //with this function now we get the time that start from 0 and not milliseconds but seconds
//     const elapsedTime = clock.getElapsedTime() //! IS A SECOND
//     // console.log(elapsedTime);
//     //update object
//     mesh.rotation.x = 0.04 * elapsedTime ;
//     // mesh.rotation.y = Math.PI * 2 * elapsedTime ;//one total rotation in one second
//     //!CREATE MOVIMENT IN CIRCLE
//     // mesh.position.y = Math.sin(elapsedTime)
//     // mesh.position.x = Math.cos(elapsedTime)

//     //looks the same result of position but in this case is the camera that moving and the object is fixed
//     camera.position.y = Math.sin(elapsedTime)
//     camera.position.x = Math.cos(elapsedTime)
//     camera.lookAt(mesh.position) // the camera doing the circle look always to the object
//     //sin cos - as in the graphic , sin start from 1 and go up and down, cos start from 1 an
//     //render
//     renderer.render(scene, camera);
//     window.requestAnimationFrame(tick);
//   };
//   tick();

//--ANIMATION USING GSAP
//GSAP HAS OWN TICK
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()