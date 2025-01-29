import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Create scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//texture loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/static/textures/door/color.jpg'); 


// Add controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Create a cube
const geometry = new THREE.SphereGeometry(1, 32, 32);  // Add segments for better UV mapping
const material = new THREE.MeshBasicMaterial({ 
    map: texture  // Apply the texture to the material
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

   

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();