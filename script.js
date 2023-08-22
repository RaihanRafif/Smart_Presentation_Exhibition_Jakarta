const myCanvas = document.querySelector("#myCanvas");

import {
	Color,
	LinearEncoding,
	MeshBasicMaterial,
	Mesh,
	PerspectiveCamera,
	sRGBEncoding,
	Sprite,
	HemisphereLight,
	SpriteMaterial,
	TextureLoader,
	BoxBufferGeometry,
	Scene,
	Vector3,
	WebGLRenderer,
	GridHelper,
	DirectionalLight,
	PointLight,
	LoadingManager
} from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import {
	CSS2DRenderer,
	CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";


// ----------------------------------- SCENE BACKGROUND COLOR -----------------------------------
export const scene = new Scene();
scene.background = new Color(0xdbe9e9);

// ------------------------------------------- CAMERA -------------------------------------------
export const camera = new PerspectiveCamera(
	60,
	myCanvas.offsetWidth / myCanvas.offsetHeight
);
camera.position.set(6, 4, -4);
camera.layers.enableAll();

// ----------------------------------------- GRID HELPER ----------------------------------------
const size = 20;
const divisions = 20;
const colorCenterLine = 0xffffff;
const colorGrid = 0xffffff;

const grid = new GridHelper(size, divisions, colorCenterLine, colorGrid);
grid.position.y = -1;
grid.name = "grid";
scene.add(grid);

// ------------------------------------------ LIGHTNING -----------------------------------------
/*
	Light in 3D scene
	set(x,y,z)
		+x front
		+y up
		+z left
*/

// ---------------------------------- LIGHTNING CUSTOM: AMBIENT ---------------------------------
const ambientLight = new HemisphereLight(
	"white", // bright sky color
	"grey", // dim ground color
	0 // intensity
);
ambientLight.name = "ambientLight";
scene.add(ambientLight);

// -------------------------------- LIGHTNING CUSTOM: DIRECTIONAL -------------------------------
var dirLight = new DirectionalLight(0x404040, 0);
dirLight.name = "dirLight";
dirLight.position.set(100, 100, -10);
dirLight.castShadow = true;
scene.add(dirLight);

// --------------------------- LIGHTNING DEFAULT: FRONT ABOVE CENTER ----------------------------
const r = 20;
const light1 = new PointLight(0xffffff, 1, 0);
light1.name = "light1";
light1.position.set(r, r, 0);
light1.shadowMapVisible = true;
scene.add(light1);

// ----------------------------- LIGHTNING DEFAULT: BACK ABOVE LEFT -----------------------------
const light2 = new PointLight(0xffffff, 1, 0);
light2.name = "light2";
light2.position.set(-0.5 * r, r, 0.866 * r);
scene.add(light2);

// ---------------------------- LIGHTNING DEFAULT: BACK ABOVE RIGHT -----------------------------
const light3 = new PointLight(0xffffff, 1, 0);
light3.name = "light3";
light3.position.set(-0.5 * r, r, -0.866 * r);
scene.add(light3);

// --------------------------- LIGHTNING DEFAULT: CENTER BELOW CENTER ---------------------------
const light4 = new PointLight(0xffffff, 1, 0);
light4.name = "light4";
light4.position.set(0, -r, 0);
scene.add(light4);

// --------------------------- LIGHTNING DEFAULT: CENTER BELOW CENTER ---------------------------
const renderer = new WebGLRenderer({ canvas: myCanvas });
renderer.setClearColor(0xff0000, 1.0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = sRGBEncoding;
renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

// --------------------------------------- ORBIT CONTROLS ---------------------------------------
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

export const orbitControls = new OrbitControls(
	camera,
	labelRenderer.domElement
);

// --------------------------------------- 3D FILE LOADER ---------------------------------------
const loadingScreenBar = document.getElementById("loadingBar");
const loadingScreenContainer = document.querySelector(
	".loadingScreenContainer"
);
const loadingManager = new LoadingManager();

loadingManager.onStart = function () {
	loadingScreenContainer.style.display = "flex";
};

loadingManager.onProgress = function (url, loaded, total) {
	loadingScreenBar.value = (loaded / total) * 100;
};

loadingManager.onLoad = function () {
	loadingScreenBar.value = 0;
	loadingScreenContainer.style.display = "none";
};

export const loader = new GLTFLoader(loadingManager);
loader.name = "loader";

let path = "files/" + "SR100C_v1.glb";

loader.load(
	path,
	(gltf) => {
		let file3D = gltf.scene;
		file3D.name = "file3D";

		const model = gltf.scene.children[0]
		scene.add(file3D);
		file3D.layers.enableAll();

		file3D.position.set(0, -0.95, 0);

		// createMarker(file3D, new Vector3(-0.3, 2.5, 0))
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

// Vector3(-0.3, 2.5, 0)


// function createMarker(model, position) {
// 	console.log("HHHH", model);
// 	const loader = new TextureLoader();
// 	loader.crossOrigin = "";
// 	const map = loader.load("https://i.imgur.com/EZynrrA.png");
// 	map.encoding = sRGBEncoding

// 	const spriteMaterialFront = new SpriteMaterial({ map });

// 	const spriteFront = new Sprite(spriteMaterialFront);
// 	spriteFront.position.copy(position)

// 	const spriteMaterialRear = new SpriteMaterial({
// 		map,
// 		opacity: 0.3,
// 		transparent: true,
// 		depthTest: false
// 	});

// 	const spriteRear = new Sprite(spriteMaterialRear);
// 	spriteRear.position.copy(position)

// 	model.add(spriteFront, spriteRear)
// }

// ----------------------------------------- RENDER LOOP ----------------------------------------
renderer.setAnimationLoop(() => {
	orbitControls.update();
	labelRenderer.render(scene, camera);
	renderer.render(scene, camera);
});

// ---------------------------------------- RESIZE CANVAS ---------------------------------------
myCanvas.style.width = window.innerWidth + "px";
myCanvas.style.height = window.innerHeight + "px";
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

window.addEventListener("resize", () => {
	myCanvas.style.width = window.innerWidth + "px";
	myCanvas.style.height = window.innerHeight + "px";
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});
