import $ from 'jquery';
import map from './map';

map.init();
const player = map.player;

if (player) {
  const $document = $(document);
  $document
    .on('keydown.game', event => {
      const direction = event.originalEvent.keyCode;

      if (direction === player.direction) {
        switch (direction) {
          case 37: // left
            if (player.column > 0) {
              if (map.getBlock(player.line, player.column - 1).canMoveOver()) {
                player.move(player.line, player.column - 1);
              }
            }
            break;

          case 38: // top
            if (player.line > 0) {
              if (map.getBlock(player.line - 1, player.column).canMoveOver()) {
                player.move(player.line - 1, player.column);
              }
            }
            break;

          case 39: // right
            if (player.column < map.totaLines - 1) {
              if (map.getBlock(player.line, player.column + 1).canMoveOver()) {
                player.move(player.line, player.column + 1);
              }
            }
            break;

          case 40: // bottom
            if (player.line < map.totalColumns - 1) {
              if (map.getBlock(player.line + 1, player.column).canMoveOver()) {
                player.move(player.line + 1, player.column);
              }
            }
            break;

          default:
        }
      } else {
        player.rotate(direction);
      }
    })
    .on('win.game', () => {
      console.log('You win !');
      $document.off('.game');
    });
}
