export default cannotShootThroughFactory;

function cannotShootThroughFactory(line, column) {
  const cannotShootThrough = {
    line,
    column,

    canShootThrough() {
      return false;
    }
  };

  return cannotShootThrough;
}
