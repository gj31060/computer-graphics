import * as THREE from 'three';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('textures/box_profile_metal_sheet_diff_2k.jpg')

texture.warpS = THREE.RepeatWrapping
texture.wrapT= THREE.RepeatWrapping
texture.repeat.set(1,4)

const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.3,
    roughness: 0.2
})
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(1,32,32),
    material
)
scene.add(ball)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(1,1,1)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

function animate(){
    requestAnimationFrame(animate)
    ball.rotation.x += 0.01
    renderer.render(scene,camera)
}

animate()