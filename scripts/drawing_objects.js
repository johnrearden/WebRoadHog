const LINE_WIDTH_TO_LANE_WIDTH_RATIO = 0.08;
const MAX_ZOOM = 80;
const MIN_ZOOM = 6;
const VERTICAL_REL_CAR_POS = 0.8;
const INITIAL_ZOOM_LEVEL = 10;

const LANE_WIDTH_TO_CAR_WIDTH_RATIO = 1.8;
const DOTTED_LINE_LENGTH_REL_TO_CAR_HEIGHT = 0.7;
const DOTTED_LINE_SPACING_REL_TO_LENGTH = 2;
const DOTTED_LINE_LENGTH = DOTTED_LINE_LENGTH_REL_TO_CAR_HEIGHT * CAR_LENGTH_IN_MODEL;
const DOTTED_LINE_TOTAL_OFFSET = (DOTTED_LINE_SPACING_REL_TO_LENGTH + 1) * DOTTED_LINE_LENGTH;

function CarDrawer() {
    
    this.drawCar = function(car, width, height, roadDrawer) {
        if (carImageReady) {

            // Calculate amount to scale car image by according to zoom level.
            let carZoomLevel = roadDrawer.zoomLevel / INITIAL_ZOOM_LEVEL;

            // Translate, then rotate context.
            ctx.translate(width / 2 + (myCar.xPos * roadDrawer.scaleRatio), height * VERTICAL_REL_CAR_POS);
            ctx.rotate(car.getCarAngle());
            // Draw car.
            ctx.drawImage(
                carImage,
                -carImageScaledWidth / carZoomLevel / 2,
                -carImageScaledHeight / carZoomLevel * 3 / 4,
                carImageScaledWidth / carZoomLevel, 
                carImageScaledHeight / carZoomLevel);
    
            // Rotate canvas back to 0, and translate back to the origin.
            ctx.rotate(-myCar.getCarAngle());
            ctx.translate(-(width / 2 + (myCar.xPos * roadDrawer.scaleRatio)), -(height * VERTICAL_REL_CAR_POS));
            
        }
    }
}

function RoadDrawer () {
    this.zoomLevel = INITIAL_ZOOM_LEVEL;
    this.scaleRatio = 1;
    this.redrawFullBackground = true;
    this.dottedLineOffset = 0;
    
    this.updateDottedLineOffset = function(yVelocityOfCar) {
        this.dottedLineOffset += yVelocityOfCar;
        this.dottedLineOffset %= DOTTED_LINE_TOTAL_OFFSET;
    }

    this.drawRoad = function(road, canvasWidth, canvasHeight, context) {
        
        // Redraw the background if necessary.
        if (this.redrawFullBackground) {
            context.fillStyle = '#555555';
            context.fillRect(0, 0, canvasWidth, canvasHeight);
            this.redrawFullBackground = false;
        }

        let scaledLaneWidth = road.laneWidth * this.scaleRatio;
        let combinedWidth = road.laneArray.length * scaledLaneWidth;
        let leftEdgeOfRoad = canvasWidth / 2 - combinedWidth / 2;
        let lineWidth = scaledLaneWidth * LINE_WIDTH_TO_LANE_WIDTH_RATIO;
        let scaledDottedLineLength = DOTTED_LINE_LENGTH * this.scaleRatio;
        if (road.isMainRoad) {

            // Draw road.
            context.fillStyle = "#000000";
            context.fillRect(leftEdgeOfRoad, 0, combinedWidth, canvasHeight);

            // Draw white lines between lanes.
            context.fillStyle = '#555555';
            let scaledDottedLineTotalOffset = DOTTED_LINE_TOTAL_OFFSET * this.scaleRatio;
            let scaledDottedLineOffset = this.dottedLineOffset * this.scaleRatio;
            for (i = 0; i <= (Math.trunc(canvasHeight / scaledDottedLineTotalOffset)) + 1; i++) {
                for (j = 1; j < road.laneArray.length; j++) {
                    context.fillRect(
                        leftEdgeOfRoad + (j * scaledLaneWidth) - lineWidth / 2,
                        i * scaledDottedLineTotalOffset + scaledDottedLineOffset,
                        lineWidth,
                        scaledDottedLineLength
                    );
                }
            }

            // Draw yellow lines at edges of road.
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
    
    this.setZoomLevel = function(deltaZoom) {
        this.zoomLevel += deltaZoom;
        this.redrawFullBackground = true;
        if (this.zoomLevel > MAX_ZOOM) {
            this.zoomLevel = MAX_ZOOM;
        } else if (this.zoomLevel < MIN_ZOOM) {
            this.zoomLevel = MIN_ZOOM;
        }
        this.setScaleRatio(canvasWidth, canvasHeight, CAR_LENGTH_IN_MODEL);
    }
} 

function VehicleDrawer () {
    
    this.drawVehicles = function(vehicleArray, roadDrawer, width, height) {
        for (i = 0; i < vehicleArray.length; i++) {
            let vehic = vehicleArray[i];
            if (vehic.imageReady) {
    
                // Calculate amount to scale car image by according to zoom level.
                let vehicZoomLevel = roadDrawer.zoomLevel / INITIAL_ZOOM_LEVEL;

                // Calculate scaled value of the y-offset.
                let scaledYOffset = vehic.relYPos * roadDrawer.scaleRatio;

                // Translate, then rotate context.
                ctx.translate(width / 2 + (vehic.xPos * roadDrawer.scaleRatio), (height * VERTICAL_REL_CAR_POS) - scaledYOffset);
                ctx.rotate(vehic.getVehicleAngle());
                // Draw vehicle.
                ctx.drawImage(
                    purpleCarImage,
                    -carImageScaledWidth / vehicZoomLevel / 2,
                    -carImageScaledHeight / vehicZoomLevel * 3 / 4,
                    carImageScaledWidth / vehicZoomLevel, 
                    carImageScaledHeight / vehicZoomLevel);
        
                // Rotate canvas back to 0, and translate back to the origin.
                ctx.rotate(-vehic.getVehicleAngle());
                ctx.translate(-(width / 2 + (vehic.xPos * roadDrawer.scaleRatio)), -((height * VERTICAL_REL_CAR_POS) - scaledYOffset));
            }
        }
    }
    
    
}
