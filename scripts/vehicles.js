const DRONE_CAR_WIDTH = 10;
const DRONE_CAR_HEIGHT = 20;

function Vehicle(road, laneNumber, mainCar, relYPos) {
    this.xPos = road.getCenterLineForLane(laneNumber);
    this.relYPos = relYPos;
    this.laneNumber = laneNumber;
    
    this.velocity = 2.5;
	this.xVel = 0;
	this.yVel = 0;
	this.acceleration = 0.025;
	this.deceleration = 0.03;
	this.angularVelocity = 0;
	this.angularAcceleration = Math.PI / 80;
	this.angularAccelerationModifier = 0.65;
	this.maxDeflection = Math.PI / 5;
	this.maxVelocity = 4;
	this.defaultDirection = -Math.PI / 2;
	this.direction = this.defaultDirection;
	this.velToMaxVelRatio = this.velocity / this.maxVelocity;
	
	this.accelerate = function() {
		if (this.velocity < this.maxVelocity) {
			this.velocity += this.acceleration;
			if (this.velocity > this.maxVelocity) {
				this.velocity = this.maxVelocity;
			}
		}
		yVelReadout.value = "yVel : " + this.yVel;
	}
	
	this.decelerate = function() {
		if (this.velocity > 0) {
			this.velocity -= this.deceleration;
			if (this.velocity < 0) {
				this.velocity = 0 ;
			}
		}
	}

	this.turnLeft = function() {
		if (this.direction > this.defaultDirection - this.maxDeflection) {
			this.direction -= this.angularAcceleration;
		}
	}

	this.turnRight = function() {
		if (this.direction < this.defaultDirection + this.maxDeflection) {
			this.direction += this.angularAcceleration;
		}
	}

	this.update = function(road, controls) {
		this.calculateVelocityComponents();
		this.xPos += this.xVel;
		this.velToMaxVelRatio = this.velocity / this.maxVelocity;
		let maxXPos = (road.laneArray.length * road.laneWidth / 2) - (CAR_WIDTH_IN_MODEL / 2);
		console.log('carWidth = ' + CAR_WIDTH_IN_MODEL + ', car.xPos = ' + Math.trunc(this.xPos));
		
		// Prevent the car from going past the edge of the road, and add a small rebound.
		if (this.xPos < -maxXPos) {
			this.xPos = -maxXPos;
			this.direction = this.defaultDirection + this.maxDeflection / 2;
		} else if (this.xPos > maxXPos) {
			this.xPos = maxXPos;
			this.direction = this.defaultDirection - this.maxDeflection / 2;
		}

		// Allow car direction to return to center when no left/right controls are depressed.
		if (!controls.leftArrowDown && ! controls.rightArrowDown) {
			if (this.direction < this.defaultDirection) {
				this.direction += this.angularAcceleration * this.angularAccelerationModifier;
			} else if (this.direction > this.defaultDirection) {
				this.direction -= this.angularAcceleration * this.angularAccelerationModifier;
			}
	
			// Correct for residual drift.
			if (Math.abs(this.defaultDirection - this.direction) < this.angularAcceleration * 2) {
				this.direction = this.defaultDirection;
			}
		}
	}

	this.getVehicleAngle = function() {
		return this.direction - this.defaultDirection;
	}

	this.calculateVelocityComponents = function() {
		this.xVel = this.velocity * Math.cos(this.direction);
		this.yVel = this.velocity * -Math.sin(this.direction);
	}
}

function VehicleCoordinator() {
    verticalArray = [];
    horizontalArray = [];

    this.addVehicle(vehicle) {
        verticalArray.push(vehicle);
        horizontalArray.push(vehicle);
    }
}

function DroneCar() {
    this.width = DRONE_CAR_WIDTH;
    this.height = DRONE_CAR_HEIGHT;

}