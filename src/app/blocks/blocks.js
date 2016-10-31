import blockSettings from '../settings/blockSettings';
import tankFactory from './tank/tank';
import grassFactory from './grass/grass';
import flagFactory from './flag/flag';

export default function () {
  return {
    [blockSettings.tank]: tankFactory,
    [blockSettings.grass]: grassFactory,
    [blockSettings.flag]: flagFactory
  };
}
