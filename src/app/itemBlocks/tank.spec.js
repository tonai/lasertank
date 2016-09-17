import tankFactory from './tank';

const itemMethodSpy = jasmine.createSpy('itemMethod');
const itemFactorySpy = jasmine.createSpy('itemFactory').and.callFake(() => ({
  itemMethod: itemMethodSpy
}));
const movableMethodSpy = jasmine.createSpy('movableMethod');
const movableFactorySpy = jasmine.createSpy('movableFactory').and.callFake(() => ({
  movableMethod: movableMethodSpy
}));
const rotableMethodSpy = jasmine.createSpy('rotableMethod');
const rotableFactorySpy = jasmine.createSpy('rotableFactory').and.callFake(() => ({
  rotableMethod: rotableMethodSpy
}));
tankFactory.__set__('itemFactory', itemFactorySpy);
tankFactory.__set__('movableFactory', movableFactorySpy);
tankFactory.__set__('rotableFactory', rotableFactorySpy);

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

    it('should call the item, movable and rotable factories', () => {
      expect(itemFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(movableFactorySpy).toHaveBeenCalledWith(1, 2);
      expect(rotableFactorySpy).toHaveBeenCalledWith(1, 2);
    });

    it('should call an item method', () => {
      expect(tank.itemMethod).toBeDefined();
      tank.itemMethod('test');
      expect(itemMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a movable method', () => {
      expect(tank.movableMethod).toBeDefined();
      tank.movableMethod('test');
      expect(movableMethodSpy).toHaveBeenCalledWith('test');
    });

    it('should call a rotable method', () => {
      expect(tank.rotableMethod).toBeDefined();
      tank.rotableMethod('test');
      expect(rotableMethodSpy).toHaveBeenCalledWith('test');
    });
  });
});