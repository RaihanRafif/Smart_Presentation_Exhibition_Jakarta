import {
	Color,
	Vector3,
	GridHelper,
	BoxGeometry, MeshBasicMaterial, Mesh,
	FontLoader
} from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { scene, camera, orbitControls, loader } from "../script.js";
// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import {
	CSS2DRenderer,
	CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

// ---------------------------------------------------------------------------------------
// ----------------------------------- Const, Var, Let -----------------------------------

let index = 1;
let soundStatus = 0;

// ---------------------------------------------------------------------------------------

// ----------------------------------- Explode 3D File -----------------------------------

const explode_button = document.querySelector(".explode-button");
let product_list_text = "SR100C_v1";

const moved_mesh = [
	"Mirror61",
	"Mirror62",
	"Mirror63",
	"Mirror71",
	"Mirror72",
	"Mirror73",
	"Mirror74",
	"Mirror77",

	"ﾌｨﾚｯﾄ5",
	"ﾌｨﾚｯﾄ11",
	"ﾌｨﾚｯﾄ12",

	"ﾐﾗｰ2_(93)",
	"ﾐﾗｰ3",
	"ﾐﾗｰ51",
	"ﾐﾗｰ52",
	"ﾐﾗｰ141",
	"ﾐﾗｰ142",
	"ﾐﾗｰ143",
	"ﾐﾗｰ144",
	"ﾐﾗｰ145",
	"ﾐﾗｰ201",

	"直線ﾊﾟﾀｰﾝ21",
	"直線ﾊﾟﾀｰﾝ22",
	"直線ﾊﾟﾀｰﾝ23",
	"直線ﾊﾟﾀｰﾝ23_1",
	"直線ﾊﾟﾀｰﾝ31",
	"直線ﾊﾟﾀｰﾝ32",
	"直線ﾊﾟﾀｰﾝ33",
	"直線ﾊﾟﾀｰﾝ51",
	"直線ﾊﾟﾀｰﾝ52",
	"直線ﾊﾟﾀｰﾝ54",
	"直線ﾊﾟﾀｰﾝ241",
	"直線ﾊﾟﾀｰﾝ244",

	"円形ﾊﾟﾀｰﾝ2",
	"円形ﾊﾟﾀｰﾝ2_(49)",
	"円形ﾊﾟﾀｰﾝ3",
	"円形ﾊﾟﾀｰﾝ10",
	"円形ﾊﾟﾀｰﾝ14_(48)",
	"円形ﾊﾟﾀｰﾝ15_(48)",
	"円形ﾊﾟﾀｰﾝ33",
	"円形ﾊﾟﾀｰﾝ52",
	"円形ﾊﾟﾀｰﾝ53",
	"円形ﾊﾟﾀｰﾝ55",
	"円形ﾊﾟﾀｰﾝ56",
	"円形ﾊﾟﾀｰﾝ61",
	"円形ﾊﾟﾀｰﾝ62",
	"円形ﾊﾟﾀｰﾝ81",
	"円形ﾊﾟﾀｰﾝ82",
	"円形ﾊﾟﾀｰﾝ83",
	"円形ﾊﾟﾀｰﾝ102",
	"円形ﾊﾟﾀｰﾝ103",
	"円形ﾊﾟﾀｰﾝ111",
	"円形ﾊﾟﾀｰﾝ112",
	"円形ﾊﾟﾀｰﾝ118",
	"円形ﾊﾟﾀｰﾝ119",

	"押し出し1",
	"押し出し4",
	"押し出し6",
	"押し出し7",
	"押し出し8",
	"押し出し11",

	"回転1_(220)",
	"回転1_(221)",
	"回転21",

	"M6x10_ねじ穴1",

	"M8_丸平ねじ用座ぐり穴1",

	"ﾎﾞｽ_-_押し出し1_(1)",
	"ﾎﾞｽ_-_押し出し1_(2)",
	"ﾎﾞｽ_-_押し出し1_(3)",
	"ﾎﾞｽ_-_押し出し2",
	"ﾎﾞｽ_-_押し出し4",

	"組み合わせ1",
	"組み合わせ1_(2)",
];

// ----------------------------------- dark/light mode -----------------------------------
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

