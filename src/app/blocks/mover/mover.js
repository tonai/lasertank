import blockSettings from '../../settings/blockSettings';
import themeSettings from '../../settings/themeSettings';
import mapFactory from '../../map';

export default moverFactory;

function moverFactory(line, column) {
  const mover = {
    line,
    column,
    el: null,
    ground: blockSettings.grass,
    map: mapFactory(),

    move(linePos, columnPos) {
      const groundBlock = this.map.getBlock(linePos, columnPos);
      if (groundBlock && groundBlock.canMoveOver()) {
        groundBlock.moveOverBefore(this);
        animate(this);
        groundBlock.moveOverAfter(this);
      }
    }
  };

  function animate(block) {
    block.el.style.left = `${block.column * themeSettings.width}px`;
    block.el.style.top = `${block.line * themeSettings.width}px`;
  }

  return mover;
}
