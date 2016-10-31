import flagFactory from './flag';

const canMoveOverMethodSpy = jasmine.createSpy('canMoveOverMethod');
const canMoveOverFactorySpy = jasmine.createSpy('canMoveOverFactory').and.callFake(() => ({
  canMoveOverMethod: canMoveOverMethodSpy
}));
flagFactory.__set__('canMoveOverFactory', canMoveOverFactorySpy);

describe('flagFactory', () => {
  let flag;

  beforeEach(() => {
    flag = flagFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return an flag object', () => {
      expect(typeof flag).toEqual('object');
      expect(flag.id).toBeDefined();
      expect(flag.image).toBeDefined();
      expect(flag.line).toEqual(1);
      expect(flag.column).toEqual(2);
    });

    it('should call the canMoveOver factory', () => {
      expect(canMoveOverFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a canMoveOver method', () => {
      expect(flag.canMoveOverMethod).toBeDefined();
      flag.canMoveOverMethod('test');
      expect(canMoveOverMethodSpy).toHaveBeenCalledWith('test');
    });
  });

  describe('moveOverAfter method', () => {
    it('should dispatch the "win" event', () => {
      const spy = jasmine.createSpy('win');
      document.addEventListener('win', spy);
      flag.moveOverAfter();
      expect(spy).toHaveBeenCalled();
    });
  });
});
