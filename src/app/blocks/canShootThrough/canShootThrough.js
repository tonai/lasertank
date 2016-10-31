import themeSettings from '../../settings/themeSettings';
import mapFactory from '../../map';

export default canShootThroughFactory;

function canShootThroughFactory(line, column) {
  const canShootThrough = {
    line,
    column,
    map: mapFactory(),

    canShootThrough() {
      return true;
    },

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