export default cannotShootThroughFactory;

/**
 * Defines blocks for which mover shooter cannot shoot through.
 *
 * @module blocks/cannotShootThrough
 */
function cannotShootThroughFactory(line, column) {
  const cannotShootThrough = {
    line,
    column,

    /**
     * Can shooter block shoot through this block ?
     *
     * @returns {Boolean} Yes or no ?
     */
    canShootThrough() {
      return false;
    }
  };

  return cannotShootThrough;
}
