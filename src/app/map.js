
import map from './maps/map';
import mapTmpl from './map.ejs';
import blocks from './blocks';
import tankFactory from './itemBlocks/tank';
import './map.scss';

export default {
  init() {
    this.groundMap = [];
    this.itemsMap = [];

    map
      .forEach((line, x) => {
        this.groundMap.push([]);
        this.itemsMap.push([]);
        line
          .forEach((cell, y) => {
            const block = blocks[cell](x, y);
            if (block.id === tankFactory.id) {
              this.player = block;
            }
            if (block.ground) {
              this.itemsMap[x].push(block);
              this.groundMap[x].push(blocks[block.ground](x, y));
            } else {
              this.itemsMap[x].push(null);
              this.groundMap[x].push(block);
            }
          });
      });

    this.totalColumns = this.groundMap[0].length;
    this.totaLines = this.groundMap.length;

    this.draw();
  },

  draw() {
    const gameEl = document.getElementById('game');
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
