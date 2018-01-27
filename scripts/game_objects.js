var myCanvas = document.getElementById("myCanvas");
var yVelReadout = document.getElementById("yVelReadout");
var laneOffsetReadout = document.getElementById("laneOffsetReadout");
var xPosReadout = document.getElementById("xPosReadout");
var ctx = myCanvas.getContext("2d");
var carImageReady = false;

// Global namespace variables:
var canvasWidth, canvasHeight;
var carImageScaleRatio;
var carImageScaledWidth, carImageScaledHeight;

// Create game objects.
var myCar = new MainCar(1);
var lane = new Lane(0);
var roadDrawer = new RoadDrawer();
var carDrawer = new CarDrawer();
var mainRoad = new Road(4, 0, false, CAR_WIDTH_IN_MODEL);
var controls = new Controls();
/* var vehicleCoordinator = new VehicleCoordinator();
var purpleDroneCar = new DroneCar();
purpleDroneCar.prototype = new Vehicle(mainRoad, 0, myCar, 0);
console.log(purpleDroneCar.velocity); */

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
	console.log(event.keyCode);
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
	console.log(event.keyCode);
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

	// Draw road.
	roadDrawer.drawRoad(mainRoad, canvasWidth, canvasHeight, ctx);
	
	// Draw main car.
	carDrawer.drawCar(myCar, canvasWidth, canvasHeight, roadDrawer);
}