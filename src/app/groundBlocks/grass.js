import groundFactory from './ground';

const id = 1;
function grassFactory(line, column) {
  const ground = groundFactory(line, column);
  const grass = {
    line,
    column,
    id,
    image: 'assets/images/grass.png'
  };

  return Object.assign(
    {},
    ground,
    grass
  );
}
grassFactory.id = id;

export default grassFactory;
