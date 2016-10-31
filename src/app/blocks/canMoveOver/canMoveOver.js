import mapFactory from '../../map';

export default canMoveOverFactory;

function canMoveOverFactory(line, column) {
  const canMoveOver = {
    line,
    column,
    map: mapFactory(),

    canMoveOver() {
      return true;
    },

    moveOverBefore(block) {
      this.map.itemsMap[block.line][block.column] = null;
      this.map.itemsMap[this.line][this.column] = block;
      block.line = this.line;
      block.column = this.column;
    },

    moveOverAfter(block) {}
  };

  return canMoveOver;
}
