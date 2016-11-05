import blockSettings from '../../settings/blockSettings';
import themeSettings from '../../settings/themeSettings';
import mapFactory from '../../map';

export default moverFactory;

/**
 * Defines blocks that can move.
 *
 * @module blocks/mover
 */
function moverFactory(line, column) {
  const mover = {
    line,
    column,
    el: null,
    ground: blockSettings.grass,
    map: mapFactory(),

    /**
     * Moves the mover block.
     *
     * @param {Number} linePos Destination line position.
     * @param {Number} columnPos Destination column position.
     */
    move(linePos, columnPos) {
      const groundBlock = this.map.getBlock(linePos, columnPos);
      if (groundBlock && groundBlock.canMoveOver()) {
        groundBlock.moveOverBefore(this);
        animate(this);
        groundBlock.moveOverAfter(this);
      }
    }
  };

  /**
   * Animate the mover block.
   *
   * @param {Object} block Mover block.
   */
  function animate(block) {
    block.el.style.left = `${block.column * themeSettings.width}px`;
    block.el.style.top = `${block.line * themeSettings.width}px`;
  }

  return mover;
}
