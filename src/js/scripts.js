// Importing all modules from 'three' library
import * as THREE from 'three';
// Importing OrbitControls from 'three' library which allows camera to orbit around a target
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';


// Creating a WebGL renderer
const renderer = new THREE.WebGLRenderer();
// adding shadows
renderer.shadowMap.enabled = true;
// Setting the size of the renderer to the window size
renderer.setSize( window.innerWidth, window.innerHeight );
// Appending the renderer to the body of the document
document.body.appendChild( renderer.domElement );

// Creating a new scene
const scene = new THREE.Scene();
// Creating a perspective camera with a field of view of 75, aspect ratio based on window size, and near and far clipping plane
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


// Load the cube texture
// Load the cube texture
// const cubeTexture = loader.load(urls, function() {
//     // This function will be called when the load completes
//     console.log('Load complete');
//   }, undefined, function(error) {
//     // This function will be called if an error occurs
//     console.log('An error occurred while loading the images', error);
//   });


// Creating orbit controls for the camera
const orbit = new OrbitControls(camera, renderer.domElement);

// Creating an axes helper with size 5 and adding it to the scene
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Setting the camera position
camera.position.set(-10,30,30);
// Updating the orbit controls
orbit.update();

// Creating a box geometry
const geometry = new THREE.BoxGeometry();
// Creating a basic material for the box with color grgit seen
const boxMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// Creating a mesh with the box geometry and material
const box = new THREE.Mesh( geometry, boxMaterial );
// Adding the box to the scene
scene.add( box );
const planeGeometry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper( 30, 30 );
scene.add( gridHelper );

const sphereGeometry = new THREE.SphereGeometry(4,50,50);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF, wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10,0);
sphere.castShadow = true;


// Create a target object and position it in the scene
const targetGeometry = new THREE.SphereGeometry();
const targetMaterial = new THREE.MeshStandardMaterial({color: 0xFF0000});
const target = new THREE.Mesh(targetGeometry, targetMaterial);

target.position.set(0, 0, 0);
scene.add(target);


// adding an ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF,1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
scene.add(directionalLight);
directionalLight.position.set(-30,50,0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

// Adding fog
scene.fog = new THREE.Fog(0xFFFFFF, 1, 200);

// const spotLight = new THREE.SpotLight(0xFFFFFF, 1.5);
// scene.add(spotLight);
// spotLight.position.set(-100,100,0);
// spotLight.castShadow = true;

// // Set the spotlight target to the target object
// spotLight.target = target;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01

}
gui.add(options, 'wireframe').onChange(() => {
    sphereMaterial.wireframe = options.wireframe;
});

gui.addColor(options, 'sphereColor').onChange(() => {
    sphereMaterial.color.set(options.sphereColor);
});

gui.add(options,'speed',0,0.1);

// Load the cube texture
// Load the cube texture
// Load the cube texture
// const cubeTexture = loader.load(urls, function() {
//     // This function will be called when the load completes
//     console.log('Load complete');
//     // Set the scene's background to the cube texture
//     scene.background = cubeTexture;
//   }, undefined, function(error) {
//     // This function will be called if an error occurs
//     console.log('An error occurred while loading the images', error);
//   });
// // Rendering the scene with the camera
renderer.render( scene, camera );

// // Load the cube texture
// const cubeTexture = loader.load(urls, function() {
//     // This function will be called when the load completes
//     console.log('Load complete');
//     // Set the scene's background to the cube texture
//     scene.background = cubeTexture;
//     // Start the animation loop
//     renderer.setAnimationLoop( animate );
//   }, undefined, function(error) {
//     // This function will be called if an error occurs
//     console.log('An error occurred while loading the images', error);
//   });

let step = 0;

// Function to animate the box
function animate(time) {
    // Rotating the box in x and y direction based on time
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    // Rendering the scene with the camera
    step += options.speed;
    sphere.position.y = 10* Math.abs(Math.sin(step));
    renderer.render( scene, camera );
}

// Setting the animation loop to the animate function
renderer.setAnimationLoop( animate );