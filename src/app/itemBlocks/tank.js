import blockSettings from '../settings/blockSettings';
import groundFactory from '../groundBlocks/ground';
import itemFactory from './item';
import shooterFactory from './shooter';
import movableFactory from './movable';
import rotableFactory from './rotable';

export default tankFactory;

function tankFactory(line, column) {
  const ground = groundFactory(line, column);
  const item = itemFactory(line, column);
  const shooter = shooterFactory(line, column);
  const movable = movableFactory(line, column);
  const rotable = rotableFactory(line, column);
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
    movable,
    rotable,
    tank
  );
}
