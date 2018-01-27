const KEYCODE_UP_ARROW = 38;
const KEYCODE_DOWN_ARROW = 40;
const KEYCODE_LEFT_ARROW = 37;
const KEYCODE_RIGHT_ARROW = 39;
const KEYCODE_A = 65;
const KEYCODE_Z = 90;

function Controls() {
    this.leftArrowDown = false;
    this.rightArrowDown = false;
    this.upArrowDown = false;
    this.downArrowDown = false;  
    this.a_keyDown = false;
    this.z_keyDown = false;

    this.update = function(myCar, roadDrawer) {
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
        if (this.a_keyDown) {
            roadDrawer.setZoomLevel(+1);
        }
        if (this.z_keyDown) {
            roadDrawer.setZoomLevel(-1);
        }
    }
}


