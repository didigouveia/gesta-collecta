
class Point {
  constructor (x, y, t, stroke_id) {
    this.x = x;
    this.y = y;
    this.w = null;
    this.z = null;
    this.alpha = null;
    this.beta = null;
    this.gamma = null;
    this.t = t;
    this.stroke_id = stroke_id;
  }
}

module.exports = {
  Point
};