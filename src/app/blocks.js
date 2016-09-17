import tankFactory from './itemBlocks/tank';
import grassFactory from './groundBlocks/grass';
import flagFactory from './groundBlocks/flag';

export default function () {
  return {
    [tankFactory.id]: tankFactory,
    [grassFactory.id]: grassFactory,
    [flagFactory.id]: flagFactory
  };
}
