import mapFactory from './map';

const game = {
  init() {
    this.map = mapFactory();
    this.map.init();
    this.map.draw(document.getElementById('game'));

    this.player = this.map.player;
    this.events = {};
    this.isPaused = false;

    if (this.player) {
      this.events.keydown = this.keydownCallback.bind(this);
      this.events.win = this.winCallback.bind(this);
      this.events.actionStart = () => (this.isPaused = true);
      this.events.actionEnd = () => (this.isPaused = false);
      Object
        .keys(this.events)
        .forEach(eventName => document.addEventListener(eventName, this.events[eventName]));
    }
  },

  keydownCallback(event) {
    if (this.isPaused) {
      return false;
    }

    const keyCode = event.keyCode;
    switch (keyCode) {
      case 32: // space bar
        this.player.shoot();
        break;

      case 37: // left
        if (keyCode === this.player.direction) {
          const block = this.map.getBlock(this.player.line, this.player.column - 1);
          if (block && block.canMoveOver()) {
            this.player.move(this.player.line, this.player.column - 1);
          }
        } else {
          this.player.rotate(keyCode);
        }
        break;

      case 38: // top
        if (keyCode === this.player.direction) {
          const block = this.map.getBlock(this.player.line - 1, this.player.column);
          if (block && block.canMoveOver()) {
            this.player.move(this.player.line - 1, this.player.column);
          }
        } else {
          this.player.rotate(keyCode);
        }
        break;

      case 39: // right
        if (keyCode === this.player.direction) {
          const block = this.map.getBlock(this.player.line, this.player.column + 1);
          if (block && block.canMoveOver()) {
            this.player.move(this.player.line, this.player.column + 1);
          }
        } else {
          this.player.rotate(keyCode);
        }
        break;

      case 40: // bottom
        if (keyCode === this.player.direction) {
          const block = this.map.getBlock(this.player.line + 1, this.player.column);
          if (block && block.canMoveOver()) {
            this.player.move(this.player.line + 1, this.player.column);
          }
        } else {
          this.player.rotate(keyCode);
        }
        break;

      default:
    }
  },

  winCallback() {
    console.log('You win !');
    Object
      .keys(this.events)
      .forEach(eventName => document.removeEventListener(eventName, this.events[eventName]));
  }
};

export default function () {
  return game;
}
