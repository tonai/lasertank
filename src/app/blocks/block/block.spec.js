import blockFactory from './block';

const cannotMoveOverMethodSpy = jasmine.createSpy('cannotMoveOverMethod');
const cannotMoveOverFactorySpy = jasmine.createSpy('cannotMoveOverFactory').and.callFake(() => ({
  cannotMoveOverMethod: cannotMoveOverMethodSpy
}));
blockFactory.__set__('cannotMoveOverFactory', cannotMoveOverFactorySpy);

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

    it('should call the canMoveOver factory', () => {
      expect(cannotMoveOverFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a canMoveOver method', () => {
      expect(block.cannotMoveOverMethod).toBeDefined();
      block.cannotMoveOverMethod('test');
      expect(cannotMoveOverMethodSpy).toHaveBeenCalledWith('test');
    });
  });

  describe('canShootThrough method', () => {
    it('should return false', () => {
      expect(block.canShootThrough()).toEqual(false);
    });
  });
});
