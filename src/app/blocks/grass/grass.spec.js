import grassFactory from './grass';

const canMoveOverMethodSpy = jasmine.createSpy('canMoveOverMethod');
const canMoveOverFactorySpy = jasmine.createSpy('canMoveOverFactory').and.callFake(() => ({
  canMoveOverMethod: canMoveOverMethodSpy
}));
grassFactory.__set__('canMoveOverFactory', canMoveOverFactorySpy);

describe('grassFactory', () => {
  let grass;

  beforeEach(() => {
    grass = grassFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return an grass object', () => {
      expect(typeof grass).toEqual('object');
      expect(grass.id).toBeDefined();
      expect(grass.image).toBeDefined();
      expect(grass.line).toEqual(1);
      expect(grass.column).toEqual(2);
    });

    it('should call the canMoveOver factory', () => {
      expect(canMoveOverFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a canMoveOver method', () => {
      expect(grass.canMoveOverMethod).toBeDefined();
      grass.canMoveOverMethod('test');
      expect(canMoveOverMethodSpy).toHaveBeenCalledWith('test');
    });
  });
});
