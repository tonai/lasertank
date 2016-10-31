import blockFactory from './block';

describe('blockFactory', () => {
  let block;

  beforeEach(() => {
    block = blockFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return an block object', () => {
      expect(typeof block).toEqual('object');
      expect(block.id).toBeDefined();
      expect(block.image).toBeDefined();
      expect(block.line).toEqual(1);
      expect(block.column).toEqual(2);
    });
  });

  describe('canMoveOver method', () => {
    it('should return false', () => {
      expect(block.canMoveOver()).toEqual(false);
    });
  });

  describe('canShootThrough method', () => {
    it('should return false', () => {
      expect(block.canShootThrough()).toEqual(false);
    });
  });
});
