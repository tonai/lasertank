import mapFactory from '../../map';

export default canMoveOverFactory;

/**
 * Defines blocks for which mover block can move over.
 *
 * @module blocks/canMoveOver
 */
function canMoveOverFactory(line, column) {
  const canMoveOver = {
    line,
    column,
    map: mapFactory(),

    /**
     * Can mover block move over this block ?
     *
     * @returns {Boolean} Yes or no ?
     */
    canMoveOver() {
      return true;
    },

    /**
     * Function called before the block moves.
     *
     * @param {Object} block Mover block.
     */
    moveOverBefore(block) {
      this.map.itemsMap[block.line][block.column] = null;
      this.map.itemsMap[this.line][this.column] = block;
      block.line = this.line;
      block.column = this.column;
    },

    /**
     * Function called after the block move.
     *
     * @param {Object} block Mover block.
     */
    moveOverAfter(block) {}
  };

  return canMoveOver;
}
