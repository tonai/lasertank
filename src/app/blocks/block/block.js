import blockSettings from '../../settings/blockSettings';
import cannotMoveOverFactory from '../cannotMoveOver/cannotMoveOver';
import cannotShootThroughFactory from '../cannotShootThrough/cannotShootThrough';

function blockFactory(line, column) {
  const cannotMoveOver = cannotMoveOverFactory(line, column);
  const cannotShootThrough = cannotShootThroughFactory(line, column);
  const block = {
    line,
    column,
    id: blockSettings.block,
    image: 'assets/images/block.png',

    cannotShootThrough() {
      return false;
    }
  };

  return Object.assign(
    {},
    cannotMoveOver,
    cannotShootThrough,
    block
  );
}

export default blockFactory;