// -------------------------------------- lightning --------------------------------------
const menuLightning = document.querySelector(".menu-container-blue-lightning");
const lightning_expand = document.querySelector(
	".menu-container-blue-lightning-expand"
);
const lightning_title = document.querySelector(".lightning-title-2");
const opsi = lightning_title.querySelectorAll(".opsi");

const custom_lightning = document.querySelector(".custom-lightning");

const ambientLight = scene.getObjectByName("ambientLight");
const dirLight = scene.getObjectByName("dirLight");
const light1 = scene.getObjectByName("light1");
const light2 = scene.getObjectByName("light2");
const light3 = scene.getObjectByName("light3");
const light4 = scene.getObjectByName("light4");

// -------------------------------- slider env brightness --------------------------------
const slider_env = document.getElementById("slider-env");
const maxValue_env = slider_env.getAttribute("max");
let value_env;
const sliderFill_env = document.getElementById("fill-env");

// --------------------------------- slider lamp position --------------------------------
const slider_lamp_pos = document.getElementById("slider-lamp-pos");
const maxValue_lamp_pos = slider_lamp_pos.getAttribute("max");
let value_lamp_pos;
const sliderFill_lamp_pos = document.getElementById("fill-lamp-pos");

// ------------------------------- slider lamp brightness --------------------------------
const slider_lamp = document.getElementById("slider-lamp");
const maxValue_lamp = slider_lamp.getAttribute("max");
let value_lamp;
const sliderFill_lamp = document.getElementById("fill-lamp");

// -------------------------------------- catalogue --------------------------------------
const menuAlbum = document.querySelector(".menu-container-blue-album");
const catalogueContainer = document.getElementById("catalogue-container-2");
const catalogue_product_list = document.querySelectorAll(
	".catalogue-product-list-2"
);

// ------------------------------------- slider zoom -------------------------------------
const slider = document.getElementById("slider-zoom");
const maxValue = slider.getAttribute("max");
let value;
const sliderFill = document.getElementById("fill-zoom");

// ---------------------------------------- sound ----------------------------------------
const menuSound = document.querySelector(".menu-container-blue-sound");
const iconSoundOff = document.getElementById("sound-off");
const iconSoundOn = document.getElementById("sound-on");

const soundExpand = document.querySelector(".sound-expand");

var audio = new Audio("./audio/podcast-18169.mp3");
var audio_speech = new Audio("./audio/audio_speech1.wav");
var audio_speech_2 = new Audio("./audio/JKT48 - Hissatsu Teleport (Jurus Rahasia Teleport) ｜ Color Coded Lyrics (INA⧸ENG).wav");

var sound = audio_speech;

function audioPlayer() {
	if (index == 1) {
		sound = audio_speech;
	} else if (index == 2) {
		sound = audio_speech_2;
	}

	sound.addEventListener("ended", function () {
		// Kode yang akan dijalankan saat audio selesai diputar
		if (soundStatus == 1) {
			setTimeout(() => {
				audioPlayer(); // Panggil audioPlayer() lagi setelah 30 detik
			}, 30000);
		}
		// Anda dapat menambahkan logika tambahan atau memulai ulang audio di sini jika diperlukan
	});

	sound.play();
}

const toggle_music = document.querySelector(".toggle-music");
const toggle_speech = document.querySelector(".toggle-speech");

// -------------------------------------- animation --------------------------------------
const menuAnimation = document.querySelector(".menu-container-blue-animation");
const iconAnimationOff = document.getElementById("animation-off");
const iconAnimationOn = document.getElementById("animation-on");

// ------------------------------------- information -------------------------------------
const menuInformation = document.querySelector(
	".menu-container-blue-information"
);
const informationContainer = document.getElementById("information-container");

// ------------------------------------- video button ------------------------------------
const video_button = document.querySelector(".menu-video");
const video_pop_up = document.querySelector(".container-full-screen-video");
const video = document.getElementById("video");

// ---------------------------------------------------------------------------------------
// ------------------------------------- PROGRAM CODE ------------------------------------
// ---------------------------------------------------------------------------------------

