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
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

//!RAYCASTER
//?First Part
// const raycaster = new THREE.Raycaster()

// const rayOrigin = new THREE.Vector3(-3,0,0) //(x,y,z)
// const rayDirection = new THREE.Vector3(10,0,0)
// rayDirection.normalize() // set the value to one
// raycaster.set(rayOrigin,rayDirection)

// const intersect = raycaster.intersectObject(object2)
// const intersects = raycaster.intersectObjects([object1,object2,object3])
// console.log(intersects);
//?Second Part
const raycaster = new THREE.Raycaster();
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
//--MOUSE
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1; //this calculation is to have the value of the mouse move that goes to -1 to 1
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
});

window.addEventListener('click', (e)=>{
    if(currentIntersect){
        console.log('click on sphere');
        //Checking which object has been clicked
       if(currentIntersect.object === object1){
           console.log('object1');
       }else if(currentIntersect.object === object2){
        console.log('object2');
       }else if(currentIntersect.object === object3){
        console.log('object3');
       }
    }else{
        console.log('you are out of the sphere');
    }
})
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
camera.position.z = 3;
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

let currentIntersect = null;
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update object

  //! Animate objects
  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

  //!===== CAST A RAY
  // const rayOrigin = new THREE.Vector3(-3,0,0)
  // const rayDirection = new THREE.Vector3(1,0,0)
  // rayDirection.normalize()
  // raycaster.set(rayOrigin,rayDirection)
  // const objectsToTest = [object1,object2,object3]
  // const intersects = raycaster.intersectObjects(objectsToTest)
  // // console.log(intersects); //we are testing the ray if hits our objects , if 0 , the ray not hitting any object 3 all of them
  // //so if the objects hit the ray becomes blue
  // for(const object of objectsToTest){
  //     object.material.color.set('red')
  // }
  // for(const intersect of intersects){
  //     intersect.object.material.color.set('blue')
  // }
  //--Second part
  //with this we set our ray with the mouse as a laser
  raycaster.setFromCamera(mouse, camera);
  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);
  for (const object of objectsToTest) {
    object.material.color.set("red");
  }
  for (const intersect of intersects) {
    intersect.object.material.color.set("blue");
  }

  //THIRD PART
  if (intersects.length) {
    console.log("something being hovered");
    if (currentIntersect === null) {
      console.log("mouse enter");
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }
    console.log("nothing being hovered");
    currentIntersect = null;
  }
  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
