import mapSave from './maps/map';
import mapTmpl from './map.ejs';
import blocksFactory from './blocks';
import tankFactory from './itemBlocks/tank';
import './map.scss';

const map = {
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
            if (block.id === tankFactory.id) {
              this.player = block;
            }
            if (block.ground) {
              this.itemsMap[x].push(block);
              this.groundMap[x].push(this.blocks[block.ground](x, y));
            } else {
              this.itemsMap[x].push(null);
              this.groundMap[x].push(block);
            }
          });
      });

    this.totalColumns = this.groundMap[0].length;
    this.totaLines = this.groundMap.length;
  },

  draw(gameEl) {
    gameEl.innerHTML = mapTmpl({
      ground: this.groundMap,
      items: this.itemsMap
    });

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

  getBlock(line, column) {
    return this.itemsMap[line][column] ?
      this.itemsMap[line][column] :
      this.groundMap[line][column];
  }
};

export default function () {
  return map;
}
