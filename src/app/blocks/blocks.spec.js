import blocksFactory from './blocks';

describe('mapFactory', () => {
  describe('initialization', () => {
    it('should return all blocks', () => {
      const blocks = blocksFactory();
      expect(typeof blocks).toEqual('object');
      for (const i in blocks) {
        if (blocks.hasOwnProperty(i)) {
          expect(typeof blocks[i]).toEqual('function');
        }
      }
    });
  });
});
