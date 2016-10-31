import blockSettings from '../../settings/blockSettings';

export default rotatorFactory;

function rotatorFactory(line, column) {
  const rotator = {
    line,
    column,
    el: null,
    ground: blockSettings.grass,
    direction: 38,
    angle: 0,

    rotate(direction) {
      if (direction >= 37 && direction <= 40) {
        if (direction === 37 && this.direction === 40) {
          this.angle += 90;
        } else if (direction === 40 && this.direction === 37) {
          this.angle -= 90;
        } else {
          this.angle += (direction - this.direction) * 90;
        }
        this.direction = direction;
        animate(this);
      } else if (direction === true || direction === false) {
        if (direction === true) {
          this.angle += 90;
          this.direction++;
        } else {
          this.angle -= 90;
          this.direction--;
        }
        if (this.direction === 41) {
          this.direction = 37;
        } else if (this.direction === 36) {
          this.direction = 40;
        }
        animate(this);
      }
    }
  };

  function animate(block) {
    block.el.style.transform = `rotateZ(${block.angle}deg)`;
  }

  return rotator;
}
