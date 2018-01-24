const MAX_LINE_OFFSET = 200;
const DOTTED_LINE_HEIGHT_RELATIVE_TO_OFFSET = 0.2;

// A lane represents part of a road. The direction field is a float between
// 0 and 360, with 0 being up, or the direction of the main road.
function Lane(direction) {
	this.direction = direction;
	this.lineOffset = 0;

	this.updateLineOffset = function(carYVel) {
		var amount = carYVel;
		this.lineOffset += amount / 15;
		this.lineOffset = this.lineOffset % MAX_LINE_OFFSET;
	}
}

// A road is a group of one or more lanes.
function Road(numberOfLanes, direction, isContraFlow) {
	this.direction = direction;
	this.isContraFlow = isContraFlow;
	this.laneArray = [];
	for (i = 0; i < numberOfLanes; i++) {
		this.laneArray.push(new Lane(direction));
	}
	if (direction == 0) {
		this.isMainRoad = true;
	} else {
		this.isMainRoad = false;
	}

	// Set the absolute width of a lane in pixels
	this.setLaneWidth = function(width) {
		this.laneWidth = width;
	}

	// Return the distance from the center of the road to the edge.
	this.getHalfRoadWidth = function() {
		return this.laneArray.length * this.laneWidth / 2;
	}
}
