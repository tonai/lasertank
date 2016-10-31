export default cannotMoveOverFactory;

function cannotMoveOverFactory(line, column) {
  const cannotMoveOver = {
    line,
    column,

    canMoveOver() {
      return false;
    }
  };

  return cannotMoveOver;
}
