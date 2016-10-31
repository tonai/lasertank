import blockSettings from '../../settings/blockSettings';
import cannotMoveOverFactory from '../cannotMoveOver/cannotMoveOver';

function blockFactory(line, column) {
  const cannotMoveOver = cannotMoveOverFactory(line, column);
  const block = {
    line,
    column,
    id: blockSettings.block,
    image: 'assets/images/block.png',

    canShootThrough() {
      return false;
    }
  };

  return Object.assign(
    {},
    cannotMoveOver,
    block
  );
}

export default blockFactory;
