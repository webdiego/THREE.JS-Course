import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { Mesh, Scene } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//--FOG
//color , near ( where start ) , far (where is fully opaque)
const fog = new THREE.Fog("#262837", 2, 15);
scene.fog = fog;
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//DOOR TEXTURE
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
//BRICKS TEXTURE
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
//GRASS
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
grassColorTexture.repeat.set(10, 10);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;

const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
grassAmbientOcclusionTexture.repeat.set(10, 10);
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
grassNormalTexture.repeat.set(10, 10);
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
grassRoughnessTexture.repeat.set(10, 10);
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

//GLASS
const glassColorTexture = textureLoader.load(
  "/textures/glass/Glass-basecolor.jpg"
);
const glassAmbientOcclusionTexture = textureLoader.load(
  "/textures/glass/Glass-ambientOcclusion.jpg"
);
const glassHeightTexture = textureLoader.load(
  "/textures/glass/Glass-height.jpg"
);
const glassNormalTexture = textureLoader.load(
  "/textures/glass/Glass-normal.jpg"
);
const glassMetalnessTexture = textureLoader.load(
  "/textures/glass/Glass-metallic.jpg"
);
const glassRoughnessTexture = textureLoader.load(
  "/textures/glass/Glass-roughness.jpg"
);

//WOOD-ROOF
const woodColorTexture = textureLoader.load(
    "/textures/wood/wood-baseColor.jpg"
  );
  woodColorTexture.repeat.set(8,8);
woodColorTexture.wrapS = THREE.RepeatWrapping;
woodColorTexture.wrapT = THREE.RepeatWrapping;

  const woodAmbientOcclusionTexture = textureLoader.load(
    "/textures/wood/Glass-ambientOcclusion.jpg"
  );
  woodAmbientOcclusionTexture.repeat.set(8,8);;
woodAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
woodAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
  const woodHeightTexture = textureLoader.load(
    "/textures/wood/wood-height.jpg"
  );
  woodHeightTexture.repeat.set(8,8);
woodHeightTexture.wrapS = THREE.RepeatWrapping;
woodHeightTexture.wrapT = THREE.RepeatWrapping;
  const woodNormalTexture = textureLoader.load(
    "/textures/wood/wood-normal.jpg"
  );
 
  woodNormalTexture.repeat.set(8,8);
  woodNormalTexture.wrapS = THREE.RepeatWrapping;
  woodNormalTexture.wrapT = THREE.RepeatWrapping;
  const woodRoughnessTexture = textureLoader.load(
    "/textures/wood/wood-roughness.jpg"
  );
  woodRoughnessTexture.repeat.set(8,8);
woodRoughnessTexture.wrapS = THREE.RepeatWrapping;
woodRoughnessTexture.wrapT = THREE.RepeatWrapping;



/**
 * House
 */
//GROUP
const house = new THREE.Group();
scene.add(house);

//WALLS
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;

house.add(walls);

//ROOF
const roof = new Mesh(
  new THREE.ConeGeometry(3.5, 1, 4 ,),
  new THREE.MeshStandardMaterial(
    {
        map: woodColorTexture,
        aoMap: woodAmbientOcclusionTexture,
        displacementMap: woodHeightTexture,
        displacementScale: 0.1,
        normalMap: woodNormalTexture,
        roughnessMap: woodRoughnessTexture,
      }


  )
);
roof.geometry.setAttribute(
    "uv2",
    new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
  );
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);
//DOOR
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

//BUSH
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

//GRAVES
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 40; i++) {
  const angle = Math.random() * Math.PI * 2;
  //we say that the grave can be from 3 to 9( 3 + 6 * 0 to 1 )
  const radius = 3.5 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.4, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.2;

  graves.add(grave);
  grave.castShadow = true;
}
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

//WINDOW
const windowGeometry = new THREE.PlaneGeometry(1, 1);
const windowMaterial = new THREE.MeshStandardMaterial({
  map: glassColorTexture,
  aoMap: glassAmbientOcclusionTexture,
  displacementMap: glassHeightTexture,
  displacementScale: 0.1,
  normalMap: glassNormalTexture,
  metalnessMap: glassMetalnessTexture,
  roughnessMap: glassRoughnessTexture,
});

const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.x = -2.02;
window1.position.y = 1.5;
window1.rotation.y = -1.5;

house.add(window1, );

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//-FONTS
// const fontLoader = new THREE.FontLoader();

// fontLoader.load("/font/helvetiker_regular.typeface.json", (font) => {
//   const textGeometry = new THREE.TextGeometry("Party House", {
//     font: font,
//     size: 0.3,
//     height: 0.04,
//     curveSegments: 12,
//     //bevel is rounding the text
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 5,
//   });
//   const textMaterial = new THREE.MeshStandardMaterial({
//     map: textColorTexture,
//     aoMap: textAmbientOcclusionTexture,
//     displacementMap: textHeightTexture,
//     displacementScale: 0.3,
//     normalMap: textNormalTexture,
//     metalnessMap: textMetalnessTexture,
//     roughnessMap: textRoughnessTexture,
//   });
//   const text = new THREE.Mesh(textGeometry, textMaterial);
//   text.position.y= 3
//   text.position.z = 3;

//   house.add(text);
// });
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

//DoorLIGHT
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

//--GHOST
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost3);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
//we do this for make the background around like the color of the fog
renderer.setClearColor("#262837");

//--SHADOW
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.castShadow = true;
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.castShadow = true;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //ghost
  const ghostAngle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghostAngle) * 4;
  ghost1.position.z = Math.sin(ghostAngle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 1);

  const ghost2Angle = -elapsedTime * 0.2;
  ghost2.position.x = Math.cos(ghost2Angle) * 4;
  ghost2.position.z = Math.sin(ghost2Angle) * 7;
  ghost2.position.y = Math.sin(elapsedTime * 1.5) + Math.sin(elapsedTime * 3);

  const ghost3Angle = -elapsedTime * 0.8;
  ghost3.position.x = Math.cos(ghost3Angle) * 4;
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.3));
  ghost3.position.y = Math.sin(elapsedTime * 1.5);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
