import $ from 'jquery';
import groundFactory from './ground';

export default flagFactory;

const id = 2;
function flagFactory(line, column) {
  const ground = groundFactory(line, column);
  const flag = {
    id,
    image: 'assets/images/flag.png',
    line,
    column,

    moveOverAfter(block) {
      $(document).trigger('win');
    }
  };

  return Object.assign(
    {},
    ground,
    flag
  );
}
flagFactory.id = id;
