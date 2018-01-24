const MAXVEL = 5;
const NUMBER_OF_CARS_PER_PAGE = 8;

var myCanvas = document.getElementById("myCanvas");
var yVelReadout = document.getElementById("yVelReadout");
var laneOffsetReadout = document.getElementById("laneOffsetReadout");
var xPosReadout = document.getElementById("xPosReadout");
var ctx = myCanvas.getContext("2d");
var carImageReady = false;
ctx.fillStyle = '#ffffff';
// Global namespace variables:
var canvasWidth, canvasHeight;
var carImageScaleRatio;
var carImageScaledWidth, carImageScaledHeight;
		   
var myCar = new MainCar(5);
var lane = new Lane(0);

var roadDrawer = new RoadDrawer();

var mainRoad = new Road(6, 0, false, myCar.carWidth);
console.log('road.laneWidth == ' + mainRoad.laneWidth);

var controls = new Controls();

// On window load
document.addEventListener('DOMContentLoaded', function(event) {
	console.log("DOMContentLoaded");
	canvasWidth = myCanvas.width;
	canvasHeight = myCanvas.height;
	roadDrawer.setScaleRatio(canvasWidth, canvasHeight, myCar.carHeight);
	console.log("viewport width = " + canvasWidth + ", height = " + canvasHeight);
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
	}
	
});

// Load the car image asynchronously.
var carImage = new Image();
carImage.onload = setCarImageReady;
carImage.src = "images/red_car.png";
function setCarImageReady() {
	carImageReady = true;
	carImageScaleRatio = (canvasHeight / NUMBER_OF_CARS_PER_PAGE) / carImage.height;
	carImageScaledWidth = carImage.width * carImageScaleRatio;
	carImageScaledHeight = carImage.height * carImageScaleRatio;
	mainRoad.setLaneWidth(roadDrawer.laneWidth);
	console.log('width : ' + carImage.width + ', height = ' + carImage.height);
}

// Start timer.
var go = setInterval(doFrame, 16);

// Main game loop.
function doFrame() {

	console.log('road.laneWidth == ' + mainRoad.laneWidth);
	console.log('road.isContraFlow == ' + mainRoad.isContraFlow);

	// Check control key states and act if necessary.
	controls.update(myCar);

	// Update xPosReadout.
	xPosReadout.value = "xPosReadout : " + myCar.xPos;
	yVelReadout.value = "yVel : " + myCar.yVel;

	// Update car and road.
	myCar.update(mainRoad, controls);
	lane.updateLineOffset(myCar.yVel);

	// Draw road.
	roadDrawer.drawRoad(mainRoad, canvasWidth, canvasHeight, ctx);
	

	if (carImageReady) {

		// Translate, then rotate context.
		ctx.translate(canvasWidth / 2 + myCar.xPos, canvasHeight - carImageScaledHeight * 2);
		ctx.rotate(myCar.getCarAngle());
		// Draw car.
		ctx.drawImage(
			carImage,
			-carImageScaledWidth / 2,
			-carImageScaledHeight / 2, 
			carImageScaledWidth, 
			carImageScaledHeight);

		// Rotate canvas back to 0, and translate back to the origin.
		ctx.rotate(-myCar.getCarAngle());
		ctx.translate(-(canvasWidth / 2 + myCar.xPos), -(canvasHeight - carImageScaledHeight * 2));
		
	}
}
