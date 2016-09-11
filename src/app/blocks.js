import tankFactory from './itemBlocks/tank';
import grassFactory from './groundBlocks/grass';
import flagFactory from './groundBlocks/flag';

export default {
  [tankFactory.id]: tankFactory,
  [grassFactory.id]: grassFactory,
  [flagFactory.id]: flagFactory
};
