import blockSettings from '../../settings/blockSettings';
import groundFactory from '../ground/ground';

function grassFactory(line, column) {
  const ground = groundFactory(line, column);
  const grass = {
    line,
    column,
    id: blockSettings.grass,
    image: 'assets/images/grass.png'
  };

  return Object.assign(
    {},
    ground,
    grass
  );
}

export default grassFactory;
