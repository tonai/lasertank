import blockSettings from '../../settings/blockSettings';
import groundFactory from '../ground/ground';
import itemFactory from '../item/item';
import shooterFactory from '../shooter/shooter';
import moverFactory from '../mover/mover';
import rotatorFactory from '../rotator/rotator';

export default tankFactory;

function tankFactory(line, column) {
  const ground = groundFactory(line, column);
  const item = itemFactory(line, column);
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
    ground,
    item,
    shooter,
    mover,
    rotator,
    tank
  );
}