// ----------------------------------- Explode 3D File -----------------------------------
explode_button.addEventListener("click", () => {
	explode_button.classList.toggle("active");

	let file3D = scene.getObjectByName("file3D");

	if (product_list_text == "SR100C_v1") {

		// SR100C_v1(obj);
		SR100C_v1(file3D);
	}
	else if (product_list_text == "SRユニット_v1") {
		// SRユニット_v1(obj);
		// console.log("lllll",file3D);
		SRユニット_v1(file3D);
	}

});

// ----------------------------------- dark/light mode -----------------------------------
if (getMode && getMode === "dark-theme") {
	document.body.classList.add("dark-theme");
	toggle.classList.add("active");

	scene.background = new Color(0x1d2538);

	scene.remove(scene.getObjectByName("grid"));

	const grid = new GridHelper(20, 20, 0x475b74, 0x475b74);
	grid.position.y = -1;
	grid.name = "grid";
	scene.add(grid);

	localStorage.setItem("mode", "dark-theme");
}

toggle.addEventListener("click", () => toggle.classList.toggle("active"));

toggle.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");

	if (document.body.classList.contains("dark-theme")) {
		scene.background = new Color(0x1d2538);

		scene.remove(scene.getObjectByName("grid"));

		const grid = new GridHelper(20, 20, 0x475b74, 0x475b74);
		grid.position.y = -1;
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "dark-theme");
	} else {
		scene.background = new Color(0xdbe9e9);

		scene.remove(scene.getObjectByName("grid"));
		const grid = new GridHelper(20, 20, 0xffffff, 0xffffff);
		grid.position.y = -1;
		grid.name = "grid";
		scene.add(grid);

		localStorage.setItem("mode", "light");
	}
});

// -------------------------------------- lightning --------------------------------------
menuLightning.addEventListener("click", () => {
	menuLightning.classList.toggle("active");

	if (menuLightning.classList.contains("active")) {
		lightning_expand.style.display = "block";
	} else {
		lightning_expand.style.display = "none";
	}
});

opsi.forEach(function (opsi) {
	opsi.addEventListener("click", () => {
		resetOpsi();
		opsi.classList.toggle("active");

		if (opsi.classList.contains("active")) {
			let opsi_text = opsi.innerText;
			updateLightning(opsi_text);
		}
	});
});

window.addEventListener("resize", () => {
	if (custom_lightning.style.display == "flex") {
		if (window.innerWidth < 900) {
			lightning_expand.style.height = "230px";
		} else {
			lightning_expand.style.height = "190px";
		}
	}
});

// -------------------------------- slider env brightness --------------------------------
updateSliderEnv();
slider_env.addEventListener("input", () => {
	updateSliderEnv();
	updateEnvBrightness();
});

// --------------------------------- slider lamp position --------------------------------
updateSliderLampPos();
slider_lamp_pos.addEventListener("input", () => {
	updateSliderLampPos();
	updateLampPos();
});

// ------------------------------- slider lamp brightness --------------------------------
updateSliderLamp();
slider_lamp.addEventListener("input", () => {
	updateSliderLamp();
	updateLamp();
});

// -------------------------------------- catalogue --------------------------------------
menuAlbum.addEventListener("click", () => {
	menuAlbum.classList.toggle("active");

	if (menuAlbum.classList.contains("active")) {
		catalogueContainer.style.display = "flex";
	} else {
		catalogueContainer.style.display = "none";
	}
});

loadCatalogue(catalogue_product_list);

// ------------------------------------- slider zoom -------------------------------------
updateSlider();
updateZoomCamera();
slider.addEventListener("input", () => {
	updateSlider();
	updateZoomCamera();
});

// ---------------------------------------- sound ----------------------------------------
menuSound.addEventListener("click", () => {
	menuSound.classList.toggle("active");

	if (menuSound.classList.contains("active")) {
		iconSoundOff.style.display = "none";
		iconSoundOn.style.display = "block";
		soundExpand.style.display = "flex";
	} else {
		iconSoundOff.style.display = "block";
		iconSoundOn.style.display = "none";
		soundExpand.style.display = "none";
	}
});

toggle_music.addEventListener("click", () => {
	toggle_music.classList.toggle("active");

	if (toggle_music.classList.contains("active")) {
		audio.play();
	} else {
		audio.pause();
	}
});

