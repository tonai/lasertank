import blockSettings from '../../settings/blockSettings';
import canMoveOverFactory from '../canMoveOver/canMoveOver';

export default flagFactory;

function flagFactory(line, column) {
  const canMoveOver = canMoveOverFactory(line, column);
  const flag = {
    line,
    column,
    id: blockSettings.flag,
    image: 'assets/images/flag.png',

    moveOverAfter(block) {
      document.dispatchEvent(new Event('win'));
    }
  };

  return Object.assign(
    {},
    canMoveOver,
    flag
  );
}
