const KEYCODE_UP_ARROW = 38;
const KEYCODE_DOWN_ARROW = 40;
const KEYCODE_LEFT_ARROW = 37;
const KEYCODE_RIGHT_ARROW = 39;

function Controls() {
    this.leftArrowDown = false;
    this.rightArrowDown = false;
    this.upArrowDown = false;
    this.downArrowDown = false;  

    this.update = function(myCar) {
        if (this.leftArrowDown) {
            myCar.turnLeft();
        }
        if (this.rightArrowDown) {
            myCar.turnRight();
        }
        if (this.upArrowDown) {
            myCar.accelerate();
        }
        if (this.downArrowDown) {
            myCar.decelerate();
        }
    }
}


