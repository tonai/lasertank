export default cannotMoveOverFactory;

/**
 * Defines blocks for which mover block cannot move over.
 *
 * @module blocks/cannotMoveOver
 */
function cannotMoveOverFactory(line, column) {
  const cannotMoveOver = {
    line,
    column,

    /**
     * Can mover block move over this block ?
     *
     * @returns {Boolean} Yes or no ?
     */
    canMoveOver() {
      return false;
    }
  };

  return cannotMoveOver;
}
