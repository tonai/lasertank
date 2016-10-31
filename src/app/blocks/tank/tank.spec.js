import tankFactory from './tank';

const canMoveOverMethodSpy = jasmine.createSpy('canMoveOverMethod');
const canMoveOverFactorySpy = jasmine.createSpy('canMoveOverFactory').and.callFake(() => ({
  canMoveOverMethod: canMoveOverMethodSpy
}));
tankFactory.__set__('canMoveOverFactory', canMoveOverFactorySpy);

const canShootThroughMethodSpy = jasmine.createSpy('canShootThroughMethod');
const canShootThroughFactorySpy = jasmine.createSpy('canShootThroughFactory').and.callFake(() => ({
  canShootThroughMethod: canShootThroughMethodSpy
}));
tankFactory.__set__('canShootThroughFactory', canShootThroughFactorySpy);

const moverMethodSpy = jasmine.createSpy('moverMethod');
const moverFactorySpy = jasmine.createSpy('moverFactory').and.callFake(() => ({
  moverMethod: moverMethodSpy
}));
tankFactory.__set__('moverFactory', moverFactorySpy);

const rotatorMethodSpy = jasmine.createSpy('rotatorMethod');
const rotatorFactorySpy = jasmine.createSpy('rotatorFactory').and.callFake(() => ({
  rotatorMethod: rotatorMethodSpy
}));
tankFactory.__set__('rotatorFactory', rotatorFactorySpy);

describe('tankFactory', () => {
  let tank;

  beforeEach(() => {
    tank = tankFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return an tank object', () => {
      expect(typeof tank).toEqual('object');
      expect(tank.id).toBeDefined();
      expect(tank.image).toBeDefined();
      expect(tank.line).toEqual(1);
      expect(tank.column).toEqual(2);
    });

    it('should call the canMoveOver, mover and rotator factories', () => {
      expect(canMoveOverFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(canShootThroughFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(moverFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(rotatorFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call an canMoveOver method', () => {
      expect(tank.canMoveOverMethod).toBeDefined();
      tank.canMoveOverMethod('test');
      expect(canMoveOverMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a canShootThrough method', () => {
      expect(tank.canShootThroughMethod).toBeDefined();
      tank.canShootThroughMethod('test');
      expect(canShootThroughMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a mover method', () => {
      expect(tank.moverMethod).toBeDefined();
      tank.moverMethod('test');
      expect(moverMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a rotator method', () => {
      expect(tank.rotatorMethod).toBeDefined();
      tank.rotatorMethod('test');
      expect(rotatorMethodSpy).toHaveBeenCalledWith('test');
    });
  });

  describe('shootOverBefore method', () => {
    it('should return a list point to be drawn', () => {
      const pointList = tank.shootOverBefore();
      expect(pointList).toEqual([]);
    });
  });
});
