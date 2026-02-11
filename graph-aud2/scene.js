import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";

import { lerp, makeScene } from "./three-utils.js";

// create scene
const { scene } = makeScene({
	camera: {
		position: [7.76, -3.89, 4.69],
		up: [0, 0, 1], // math convention
	},
	container: document.getElementById("container"),
	controls: OrbitControls,
});

// add lights
const ambientLight = new THREE.AmbientLight(undefined, 0.1);
scene.add(ambientLight);

const pointLights = [
	{ position: [0, 5, 5], intensity: Math.PI, decay: 0 },
	{ position: [0, 0, -2], intensity: Math.PI },
];

for (const config of pointLights) {
	const pointLight = new THREE.PointLight(
		config.color,
		config.intensity,
		config.distance,
		config.decay,
	);
	pointLight.position.set(...[0, 5, 5]);
	scene.add(pointLight);
}

// axes helper
scene.add(new THREE.AxesHelper(5));

const fn = (x, y) => Math.cos(2 * x) * Math.sin(y) + 1;

// parametric surface
{
	const geometry = new ParametricGeometry(
		(u, v, target) => {
			const x = lerp(-5, 5, u);
			const y = lerp(-5, 5, v);
			target.set(x, y, fn(x, y));
		},
		64,
		64,
	);
	const material = new THREE.MeshPhongMaterial({
		color: 0x00ff00,
		opacity: 0.5,
		side: THREE.DoubleSide,
		transparent: true,
	});
	const surface = new THREE.Mesh(geometry, material);
	scene.add(surface);
}

/**
 * input (x, y, 0) point
 * @type THREE.Mesh
 */
let input;
{
	const geometry = new THREE.SphereGeometry(0.1, 32, 32);
	const material = new THREE.MeshPhongMaterial({
		color: 0xff0000,
		side: THREE.DoubleSide,
	});
	input = new THREE.Mesh(geometry, material);
	scene.add(input);
}

/**
 * output (x, y, z) point
 * @type THREE.Mesh
 */
let output;
{
	const geometry = new THREE.SphereGeometry(0.1, 32, 32);
	const material = new THREE.MeshPhongMaterial({
		color: 0xff00ff,
		side: THREE.DoubleSide,
	});
	output = new THREE.Mesh(geometry, material);
	setOutputPosition();
	scene.add(output);
}
output;

/** amount to move the point by */
const step = 0.1;

function setOutputPosition() {
	const { x, y } = input.position;
	output.position.set(x, y, fn(x, y));
}

// keyboard interaction
document.body.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowLeft":
			input.position.setX(input.position.x - step);
			break;
		case "ArrowRight":
			input.position.setX(input.position.x + step);
			break;
		case "ArrowUp":
			input.position.setY(input.position.y + step);
			break;
		case "ArrowDown":
			input.position.setY(input.position.y - step);
			break;
	}

	setOutputPosition();
});
