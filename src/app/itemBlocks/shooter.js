import mapFactory from '../map';

export default shooterFactory;

function shooterFactory(line, column) {
  const shooter = {
    line,
    column,
    direction: 38,
    map: mapFactory(),

    shoot() {
      document.dispatchEvent(new Event('actionStart'));
      this
        .drawShoot(this)
        .then(() => {
          this.map.clearCanvas();
          document.dispatchEvent(new Event('actionEnd'));
        });
    },

    drawShoot(block) {
      const pointList = block.shootOverBefore(this.direction);
      let promise = this.animateShoot(pointList);
      const coords = block.shootOverAfter(this.direction);
      if (coords) {
        const block = this.map.getBlock(coords.line, coords.column);
        if (block) {
          promise = promise.then(this.drawShoot.bind(this, block));
        }
      }
      return promise;
    },

    animateShoot(pointList) {
      let promise = new Promise(resolve => resolve());
      pointList.forEach(point => (promise = promise.then(this.drawPoint.bind(this, point))));
      return promise;
    },

    drawPoint(point) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.map.drawCanvasPixel(point.column, point.line, 255, 0, 0, 255);
          this.map.updateCanvas();
          resolve();
        }, 0);
      });
    }
  };

  return shooter;
}
