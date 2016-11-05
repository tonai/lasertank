import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';
import canShootThroughFactory from '../canShootThrough/canShootThrough';
import shooterFactory from '../shooter/shooter';
import moverFactory from '../mover/mover';
import rotatorFactory from '../rotator/rotator';

export default tankFactory;

/**
 * Tank block factory.
 *
 * @module blocks/tank
 */
function tankFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const canShootThrough = canShootThroughFactory(line, column);
  const shooter = shooterFactory(line, column);
  const mover = moverFactory(line, column);
  const rotator = rotatorFactory(line, column);
  const tank = {
    line,
    column,
    id: blockSettings.tank,
    image: 'assets/images/tank.png',

    /**
     * Function called before the shoot is drawn.
     *
     * @param {Object} block Shooter block.
     *
     * @returns {Array} List of points.
     */
    shootOverBefore(direction) {
      return [];
    }
  };

  return Object.assign(
    {},
    canMoveOver,
    canShootThrough,
    shooter,
    mover,
    rotator,
    tank
  );
}
