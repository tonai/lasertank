import grassFactory from '../groundBlocks/grass';

export default itemFactory;

function itemFactory(line, column) {
  const item = {
    line,
    column,
    el: null,
    ground: grassFactory.id,

    canMoveOver() {
      return false;
    }
  };

  return item;
}
