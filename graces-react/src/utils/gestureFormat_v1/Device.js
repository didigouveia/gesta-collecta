
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
    this.gyroscope = false;
    this.orientation = false;
    this.webcam = false;
    this.hand = false;
    this.fullbody = false;
    this.head = false
  }
}

export default Device;