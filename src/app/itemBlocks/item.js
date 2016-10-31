import blockSettings from '../settings/blockSettings';

export default itemFactory;

function itemFactory(line, column) {
  const item = {
    line,
    column,
    el: null,
    ground: blockSettings.grass,

    canMoveOver() {
      return false;
    }
  };

  return item;
}