toggle_speech.addEventListener("click", () => {
	toggle_speech.classList.toggle("active");

	if (index == 1) {
		sound = audio_speech
	} else if (index == 2) {
		sound = audio_speech_2
	}

	if (toggle_speech.classList.contains("active")) {
		soundStatus = 1;
		audioPlayer()
	} else {
		soundStatus = 0;
		sound.pause();
		sound.currentTime = 0;
	}
});

// -------------------------------------- animation --------------------------------------
menuAnimation.addEventListener("click", () => {
	menuAnimation.classList.toggle("active");

	if (menuAnimation.classList.contains("active")) {
		iconAnimationOff.style.display = "none";
		iconAnimationOn.style.display = "block";
		orbitControls.autoRotate = true;
	} else {
		iconAnimationOff.style.display = "block";
		iconAnimationOn.style.display = "none";
		orbitControls.autoRotate = false;
	}
});

// ------------------------------------- information -------------------------------------
menuInformation.addEventListener("click", () => {
	menuInformation.classList.toggle("active");

	if (menuInformation.classList.contains("active")) {
		informationContainer.style.display = "flex";
	} else {
		informationContainer.style.display = "none";
	}
});

// ------------------------------------- video button ------------------------------------
video_button.addEventListener("click", () => {
	video_pop_up.classList.toggle("active");
});

video_pop_up.addEventListener("click", function (e) {
	if (
		!document.getElementById("pdf-pop-up-container-video").contains(e.target)
	) {
		if (video_pop_up.classList.contains("active")) {
			video_pop_up.classList.remove("active");
			video.pause();
			video.currentTime = 0;
		}
	}
});

// ---------------------------------------------------------------------------------------
// ---------------------------------- FUNCTION HELPER ------------------------------------
// ---------------------------------------------------------------------------------------

// ----------------------------------- Explode 3D File -----------------------------------

// Function to create an annotation
// function createAnnotation(obj, content, position, label) {
// 	const annotationDiv = document.createElement("div");
// 	annotationDiv.id = "annotationDiv"

// 	annotationDiv.textContent = content;
// 	annotationDiv.style.backgroundColor = "#74E7D4";
// 	annotationDiv.style.fontFamily = "Ubuntu";

// 	const annotation = new CSS2DObject(annotationDiv);
// 	annotation.name = label;
// 	annotation.position.copy(position);
// 	annotation.center.set(0, 1, 0);
// 	obj.add(annotation);
// }

function createAnnotation(scene, content, position, label, AGscale, AGtranslate, AGrotate) {
	const annotationGeometry = new BoxGeometry(0, 0.1, 0.5);
	const annotationMaterial = new MeshBasicMaterial({ color: 0x74E7D4 });
	const annotationMesh = new Mesh(annotationGeometry, annotationMaterial);

	annotationMesh.position.copy(position);

	// console.log(content);

	// Load a font (make sure you have the font file accessible)
	const fontLoader = new FontLoader();
	fontLoader.load('./assets/fonts/helvetiker_bold.typeface.json', (font) => {
		// Create text geometry using the loaded font
		const textGeometry = new TextGeometry(content, {
			font: font,
			size: 0.05, // Adjust as needed
			height: 0.001, // Adjust as needed
		});

		const textMaterial = new MeshBasicMaterial({ color: 0x000000 }); // Green color for text
		const textMesh = new Mesh(textGeometry, textMaterial);

		// Position the text mesh on top of the annotation box
		textMesh.position.copy(position);
		// textMesh.position.y += 0.1; // Adjust the height to position the text above the box

		// Make the text mesh always face the camera
		textMesh.lookAt(camera.position);
		textMesh.rotateY(Math.PI);

		rotateObject(textMesh, AGrotate, 0, 0)

		// console.log(content, " : ");
		// console.log("textMesh.position : ", textMesh.position);
		// console.log("annotationMesh : ", annotationMesh.position);

		textMesh.name = label

		scene.add(textMesh);

		// Set annotationMesh's position and rotation to match textMesh
		annotationMesh.position.copy(textMesh.position);
		annotationMesh.rotation.copy(textMesh.rotation);

		rotateObject(annotationMesh, 0, 90, 0)
		translateObject(annotationMesh, AGtranslate.x, AGtranslate.y, AGtranslate.z)

		annotationMesh.scale.set(AGscale.x, AGscale.y, AGscale.z);

		annotationMesh.name = `A${label}`
		// Add annotationMesh to the scene
		scene.add(annotationMesh);
	});
}

