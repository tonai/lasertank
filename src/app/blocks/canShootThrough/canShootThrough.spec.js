import themeSettings from '../../settings/themeSettings';
import canShootThroughFactory from './canShootThrough';

describe('canShootThroughFactory', () => {
  let canShootThrough;

  beforeEach(() => {
    const map = {
      itemsMap: [
        [{line: 0, column: 0}, null, null],
        [null, null, null],
        [null, null, null]
      ]
    };
    canShootThroughFactory.__set__('mapFactory', () => map);
    canShootThrough = canShootThroughFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a canShootThrough object', () => {
      expect(typeof canShootThrough).toEqual('object');
      expect(canShootThrough.line).toEqual(1);
      expect(canShootThrough.column).toEqual(2);
    });
  });

  describe('canShootThrough method', () => {
    it('should return true', () => {
      expect(canShootThrough.canShootThrough()).toEqual(true);
    });
  });

  describe('shootOverBefore method', () => {
    it('should return a list of point to draw (direction 37)', () => {
      const pointList = canShootThrough.shootOverBefore(37);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 38)', () => {
      const pointList = canShootThrough.shootOverBefore(38);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 39)', () => {
      const pointList = canShootThrough.shootOverBefore(39);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 40)', () => {
      const pointList = canShootThrough.shootOverBefore(40);
      expect(pointList.length).toEqual(themeSettings.width);
    });
  });

  describe('shootOverAfter method', () => {
    it('should return the next block coordinates (direction 37)', () => {
      const coordinates = canShootThrough.shootOverAfter(37);
      expect(coordinates).toEqual({column: 1, line: 1});
    });

    it('should return the next block coordinates (direction 38)', () => {
      const coordinates = canShootThrough.shootOverAfter(38);
      expect(coordinates).toEqual({column: 2, line: 0});
    });

    it('should return the next block coordinates (direction 39)', () => {
      const coordinates = canShootThrough.shootOverAfter(39);
      expect(coordinates).toEqual({column: 3, line: 1});
    });

    it('should return the next block coordinates (direction 40)', () => {
      const coordinates = canShootThrough.shootOverAfter(40);
      expect(coordinates).toEqual({column: 2, line: 2});
    });

    it('should not return the next block coordinates (bad direction)', () => {
      const coordinates = canShootThrough.shootOverAfter(36);
      expect(coordinates).toBeUndefined();
    });
  });
});
