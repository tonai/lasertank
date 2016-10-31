import cannotShootThroughFactory from './cannotShootThrough';

describe('cannotShootThroughFactory', () => {
  let cannotShootThrough;

  beforeEach(() => {
    cannotShootThrough = cannotShootThroughFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a cannotShootThrough object', () => {
      expect(typeof cannotShootThrough).toEqual('object');
      expect(cannotShootThrough.line).toEqual(1);
      expect(cannotShootThrough.column).toEqual(2);
    });
  });

  describe('cannotShootThrough method', () => {
    it('should return false', () => {
      expect(cannotShootThrough.canShootThrough()).toEqual(false);
    });
  });
});
