import itemFactory from './item';
import movableFactory from './movable';
import rotableFactory from './rotable';

export default tankFactory;

const id = 0;
function tankFactory(line, column) {
  const item = itemFactory(line, column);
  const movable = movableFactory(line, column);
  const rotable = rotableFactory(line, column);
  const tank = {
    id,
    image: 'assets/images/tank.png',
    line,
    column
  };

  return Object.assign(
    {},
    item,
    movable,
    rotable,
    tank
  );
}
tankFactory.id = id;