function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
	object.rotateX(THREE.Math.degToRad(degreeX));
	object.rotateY(THREE.Math.degToRad(degreeY));
	object.rotateZ(THREE.Math.degToRad(degreeZ));
}

function translateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
	object.translateX(THREE.Math.degToRad(degreeX));
	object.translateY(THREE.Math.degToRad(degreeY));
	object.translateZ(THREE.Math.degToRad(degreeZ));
}



// Function to remove an annotation
function removeAnnotation(obj, label) {
	// console.log(`Removing annotation with label "${label}"`);

	// console.log(obj);
	const annotation = obj.getObjectByName(label);
	obj.remove(annotation)

}

// Function to reset the state of the 3D model and annotations
function resetModelAndAnnotations(obj, label) {
	// console.log(obj.visible);
	// // Reset object visibility
	// obj.forEach((child) => {
	//     child.visible = true;
	// });

	//i am tiredddddd :(

	SR100C_v1(obj)

	// Remove existing annotations
	obj.remove(obj.getObjectByName(label));
	// obj.remove(obj.getObjectByName("B"));
	// obj.remove(obj.getObjectByName("C"));
	// obj.remove(obj.getObjectByName("D"));
	// obj.remove(obj.getObjectByName("E"));
	// obj.remove(obj.getObjectByName("F"));
	// obj.remove(obj.getObjectByName("G"));
	// obj.remove(obj.getObjectByName("H"));
	// obj.remove(obj.getObjectByName("I"));
	// obj.remove(obj.getObjectByName("J"));
	// obj.remove(obj.getObjectByName("K"));
	// obj.remove(obj.getObjectByName("L"));
	// // ... remove other annotations as needed
}

function SR100C_v1(obj) {
	let object_children = obj.children;
	// console.log(object_children);

	if (explode_button.classList.contains("active")) {
		console.log("Button clicked: explode active");

		object_children.forEach((child) => {
			if (moved_mesh.includes(child.name)) {
				child.visible = false;
			}
		});

		// SR100 Annotation
		createAnnotation(obj, "Upper Casing", new Vector3(-0.6, 2.2, 0), "A", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -15);
		createAnnotation(obj, "Material Feed", new Vector3(-0.3, 2.5, 0), "B", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -10);
		createAnnotation(obj, "Hydraulic Casing Opener", new Vector3(0.6, 2.2, 0), "C", { x: 1, y: 1, z: 1.7 }, { x: 0, y: 2, z: 23 }, -15);
		createAnnotation(obj, "Guide Flange", new Vector3(-0.3, 1.5, 0), "D", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -15);
		createAnnotation(obj, "Air Circulation", new Vector3(0.1, 1.75, 0.75), "E", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -20);
		createAnnotation(obj, "Upper Frame", new Vector3(0.6, 1.8, 0.75), "F", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -20);
		createAnnotation(obj, "Crushing Chamber", new Vector3(0.1, 1, 1), "G", { x: 1, y: 1, z: 1.3 }, { x: 0, y: 2, z: 17 }, -20);
		createAnnotation(obj, "Rotor", new Vector3(-0.3, 1, 0.5), "H", { x: 1, y: 1, z: 0.5 }, { x: 0, y: 2, z: 5 }, -20);
		createAnnotation(obj, "Vertical Shaft", new Vector3(-0.25, 0.5, 0), "I", { x: 1, y: 1, z: 1 }, { x: 0, y: 2, z: 13 }, -25);
		createAnnotation(obj, "Pulley", new Vector3(-0.2, -0.1, 0.2), "J", { x: 1, y: 1, z: 0.5 }, { x: 0, y: 2, z: 5 }, -30);
		createAnnotation(obj, "Shaped Material", new Vector3(-0.1, -0.1, 0.75), "K", { x: 1, y: 1, z: 1.2 }, { x: 0, y: 2, z: 15 }, -30);

		gsap.to(camera.position, {
			duration: 2,
			x: -3.5,
		});
		gsap.to(camera.position, {
			duration: 2,
			y: 2,
		});
		gsap.to(camera.position, {
			duration: 1,
			z: 2.8,
		});

		document.getElementById("explode-button").disabled = true;
		setTimeout(function () {
			document.getElementById("explode-button").disabled = false;
		}, 2500);
	}

	else {
		// console.log("Button clicked: explode inactive");

		object_children.forEach((child) => {
			if (moved_mesh.includes(child.name)) {
				child.visible = true;
			}
		});

		// SR100 Annotation
		removeAnnotation(obj, "A")
		removeAnnotation(obj, "B")
		removeAnnotation(obj, "C")
		removeAnnotation(obj, "D")
		removeAnnotation(obj, "E")
		removeAnnotation(obj, "F")
		removeAnnotation(obj, "G")
		removeAnnotation(obj, "H")
		removeAnnotation(obj, "I")
		removeAnnotation(obj, "J")
		removeAnnotation(obj, "K")
		removeAnnotation(obj, "AA")
		removeAnnotation(obj, "AB")
		removeAnnotation(obj, "AC")
		removeAnnotation(obj, "AD")
		removeAnnotation(obj, "AE")
		removeAnnotation(obj, "AF")
		removeAnnotation(obj, "AG")
		removeAnnotation(obj, "AH")
		removeAnnotation(obj, "AI")
		removeAnnotation(obj, "AJ")
		removeAnnotation(obj, "AK")

		gsap.to(camera.position, {
			duration: 2.8,
			x: 6,
		});
		gsap.to(camera.position, {
			duration: 2.5,
			y: 4,
		});
		gsap.to(camera.position, {
			duration: 1,
			z: -4,
		});
		document.getElementById("explode-button").disabled = true;
		setTimeout(function () {
			document.getElementById("explode-button").disabled = false;
		}, 2500);
	}
}

