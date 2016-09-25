import itemFactory from './item';
import shooterFactory from './shooter';
import movableFactory from './movable';
import rotableFactory from './rotable';

export default tankFactory;

const id = 0;
function tankFactory(line, column) {
  const item = itemFactory(line, column);
  const shooter = shooterFactory(line, column);
  const movable = movableFactory(line, column);
  const rotable = rotableFactory(line, column);
  const tank = {
    line,
    column,
    id,
    image: 'assets/images/tank.png',

    shootOverBefore(direction) {
      return [];
    },

    shootOverAfter(direction) {
      switch (direction) {
        case 37:
          return {column: this.column - 1, line: this.line};

        case 38:
          return {column: this.column, line: this.line - 1};

        case 39:
          return {column: this.column + 1, line: this.line};

        case 40:
          return {column: this.column, line: this.line + 1};

        default:
      }
    }
  };

  return Object.assign(
    {},
    item,
    shooter,
    movable,
    rotable,
    tank
  );
}
tankFactory.id = id;
