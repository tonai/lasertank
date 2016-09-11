import map from '../map';

export default movableFactory;

function movableFactory(line, column) {
  const movable = {
    move(linePos, columnPos) {
      const groundBlock = map.getBlock(linePos, columnPos);
      groundBlock.moveOverBefore(this);
      animate(this);
      groundBlock.moveOverAfter(this);
    }
  };

  function animate(block) {
    block.$el.css({
      left: `${block.column * 29}px`,
      top: `${block.line * 29}px`
    });
  }

  return movable;
}
