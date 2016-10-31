import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';
import shooterFactory from '../shooter/shooter';
import moverFactory from '../mover/mover';
import rotatorFactory from '../rotator/rotator';

export default tankFactory;

function tankFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const shooter = shooterFactory(line, column);
  const mover = moverFactory(line, column);
  const rotator = rotatorFactory(line, column);
  const tank = {
    line,
    column,
    id: blockSettings.tank,
    image: 'assets/images/tank.png',

    shootOverBefore(direction) {
      return [];
    }
  };

  return Object.assign(
    {},
    canMoveOver,
    shooter,
    mover,
    rotator,
    tank
  );
}
