class Time {
    constructor() {
        this.time = Date.now();
        this.timeprev = Date.now();
        this.deltaTime = 0;
        this.deltaTimeS = 0;
    }
    update() {
        this.time = Date.now();
        this.deltaTime = this.time - this.timeprev;
        this.deltaTimeS = this.deltaTime / 1000;
        this.timePrev = this.time;
    }
    
}