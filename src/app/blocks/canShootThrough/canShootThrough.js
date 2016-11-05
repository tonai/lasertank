import themeSettings from '../../settings/themeSettings';
import mapFactory from '../../map';

export default canShootThroughFactory;

/**
 * Defines blocks for which mover shooter can shoot through.
 *
 * @module blocks/canShootThrough
 */
function canShootThroughFactory(line, column) {
  const canShootThrough = {
    line,
    column,
    map: mapFactory(),

    /**
     * Can shooter block shoot through this block ?
     *
     * @returns {Boolean} Yes or no ?
     */
    canShootThrough() {
      return true;
    },

    /**
     * Function called before the shoot is drawn.
     *
     * @param {Object} block Shooter block.
     *
     * @returns {Array} List of points.
     */
    shootOverBefore(direction) {
      let pointList = [];
      const mainDirProperty = direction % 2 === 0 ? 'line' : 'column';
      const secondaryDirProperty = direction % 2 === 1 ? 'line' : 'column';
      for (let i = this[mainDirProperty] * themeSettings.width; i < (this[mainDirProperty] + 1) * themeSettings.width; i++) {
        pointList.push(i);
      }
      pointList = direction < 39 ? pointList.reverse() : pointList;
      return pointList.map(point => ({
        [mainDirProperty]: point,
        [secondaryDirProperty]: (this[secondaryDirProperty] * themeSettings.width) + 14
      }));
    },

    /**
     * Function called after the shoot is drawn.
     *
     * @param {Object} block Shooter block.
     *
     * @returns {Object} The next block coordinates.
     */
    shootOverAfter(direction) {
      switch (direction) {
        case 37:
          return {column: this.column - 1, line: this.line};

        case 38:
          return {column: this.column, line: this.line - 1};

        case 39:
          return {column: this.column + 1, line: this.line};

        case 40:
          return {column: this.column, line: this.line + 1};

        default:
      }
    }
  };

  return canShootThrough;
}
