import groundFactory from './ground';

export default grassFactory;

const id = 1;
function grassFactory(line, column) {
  const ground = groundFactory(line, column);
  const grass = {
    id,
    image: 'assets/images/grass.png',
    line,
    column
  };

  return Object.assign(
    {},
    ground,
    grass
  );
}
grassFactory.id = id;
