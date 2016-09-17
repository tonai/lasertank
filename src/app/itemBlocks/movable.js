import mapFactory from '../map';

export default movableFactory;

function movableFactory(line, column) {
  const movable = {
    line,
    column,
    map: mapFactory(),

    move(linePos, columnPos) {
      const groundBlock = this.map.getBlock(linePos, columnPos);
      groundBlock.moveOverBefore(this);
      animate(this);
      groundBlock.moveOverAfter(this);
    }
  };

  function animate(block) {
    block.el.style.left = `${block.column * 29}px`;
    block.el.style.top = `${block.line * 29}px`;
  }

  return movable;
}
