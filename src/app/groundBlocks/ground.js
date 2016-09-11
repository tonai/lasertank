import map from '../map';

export default groundFactory;

function groundFactory(line, column) {
  const ground = {
    canMoveOver() {
      return true;
    },

    moveOverBefore(block) {
      map.itemsMap[block.line][block.column] = null;
      map.itemsMap[this.line][this.column] = block;
      block.line = this.line;
      block.column = this.column;
    },

    moveOverAfter() {}
  };

  return ground;
}
