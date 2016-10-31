import blockSettings from './settings/blockSettings';
import tankFactory from './itemBlocks/tank';
import grassFactory from './groundBlocks/grass';
import flagFactory from './groundBlocks/flag';

export default function () {
  return {
    [blockSettings.tank]: tankFactory,
    [blockSettings.grass]: grassFactory,
    [blockSettings.flag]: flagFactory
  };
}
