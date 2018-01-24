const LINE_WIDTH_TO_LANE_WIDTH_RATIO = 0.08;

function RoadDrawer () {

    this.zoomLevel = 10;

    this.drawRoad = function(road, canvasWidth, canvasHeight, context) {
        
        let scaledLaneWidth = road.laneWidth * this.scaleRatio;
        let combinedWidth = road.laneArray.length * scaledLaneWidth;
        let leftEdgeOfRoad = canvasWidth / 2 - combinedWidth / 2;
        let lineWidth = scaledLaneWidth * LINE_WIDTH_TO_LANE_WIDTH_RATIO;
        if (road.isMainRoad) {
            context.fillStyle = "#000000";
            context.fillRect(leftEdgeOfRoad, 0, combinedWidth, canvasHeight);

            // Draw road.
            context.fillStyle = '#ffffff';
            for (i = 0; i <= (Math.trunc(canvasHeight / MAX_LINE_OFFSET)) + 1; i++) {
                for (j = 1; j < road.laneArray.length; j++) {
                    context.fillRect(
                        leftEdgeOfRoad + (j * scaledLaneWidth) - lineWidth / 2,
                        i * MAX_LINE_OFFSET + lane.lineOffset,
                        lineWidth,
                        MAX_LINE_OFFSET * DOTTED_LINE_HEIGHT_RELATIVE_TO_OFFSET
                    );
                }
            }
            context.fillStyle = '#ffff00';
            context.fillRect(
                leftEdgeOfRoad - lineWidth / 2,
                0,
                lineWidth,
                canvasHeight
            );
            context.fillRect(
                leftEdgeOfRoad + combinedWidth - lineWidth / 2,
                0,
                lineWidth,
                canvasHeight
            );

        }
    }

    this.setScaleRatio = function(canvasWidth, canvasHeight, carHeight) {
        this.scaleRatio = canvasHeight / this.zoomLevel / carHeight;
    }

} 