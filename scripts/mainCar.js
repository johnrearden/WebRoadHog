const MAX_DEFLECTION = Math.PI / 8;

function MainCar(xVel, yVel){
	this.xVel = xVel;
	this.yVel = yVel;
	this.xPos = 0;
	this.maxYVel = 130;
	this.yVelToMaxRatio = this.yVel / this.maxYVel;
	this.minYVel = 0;
	this.maxXVel = 4.5;
	this.xAccel = .2;
	this.accel = 1;
	this.decel = 1.2;
	this.xAccelModifier = 0.75;
	
	this.accelerate = function() {
		if (this.yVel < this.maxYVel) {
			this.yVel += this.accel;
			if (this.yVel > this.maxYVel) {
				this.yVel = this.maxYVel;
			}
		}
	}
	
	this.decelerate = function() {
		if (this.yVel > this.minYVel) {
			this.yVel -= this.decel;
			if (this.yVel < this.minYVel) {
				this.yVel = this.minYVel;
			}
		}
	}

	this.turnLeft = function() {
		if (this.xVel > -this.maxXVel * this.yVelToMaxRatio) {
			this.xVel -= this.xAccel * this.yVelToMaxRatio;
		}
	}

	this.turnRight = function() {
		if (this.xVel < this.maxXVel * this.yVelToMaxRatio) {
			this.xVel += this.xAccel * this.yVelToMaxRatio;
		}
	}

	this.update = function(road, scaledCarWidth, controls) {
		this.xPos += this.xVel;
		this.yVelToMaxRatio = this.yVel / this.maxYVel;
		let halfRoadWidth = road.getHalfRoadWidth();
		if (this.xPos < - halfRoadWidth + (scaledCarWidth / 2)) {
			this.xPos = -halfRoadWidth + (scaledCarWidth / 2);
			this.xVel = this.maxXVel / 2 * this.yVelToMaxRatio;
		} else if (this.xPos > halfRoadWidth - (scaledCarWidth / 2)) {
			this.xPos = halfRoadWidth - (scaledCarWidth / 2);
			this.xVel = this.maxXVel / -2 * this.yVelToMaxRatio;
		}

		if (this.xVel < 0 && !controls.rightArrowDown && !controls.leftArrowDown) {
			this.xVel += this.xAccel * this.xAccelModifier;
		} else if(this.xVel > 0 && !controls.rightArrowDown && !controls.leftArrowDown) {
			this.xVel -= this.xAccel * this.xAccelModifier;
		}
	}

	this.getCarAngle = function() {
		let sig = Math.sign(this.xVel);
		let deflection = Math.abs(this.xVel / this.maxXVel * MAX_DEFLECTION);
		return deflection * sig;
	}
} 
