import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';
import canShootThroughFactory from '../canShootThrough/canShootThrough';

export default flagFactory;

/**
 * Flag block factory.
 *
 * @module blocks/flag
 */
function flagFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const canShootThrough = canShootThroughFactory(line, column);
  const flag = {
    line,
    column,
    id: blockSettings.flag,
    image: 'assets/images/flag.png',

    /**
     * Function called before the block moves.
     *
     * @param {Object} block Mover block.
     */
    moveOverAfter(block) {
      document.dispatchEvent(new Event('win'));
    }
  };

  return Object.assign(
    {},
    canMoveOver,
    canShootThrough,
    flag
  );
}
