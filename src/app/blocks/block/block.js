import blockSettings from '../../settings/blockSettings';

function grassFactory(line, column) {
  const block = {
    line,
    column,
    id: blockSettings.block,
    image: 'assets/images/block.png',

    canMoveOver() {
      return false;
    },

    canShootThrough() {
      return false;
    }
  };

  return Object.assign(
    {},
    block
  );
}

export default grassFactory;
