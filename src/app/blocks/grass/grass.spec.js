import grassFactory from './grass';

const groundMethodSpy = jasmine.createSpy('groundMethod');
const groundFactorySpy = jasmine.createSpy('groundFactory').and.callFake(() => ({
  groundMethod: groundMethodSpy
}));
grassFactory.__set__('groundFactory', groundFactorySpy);

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

    it('should call the ground factory', () => {
      expect(groundFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call a ground method', () => {
      expect(grass.groundMethod).toBeDefined();
      grass.groundMethod('test');
      expect(groundMethodSpy).toHaveBeenCalledWith('test');
    });
  });
});
