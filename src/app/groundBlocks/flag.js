import blockSettings from '../settings/blockSettings';
import groundFactory from './ground';

export default flagFactory;

function flagFactory(line, column) {
  const ground = groundFactory(line, column);
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
    ground,
    flag
  );
}
