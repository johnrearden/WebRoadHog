const MAX_LINE_OFFSET = 200;
const DOTTED_LINE_HEIGHT_RELATIVE_TO_OFFSET = 0.2;
const LANE_WIDTH_TO_CAR_WIDTH_RATIO = 2.5;

// A lane represents part of a road. The direction field is a float between
// 0 and 360, with 0 being up, or the direction of the main road.
function Lane(direction) {
	this.direction = direction;
	this.lineOffset = 0;

	this.updateLineOffset = function(carYVel) {
		var amount = carYVel;
		this.lineOffset += amount;
		this.lineOffset = this.lineOffset % MAX_LINE_OFFSET;
	}
}

// A road is a group of one or more lanes.
function Road(numberOfLanes, direction, isContraFlow, carWidth) {
	this.direction = direction;
	this.isContraFlow = isContraFlow;
	this.laneWidth = carWidth * LANE_WIDTH_TO_CAR_WIDTH_RATIO;
	this.laneArray = [];
	for (i = 0; i < numberOfLanes; i++) {
		this.laneArray.push(new Lane(direction));
	}
	if (direction == 0) {
		this.isMainRoad = true;
	} else {
		this.isMainRoad = false;
	}
}
