import flagFactory from './flag';

const groundMethodSpy = jasmine.createSpy('groundMethod');
const groundFactorySpy = jasmine.createSpy('groundFactory').and.callFake(() => ({
  groundMethod: groundMethodSpy
}));
flagFactory.__set__('groundFactory', groundFactorySpy);

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

    it('should call the ground factory', () => {
      expect(groundFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a ground method', () => {
      expect(flag.groundMethod).toBeDefined();
      flag.groundMethod('test');
      expect(groundMethodSpy).toHaveBeenCalledWith('test');
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
