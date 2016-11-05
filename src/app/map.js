import blockSettings from './settings/blockSettings';
import themeSettings from './settings/themeSettings';
import mapSave from './maps/map';
import mapTmpl from './map.ejs';
import blocksFactory from './blocks/blocks';
import './map.scss';

export default mapFactory;

/**
 * map singleton.
 */
const map = {
  /**
   * Initialize the map.
   */
  init() {
    this.blocks = blocksFactory();
    this.groundMap = [];
    this.itemsMap = [];

    mapSave
      .forEach((line, x) => {
        this.groundMap.push([]);
        this.itemsMap.push([]);
        line
          .forEach((cell, y) => {
            const block = this.blocks[cell](x, y);
            if (block.id === blockSettings.tank) {
              this.player = block;
            }
            if (typeof block.ground === 'undefined') {
              this.itemsMap[x].push(null);
              this.groundMap[x].push(block);
            } else {
              this.itemsMap[x].push(block);
              this.groundMap[x].push(this.blocks[block.ground](x, y));
            }
          });
      });

    this.totalColumns = this.groundMap[0].length;
    this.totaLines = this.groundMap.length;
  },

  /**
   * Draw the map.
   *
   * @param {Node} gameEl game main DOM element.
   */
  draw(gameEl) {
    gameEl.innerHTML = mapTmpl({
      ground: this.groundMap,
      items: this.itemsMap,
      width: this.totalColumns * themeSettings.width,
      height: this.totaLines * themeSettings.width
    });

    this.shootAreaEl = gameEl.querySelector('.js-shoot-area');
    this.shootAreaCtx = this.shootAreaEl.getContext('2d');
    this.shootAreaData = this.shootAreaCtx.getImageData(0, 0, this.shootAreaEl.width, this.shootAreaEl.height);

    this.itemsMap
      .forEach(line => {
        line
          .forEach(block => {
            if (block) {
              block.el = gameEl.querySelector(`.js-item-${block.line}-${block.column}`);
            }
          });
      });
  },

  /**
   * Get a block from coordinates.
   *
   * @param {Number} line Map line coordinate.
   * @param {Number} column Map column coordinate.
   * @returns {Object|Boolean} Item block if exists or ground block or false.
   */
  getBlock(line, column) {
    if (line < 0 || column < 0 || line > this.totaLines - 1 || column > this.totalColumns - 1) {
      return false;
    }
    return this.itemsMap[line][column] ?
      this.itemsMap[line][column] :
      this.groundMap[line][column];
  },

  /**
   * Draw a pixel in the canvas data.
   *
   * @param {Number} x x coordinate in the canvas.
   * @param {Number} y y coordinate in the canvas.
   */
  drawCanvasPixel(x, y, r, g, b, a) {
    const index = (x + y * this.shootAreaEl.width) * 4;
    this.shootAreaData.data[index + 0] = r;
    this.shootAreaData.data[index + 1] = g;
    this.shootAreaData.data[index + 2] = b;
    this.shootAreaData.data[index + 3] = a;
  },

  /**
   * Update the canvas display.
   */
  updateCanvas() {
    this.shootAreaCtx.putImageData(this.shootAreaData, 0, 0);
  },

  /**
   * Clear the canvas display.
   */
  clearCanvas() {
    this.shootAreaCtx.clearRect(0, 0, this.shootAreaEl.width, this.shootAreaEl.height);
    this.shootAreaData = this.shootAreaCtx.getImageData(0, 0, this.shootAreaEl.width, this.shootAreaEl.height);
  }
};

/**
 * Module managing the game map.
 *
 * @module map
 */
function mapFactory() {
  return map;
}
