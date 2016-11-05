import blockSettings from '../settings/blockSettings';
import tankFactory from './tank/tank';
import grassFactory from './grass/grass';
import flagFactory from './flag/flag';
import blockFactory from './block/block';

export default blocksFactory;

/**
 * Module exporting all "real" block factories.
 *
 * @module blocks/blocks
 */
function blocksFactory() {
  return {
    [blockSettings.tank]: tankFactory,
    [blockSettings.grass]: grassFactory,
    [blockSettings.flag]: flagFactory,
    [blockSettings.block]: blockFactory
  };
}
