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
const particles_1 = textureLoader.load("/textures/particles/16.png");
const particles_2 = textureLoader.load("/textures/particles/15.png");
const planetMatcap_1 = textureLoader.load("/matcap/green.jpg")
const planetMatcap_2 = textureLoader.load("/matcap/red-sun.jpg")


const enterDimensionGeometry = new THREE.BufferGeometry()
const vertices = new Float32Array( 3 );
enterDimensionGeometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) )
const enterDimensionMaterial = new THREE.PointsMaterial({
  size:1,
  sizeAttenuation:true,
   transparent:true,
  blending: THREE.AdditiveBlending,
  alphaMap:particles_2,
  depthWrite:false
})
const enterDimension = new THREE.Points(enterDimensionGeometry,enterDimensionMaterial)
enterDimension.position.z=.8
//! -----------------  Particles
//--Geometry


  const particlesGeometry = new THREE.BufferGeometry();
  const count = 2000;
  
  const position = new Float32Array(count * 3); // so each position is made by 3 attribute, (y,x,z)
  // const colors = new Float32Array(count * 3); //colors ,same, rgb (r,g,b)
  for (let i = 0; i < count * 3; i++) {
    position[i] = (Math.random() - 0.5) * 10; //we do this because if is math.random (the position will be from 0 to 1) with minus 0.5 we extend the possibility to position our particles
    // colors[i] = Math.random();
  }
  //add the random values to the geometry
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3)
  );
  // particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  //--Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.07,
    sizeAttenuation: true, //create a prospective
  });
  particlesMaterial.transparent = true;
  particlesMaterial.depthWrite = false; 
  particlesMaterial.blending = THREE.AdditiveBlending;
  particlesMaterial.alphaMap = particles_1;
  //--Color
  particlesMaterial.color = new THREE.Color('white')
  
  //Points
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
   scene.add(particles)

//! ==========  PLANET 1
const planetGeometry= new THREE.SphereGeometry(0.2, 32, 32);
const planetMaterial= new THREE.MeshMatcapMaterial({matcap: planetMatcap_1})
const planet = new THREE.Mesh(planetGeometry,planetMaterial)
planet.position.x=-4
planet.position.y=-4
planet.position.z=4

//!  ========  PLANET 2
const planetGeometry_2= new THREE.SphereGeometry(1, 32, 32);

 const planetMaterial_2= new THREE.MeshMatcapMaterial({matcap: planetMatcap_2})
 const planet_2 = new THREE.Mesh(planetGeometry_2,planetMaterial_2)
 planet_2.position.x=3
 planet_2.position.y =2
 planet_2.position.z =.9

scene.add(enterDimension  , planet_2 );


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
  75,//175 CREATE A HYPERSPEED
  sizes.width / sizes.height,
  0.1,
  20000
);
camera.position.z = 8;
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
  //  particles.rotation.y = elapsedTime * 0.2
    camera.position.z= 20 - elapsedTime 
    if(camera.position.z <=0){
      camera.position.z = 20
      camera.position.z = 20 - elapsedTime 
      renderer.setClearColor ("white", 1);
      scene.add(planet)
    }
     console.log(camera.position.z);
    // Render
    renderer.render(scene, camera);
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };
  

tick();
