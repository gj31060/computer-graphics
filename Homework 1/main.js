import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'; 

const gui = new GUI();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(20, 20, 25);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);

const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x4caf50 });
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x7777777 });
const whiteBuilding = new THREE.MeshPhongMaterial({ color: 0xffffff });
const blueBuilding = new THREE.MeshPhongMaterial({ color: 0x1e88e5 });

const ground = new THREE.Mesh(new THREE.PlaneGeometry(65, 65), grassMaterial);
ground.position.x = -5;
ground.rotation.x = -Math.PI * 0.5;
ground.receiveShadow = true;
scene.add(ground);

// Roads
const roadVertical = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 55), roadMaterial);
roadVertical.position.y = 0.05;
roadVertical.position.x = 15;
roadVertical.position.z = -5;
scene.add(roadVertical);

const roadHorizontal = new THREE.Mesh(new THREE.BoxGeometry(55, 0.1, 6), roadMaterial);
roadHorizontal.position.y = 0.05;
roadHorizontal.position.z = 18;
roadHorizontal.position.x = -11;
roadHorizontal.rotation.y = 25;
scene.add(roadHorizontal);

const road1 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 6), roadMaterial);
road1.position.y = 0.05;
road1.position.x = 20;
road1.position.z = 5;
scene.add(road1);

const road2 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 6), roadMaterial);
road2.position.y = 0.05;
road2.position.x = 20;
road2.position.z = -15;
scene.add(road2);

const road3 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 25), roadMaterial);
road3.position.y = 0.05;
road3.position.x = 2;
road3.position.z = -5;
scene.add(road3);

const road4 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 6), roadMaterial);
road4.position.y = 0.05;
road4.position.x = -10;
road4.position.z = -2;
scene.add(road4);

const road5 = new THREE.Mesh(new THREE.BoxGeometry(6, 0.1, 20), roadMaterial);
road5.position.y = 0.05;    
road5.position.x = 20;
road5.position.z = 25;
road5.rotation.y = 29;
scene.add(road5);

// Buildings 
const buildings = [];

const b1 = new THREE.Mesh(new THREE.BoxGeometry(22, 5, 4), whiteBuilding);
b1.position.set(-25, 2.5, 23);
b1.rotation.y = 25;
b1.castShadow = true;
scene.add(b1);
buildings.push(b1);

const b2 = new THREE.Mesh(new THREE.BoxGeometry(22, 5, 4), whiteBuilding);
b2.position.set(-2, 2.5, 26);
b2.rotation.y = 25;
b2.castShadow = true;
scene.add(b2);
buildings.push(b2);

const b3 = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 30), blueBuilding);
b3.position.set(22, 2.5, -5);
b3.castShadow = true;
scene.add(b3);
buildings.push(b3);

const b4 = new THREE.Mesh(new THREE.BoxGeometry(14, 5, 30), blueBuilding);
b4.position.set(-17, 2.5, -12);
b4.castShadow = true;
scene.add(b4);
buildings.push(b4);

// Lighting 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.01).name('Ambient Intensity');

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.01).name('Sun Intensity');

const pointLight = new THREE.PointLight(0xfff4e5, 1, 50);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);
gui.add(pointLight, 'intensity').min(0).max(3).step(0.01).name('PointLight');

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

// Animate 
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};
animate();
