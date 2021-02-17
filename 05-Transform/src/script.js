import "./style.css";
import * as THREE from "three";

//-- CANVAS
const canvas = document.querySelector("canvas.webgl");

//-- SCENE
 const scene = new THREE.Scene();

//-- OBJECT

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0.7; //right
// mesh.position.y = -0.6; //down
// mesh.position.z = 1; //forward
// //1 can be everything 1m,1km we have to decide it, depends of what we want create
// //we can change the position of the mesh almost everywhere, just not after we rendering

// //?          MESH.POSITION.SET
// //we can set all these 3 position once with set()
// //! mesh.position.set(0.7, -0.6, 1)
// scene.add(mesh);

// //?         MESH.NORMALIZE
// //! mesh.position.normalize();
// //this method takes the distance from the object and reduce it to 1 so is taking an object and bring in front of you
// //before the length was 1.3601470508735443 NOW IS ONE
// console.log(mesh.position.length());
// //the distance of the center to the position of the object

// //--SCALE
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// //also here we can set() all once


// //-- ROTATION\//
// //Math.PI we use to do half rotation , full 2 * Math.PI
// mesh.rotation.reorder('YXZ') // BEFORE CHANGING THE ROTATION
// mesh.rotation.x =Math.PI * 2.2
// mesh.rotation.y =Math.PI * 2.2
// mesh.rotation.z =Math.PI * 2.2
// //be careful because if we rotate to much is going to change also the axis so is changing the prospective
// //GIMBAL LOCK when an axis get locked and you can not make any rotation, for this we have to use reorder()

//----------SECOND PART 
const group =new THREE.Group()
scene.add(group)

const cube1 =new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
const cube2 =new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
)
const cube3 =new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({ color: 0xff0030 })
)
//so we add the cube in to the group that is added to the scene
cube2.position.x=2
cube3.position.x=4
group.scale.x =2
group.scale.y =2
group.rotation.y=2.2

group.add(cube1,cube2,cube3)

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

// camera.lookAt(new THREE.Vector3(-3,0,-4))
// camera.lookAt(mesh.position)
//-- RENDERER

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
