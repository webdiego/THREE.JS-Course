import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//WAY TO LOAD FONTS FROM THREE
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//AXES HELPER
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const texture_1 = textureLoader.load('/textures/matcaps/7.png')
const texture_2 = textureLoader.load('/textures/matcaps/10.jpg')
const texture_3 = textureLoader.load('/textures/matcaps/11.jpg')
const texture_4 = textureLoader.load('/textures/matcaps/12.jpg')
const texture_5 = textureLoader.load('/textures/matcaps/13.jpg')


//-FONTS
const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/font/helvetiker_regular.typeface.json' ,
    (font)=>
    {
  const textGeometry = new THREE.TextGeometry(
      'Diego',
       {
          font:font,
          size:0.5,
          height:0.2,
          curveSegments:12,
          //bevel is rounding the text
          bevelEnabled:true,
          bevelThickness:0.03,
          bevelSize:0.02,
          bevelOffset:0,
          bevelSegments:5
      }
  )
  //CENTER THE TEXT , bevelSize and bevelThickenss compromise how the text is center
  //!LONG WAY
//   textGeometry.computeBoundingBox()
//   console.log( textGeometry.boundingBox)//min and max value of the box that is inside our text/object
//   textGeometry.translate(
//       - (textGeometry.boundingBox.max.x- 0.02) * 0.5,
//       - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
//       - (textGeometry.boundingBox.max.z - 0.03) * 0.5
//   )
//!EASY FAST WAY
 textGeometry.center()
  const textMaterial = new THREE.MeshMatcapMaterial({matcap:texture_1})
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)
  console.time('sphere')

const sphereGeometry = new THREE.SphereGeometry( .5, 32, 32 );
const sphereMaterial = new THREE.MeshMatcapMaterial({matcap:texture_2});
const cubeGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
const cubeMaterial = new THREE.MeshMatcapMaterial({matcap:texture_5})
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45) 
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: texture_4 }) 

 for(let i=0; i< 100; i++){
      //LIKE THIS TOOK TOO MUCH TIME
    //   const sphereGeometry = new THREE.SphereGeometry( .3, 32, 32 );
    //   const sphereMaterial = new THREE.MeshMatcapMaterial({matcap:texture_Sphere});
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
      const donut = new THREE.Mesh(donutGeometry,donutMaterial)
      function randomPositionScale (position, dimension,rotation) {
          
          position.position.x = (Math.random() - 0.5) * 10
          position.position.y = (Math.random() - 0.5) * 10
          position.position.z = (Math.random() - 0.5) * 10
          
          const scale = Math.random()
          dimension.scale.set(scale,scale,scale)

          rotation.rotation.x=Math.random() * Math.PI      
         rotation.rotation.y=Math.random() * Math.PI


      }
      randomPositionScale(donut,donut,donut)
      randomPositionScale(cube,cube,cube)
      randomPositionScale(sphere,sphere,sphere)

      scene.add(sphere ,cube ,donut)
  }
  console.timeEnd('sphere')
    }
)
/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()