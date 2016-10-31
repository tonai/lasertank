import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';

function grassFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const grass = {
    line,
    column,
    id: blockSettings.grass,
    image: 'assets/images/grass.png'
  };

  return Object.assign(
    {},
    canMoveOver,
    grass
  );
}

export default grassFactory;
