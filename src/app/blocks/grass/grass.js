import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';
import canShootThroughFactory from '../canShootThrough/canShootThrough';

function grassFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const canShootThrough = canShootThroughFactory(line, column);
  const grass = {
    line,
    column,
    id: blockSettings.grass,
    image: 'assets/images/grass.png'
  };

  return Object.assign(
    {},
    canMoveOver,
    canShootThrough,
    grass
  );
}

export default grassFactory;
