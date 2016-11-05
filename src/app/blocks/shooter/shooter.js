import shooterSettings from '../../settings/shooterSettings';
import mapFactory from '../../map';

export default shooterFactory;

/**
 * Defines blocks that can shoot.
 *
 * @module blocks/shooter
 */
function shooterFactory(line, column) {
  const shooter = {
    line,
    column,
    direction: 38,
    map: mapFactory(),
    speed: shooterSettings.speed,

    /**
     * Starts shoot from the rotator block.
     */
    shoot() {
      document.dispatchEvent(new Event('actionStart'));
      this.pointList = this.getPointList(this);
      requestAnimationFrame(this.drawStep.bind(this));
    },

    /**
     * Get the full point list to draw.
     *
     * @param {Object} block Next block the shoot will "hit".
     *
     * @returns {Array} Array of points.
     */
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

    /**
     * Draw step of the shoot.
     *
     * @param {Number} timestamp Step time.
     */
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

    /**
     * Shoot ends.
     */
    drawEnd() {
      this.map.clearCanvas();
      this.start = null;
      document.dispatchEvent(new Event('actionEnd'));
    },

    /**
     * Draw a given list of points.
     *
     * @param {Number} pointLength Length of the array of points to draw.
     */
    drawPointList(pointLength) {
      const pointList = this.pointList.slice(0, pointLength);
      pointList.forEach(point => this.map.drawCanvasPixel(point.column, point.line, 255, 0, 0, 255));
      this.map.updateCanvas();
    }
  };

  return shooter;
}
