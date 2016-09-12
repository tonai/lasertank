import map from './map';

map.init();
const player = map.player;

if (player) {
  document.addEventListener('keydown', keydownCallback);
  document.addEventListener('win', winCallback);
}

function keydownCallback(event) {
  const direction = event.keyCode;

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
}

function winCallback() {
  console.log('You win !');
  document.removeEventListener('keydown', keydownCallback);
  document.removeEventListener('win', winCallback);
}
