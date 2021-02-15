import "./style.css";
import * as THREE from "three";

//-- CANVAS
const canvas = document.querySelector("canvas.webgl");

//-- SCENE
const scene = new THREE.Scene();

//-- OBJECT

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0.7; //right
mesh.position.y = -0.6; //down
mesh.position.z = 1; //forward
//1 can be everything 1m,1km we have to decide it, depends of what we want create
//we can change the position of the mesh almost everywhere, just not after we rendering

//          MESH.POSITION.SET
//we can set all these 3 position once with set()
//! mesh.position.set(0.7, -0.6, 1)
scene.add(mesh);

//         MESH.NORMALIZE
//! mesh.position.normalize();
//this method takes the distance from the object and reduce it to 1 so is taking an object and bring in front of you
//before the length was 1.3601470508735443 NOW IS ONE
console.log(mesh.position.length());
//the distance of the center to the position of the object

//--SCALE
mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;
//also here we can set() all once


//-- ROTATION\//
//Math.PI we use to do half rotation , full 2 * Math.PI
mesh.rotation.y =Math.PI


//-- AXES HELPER
const axesHelper = new THREE.AxesHelper(2); //Setting a number in the methods we add the length of the axes
scene.add(axesHelper);
//-- SIZES

const sizes = {
  width: 1000,
  height: 800,
};

//--CAMERA

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 6;
scene.add(camera);
//Distance btw camera and object
// console.log(mesh.position.distanceTo(camera.position));
//-- RENDERER

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
