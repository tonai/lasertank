import shooterSettings from '../../settings/shooterSettings';
import mapFactory from '../../map';

export default shooterFactory;

function shooterFactory(line, column) {
  const shooter = {
    line,
    column,
    direction: 38,
    map: mapFactory(),
    speed: shooterSettings.speed,

    shoot() {
      document.dispatchEvent(new Event('actionStart'));
      this.pointList = this.getPointList(this);
      requestAnimationFrame(this.drawStep.bind(this));
    },

    getPointList(block) {
      let pointList = [];
      if (block.canShootThrough()) {
        pointList = block.shootOverBefore(this.direction);
        const coords = block.shootOverAfter(this.direction);
        if (coords) {
          const block = this.map.getBlock(coords.line, coords.column);
          if (block) {
            pointList = pointList.concat(this.getPointList(block));
          }
        }
      }
      return pointList;
    },

    drawStep(timestamp) {
      this.start = this.start || timestamp;
      const pointLength = (timestamp - this.start) / 1000 * this.speed;
      if (pointLength >= this.pointList.length) {
        this.drawPointList(this.pointList.length);
        setTimeout(this.drawEnd.bind(this), 100);
      } else {
        this.drawPointList(pointLength);
        requestAnimationFrame(this.drawStep.bind(this));
      }
    },

    drawEnd() {
      this.map.clearCanvas();
      this.start = null;
      document.dispatchEvent(new Event('actionEnd'));
    },

    drawPointList(pointLength) {
      const pointList = this.pointList.slice(0, pointLength);
      pointList.forEach(point => this.map.drawCanvasPixel(point.column, point.line, 255, 0, 0, 255));
      this.map.updateCanvas();
    }
  };

  return shooter;
}
