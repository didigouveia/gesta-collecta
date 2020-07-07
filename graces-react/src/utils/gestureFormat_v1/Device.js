
class Device {
  constructor(osBrowserInfo) {
    this.osBrowserInfo = osBrowserInfo;
    this.resolutionHeight = null; 
    this.resolutionWidth = null;
    this.windowHeight = null;
    this.windowWidth = null;
    this.pixelRatio = null;
    this.mouse = false;
    this.pen = false;
    this.finger = false;
    this.acceleration = false;
    this.webcam = false;
  }
}

module.exports = {
  Device
};