function SRユニット_v1(obj) {
	let object_children = obj.children;

	if (explode_button.classList.contains("active")) {
		// console.log("55555",obj);
		obj.forEach((child) => {
			// Check if the child's name is in the list of objects to hide
			if (moved_mesh.includes(child.name)) {
				// Hide the child object
				child.visible = false;
			}
			else {
				let target = new Vector3();
				child.getWorldPosition(target);
				target.normalize();
				target.setX(target.x * 1 + child.position.x);
				target.setY(target.y * 1 + child.position.y);
				target.setZ(target.z * 1 + child.position.z);
				gsap.to(child.position, {
					duration: 1,
					x: target.x,
				});
				gsap.to(child.position, {
					duration: 1,
					y: target.y,
				});
				gsap.to(child.position, {
					duration: 1,
					z: target.z,
				});
			}
		});
	} else {
		obj.forEach((child) => {
			// Toggle visibility for child objects
			if (moved_mesh.includes(child.name)) {
				// Show the child object
				child.visible = true;
			}
			else {
				let target = new Vector3();
				child.getWorldPosition(target);
				target.normalize();
				target.setX(child.position.x - target.x * 1);
				target.setY(child.position.y - target.y * 1);
				target.setZ(child.position.z - target.z * 1);
				gsap.to(child.position, {
					duration: 1,
					x: target.x,
				});
				gsap.to(child.position, {
					duration: 1,
					y: target.y,
				});
				gsap.to(child.position, {
					duration: 1,
					z: target.z,
				});
			}
		});
	}
}

// -------------------------------------- lightning --------------------------------------
function resetOpsi() {
	opsi.forEach(function (opsi) {
		opsi.classList.remove("active");
	});
}

function updateLightning(opsi_text) {
	if (opsi_text === "custom") {
		custom_lightning.style.display = "flex";

		if (window.innerWidth < 900) {
			lightning_expand.style.height = "230px";
		}

		ambientLight.intensity = 0.5;
		dirLight.intensity = 20;

		light1.intensity = 0;
		light2.intensity = 0;
		light3.intensity = 0;
		light4.intensity = 0;

		slider_env.value = 0.5;
		updateSliderEnv();
		updateEnvBrightness();
		slider_lamp.value = 20;
		updateSliderLamp();
		updateLamp();
		slider_lamp_pos.value = 210;
		updateSliderLampPos();
		updateLampPos();
	} else {
		custom_lightning.style.display = "none";
		lightning_expand.style.height = "190px";

		ambientLight.intensity = 0;
		dirLight.intensity = 0;

		light1.intensity = 1;
		light2.intensity = 1;
		light3.intensity = 1;
		light4.intensity = 1;
	}
}

