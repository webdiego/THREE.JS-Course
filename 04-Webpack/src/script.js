import './style.css'
import * as THREE from 'three'

console.log(THREE.PerspectiveCamera);

const canvas = document.querySelector('.webgl')
//Scene
const scene = new THREE.Scene()
//--GEOMETRY PARAMETERS
//-- {width: 1, height: 1, depth: 1, widthSegments: undefined, heightSegments: undefined, depthSegments: undefined}
//Cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//Material
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//Mesh
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const sizes = {
  width : 800,
  height :600
}
//Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height)
camera.position.z= 3
camera.position.x = 1

scene.add(camera)

//Render
const renderer = new THREE.WebGLRenderer({
  canvas : canvas
})

renderer.setSize(sizes.width , sizes.height)

renderer.render(scene, camera)