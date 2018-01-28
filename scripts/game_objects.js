var myCanvas = document.getElementById("myCanvas");
var yVelReadout = document.getElementById("yVelReadout");
var laneOffsetReadout = document.getElementById("laneOffsetReadout");
var xPosReadout = document.getElementById("xPosReadout");
var ctx = myCanvas.getContext("2d");
var carImageReady = false;

// Global namespace variables:
var canvasWidth, canvasHeight;
var carImageScaleRatio, carImageScaledWidth, carImageScaledHeight;
var purpleCarImageScaleRatio, purpleCarImageScaledWidth, purpleCarImageScaledHeight;

// Create game objects.
var myCar = new MainCar(3.5);
var lane = new Lane(0);
var roadDrawer = new RoadDrawer();
var carDrawer = new CarDrawer();
var mainRoad = new Road(6, 0, false, CAR_WIDTH_IN_MODEL);
var controls = new Controls();
var vehicleCoordinator = new VehicleCoordinator();

for (i = 0; i < 200; i++) {
	let vel = 1.5 + (Math.random() * 2);
	let lane = Math.round(Math.random() * mainRoad.laneArray.length);
	if (lane >= 3) {
		vel = -vel;
	}
	let droneCar = new DroneCar(
		mainRoad,
		myCar,
		lane,
		vel,
		-3000 + 9000 * Math.random()
	);
	vehicleCoordinator.addVehicle(droneCar);
}

var vehicleDrawer = new VehicleDrawer();

// On window load
document.addEventListener('DOMContentLoaded', function(event) {
	console.log("DOMContentLoaded");
	canvasWidth = myCanvas.width;
	canvasHeight = myCanvas.height;
	roadDrawer.setScaleRatio(canvasWidth, canvasHeight, CAR_LENGTH_IN_MODEL);
});

// Add event listeners for keydown and keyup events.
document.addEventListener('keydown', (event) => {
	event = event || window.event;
	switch (event.keyCode) {
		case KEYCODE_DOWN_ARROW:
			controls.downArrowDown = true;
			break;
		case KEYCODE_UP_ARROW:
			controls.upArrowDown = true;
			break;
		case KEYCODE_LEFT_ARROW:
			controls.leftArrowDown = true;
			break;
		case KEYCODE_RIGHT_ARROW:
			controls.rightArrowDown = true;
			break;
		case KEYCODE_A:
			controls.a_keyDown = true;
			break;
		case KEYCODE_Z:
			controls.z_keyDown = true;
			break;
	}
	
});

document.addEventListener('keyup', (event) => {
	event = event || window.event;
	switch (event.keyCode) {
		case KEYCODE_DOWN_ARROW:
			controls.downArrowDown = false;
			break;
		case KEYCODE_UP_ARROW:
			controls.upArrowDown = false;
			break;
		case KEYCODE_LEFT_ARROW:
			controls.leftArrowDown = false;
			break;
		case KEYCODE_RIGHT_ARROW:
			controls.rightArrowDown = false;
			break;
		case KEYCODE_A:
			controls.a_keyDown = false;
			break;
		case KEYCODE_Z:
			controls.z_keyDown = false;
			break;
	}
	
});

// Load the car image asynchronously.
var carImage = new Image();
carImage.onload = setCarImageReady;
carImage.src = "images/red_car.png";
function setCarImageReady() {
	carImageReady = true;
	carImageScaleRatio = (canvasHeight / INITIAL_ZOOM_LEVEL) / carImage.height;
	carImageScaledWidth = carImage.width * carImageScaleRatio;
	carImageScaledHeight = carImage.height * carImageScaleRatio;
}

// Load the  purple car image asynchronously.
var purpleCarImage = new Image();
purpleCarImage.onload = setPurpleCarImageReady;
purpleCarImage.src = "images/purple_car.png";
function setPurpleCarImageReady() {
	for (i = 0; i < vehicleCoordinator.verticalArray.length; i++) {
		let v = vehicleCoordinator.verticalArray[i];
		v.imageReady = true;
	}
	purpleCarImageScaleRatio = (canvasHeight / INITIAL_ZOOM_LEVEL) / purpleCarImage.height;
	purpleCarImageScaledWidth = purpleCarImage.width * purpleCarImageScaleRatio;
	purpleCarImageScaledHeight = purpleCarImage.height * purpleCarImageScaleRatio;
}

// Start timer.
var go = setInterval(doFrame, 16);

// Main game loop.
function doFrame() {

	// Check control key states and act if necessary.
	controls.update(myCar, roadDrawer);

	// Update xPosReadout.
	xPosReadout.value = "xPosReadout : " + myCar.xPos;
	
	// Update car and road.
	myCar.update(mainRoad, controls);
	roadDrawer.updateDottedLineOffset(myCar.yVel);

	// Update vehicles.
	for (i = 0; i < vehicleCoordinator.verticalArray.length; i++) {
		let v = vehicleCoordinator.verticalArray[i];
		v.update(mainRoad, myCar);
	}

	// Draw road.
	roadDrawer.drawRoad(mainRoad, canvasWidth, canvasHeight, ctx);
	
	// Draw main car.
	carDrawer.drawCar(myCar, canvasWidth, canvasHeight, roadDrawer);

	// Draw other vehicles.
	vehicleDrawer.drawVehicles(vehicleCoordinator.verticalArray, roadDrawer, canvasWidth, canvasHeight);
}