// -------------------------------- slider env brightness --------------------------------
function updateSliderEnv() {
	value_env = (slider_env.value / maxValue_env) * 100 + "%";
	sliderFill_env.style.width = value_env;
}

function updateEnvBrightness() {
	let ambient = scene.getObjectByName("ambientLight");
	ambient.intensity = slider_env.value;
}

// --------------------------------- slider lamp position --------------------------------
function updateSliderLampPos() {
	value_lamp_pos = (slider_lamp_pos.value / maxValue_lamp_pos) * 100 + "%";
	sliderFill_lamp_pos.style.width = value_lamp_pos;
}

function updateLampPos() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.position.set(100, 100, -(slider_lamp_pos.value - 200));
}

// ------------------------------- slider lamp brightness --------------------------------
function updateSliderLamp() {
	value_lamp = (slider_lamp.value / maxValue_lamp) * 100 + "%";
	sliderFill_lamp.style.width = value_lamp;
}

function updateLamp() {
	let lamp = scene.getObjectByName("dirLight");
	lamp.intensity = slider_lamp.value;
}

// -------------------------------------- catalogue --------------------------------------

// Inside the loadCatalogue function
function loadCatalogue(catalogue_product_list) {
	catalogue_product_list.forEach(function (product_list) {
		product_list.addEventListener("click", () => {

			// console.log("Index : ", index);
			// console.log("product_list.id : ", product_list.id);

			if (product_list.id != index) {
				index = product_list.id
				sound.pause()
				sound.currentTime = 0;
				toggle_speech.classList.contains("active") ? audioPlayer() : ""
			}

			resetCatalogueSelect();
			// product_list.classList.toggle("active");
			product_list.classList.add("active"); // Add the "active" class here

			product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;
			explode_button.classList.remove("active");

			// Find the current 3D model object
			let file3D = scene.getObjectByName("file3D");

			// Reset the model and annotations for the current 3D model
			resetModelAndAnnotations(file3D);

			updateFile3D(product_list_text);
		});

		// Check if the current product list is active
		if (product_list.classList.contains("active")) {
			let product_list_text = product_list.querySelector(
				".catalogue-product-list-text-2"
			).innerText;

			// explode_button.classList.remove("active");

			// // Find the current 3D model object
			// let file3D = scene.getObjectByName("file3D");
			// console.log("HHH",file3D);

			// // Reset the model and annotations for the current 3D model
			// resetModelAndAnnotations(file3D);

			updateFile3D(product_list_text);
		}
	});
}

function resetCatalogueSelect() {
	catalogue_product_list.forEach(function (product_list) {
		product_list.classList.remove("active");
	});
}

function updateFile3D(file_name) {

	try {
		let file3D = scene.getObjectByName("file3D");
		file3D.name = "file3D";

		scene.remove(file3D);
		let newFile3D = `files/${file_name}.glb`;

		loader.load(
			newFile3D,
			function (gltf) {
				file3D = gltf.scene;
				file3D.name = "file3D";
				scene.add(file3D);
				file3D.position.set(0, -0.95, 0);
			},
			undefined,
			function (error) {
				console.error(error);
			}
		);
	} catch (e) {
		// do nothing
	}
}

// ------------------------------------- slider zoom -------------------------------------
function updateZoomCamera() {
	camera.zoom = slider.value;
	camera.updateProjectionMatrix();
}

function updateSlider() {
	value = (slider.value / maxValue) * 100 + "%";
	sliderFill.style.width = value;
}

// pdf button
const pdf_button = document.querySelector(".menu-pdf");
const pdf_pop_up = document.querySelector(".container-full-screen-pdf");

pdf_button.addEventListener("click", () => {
	const annotationDivs = document.querySelectorAll("#annotationDiv");
	if (annotationDivs) {
		annotationDivs.forEach(div => {
			div.style.display = "none";
		});
	}
	pdf_pop_up.classList.toggle("active");
});

pdf_pop_up.addEventListener("click", function (e) {
	if (!document.getElementById("pdf-pop-up-container").contains(e.target)) {
		if (pdf_pop_up.classList.contains("active")) {
			pdf_pop_up.classList.remove("active");
		}
	}
});
