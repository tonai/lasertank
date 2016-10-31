import blockFactory from './block';

const cannotMoveOverMethodSpy = jasmine.createSpy('cannotMoveOverMethod');
const cannotMoveOverFactorySpy = jasmine.createSpy('cannotMoveOverFactory').and.callFake(() => ({
  cannotMoveOverMethod: cannotMoveOverMethodSpy
}));
blockFactory.__set__('cannotMoveOverFactory', cannotMoveOverFactorySpy);

const cannotShootThroughMethodSpy = jasmine.createSpy('cannotShootThroughMethod');
const cannotShootThroughFactorySpy = jasmine.createSpy('cannotShootThroughFactory').and.callFake(() => ({
  cannotShootThroughMethod: cannotShootThroughMethodSpy
}));
blockFactory.__set__('cannotShootThroughFactory', cannotShootThroughFactorySpy);

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

    it('should call the canMoveOver and cannotShootThrough factory', () => {
      expect(cannotMoveOverFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(cannotShootThroughFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a canMoveOver method', () => {
      expect(block.cannotMoveOverMethod).toBeDefined();
      block.cannotMoveOverMethod('test');
      expect(cannotMoveOverMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a cannotShootThrough method', () => {
      expect(block.cannotShootThroughMethod).toBeDefined();
      block.cannotShootThroughMethod('test');
      expect(cannotShootThroughMethodSpy).toHaveBeenCalledWith('test');
    });
  });

  describe('cannotShootThrough method', () => {
    it('should return false', () => {
      expect(block.cannotShootThrough()).toEqual(false);
    });
  });
});
