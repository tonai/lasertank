import themeSettings from '../../settings/themeSettings';
import canMoveOverFactory from './canMoveOver';

describe('canMoveOverFactory', () => {
  let canMoveOver;

  beforeEach(() => {
    const map = {
      itemsMap: [
        [{line: 0, column: 0}, null, null],
        [null, null, null],
        [null, null, null]
      ]
    };
    canMoveOverFactory.__set__('mapFactory', () => map);
    canMoveOver = canMoveOverFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a canMoveOver object', () => {
      expect(typeof canMoveOver).toEqual('object');
      expect(canMoveOver.line).toEqual(1);
      expect(canMoveOver.column).toEqual(2);
    });
  });

  describe('canMoveOver method', () => {
    it('should return true', () => {
      expect(canMoveOver.canMoveOver()).toEqual(true);
    });
  });

  describe('moveOverBefore method', () => {
    it('should return true', () => {
      const block = canMoveOver.map.itemsMap[0][0];
      canMoveOver.moveOverBefore(block);
      expect(canMoveOver.line).toEqual(1);
      expect(canMoveOver.column).toEqual(2);
      expect(block.line).toEqual(1);
      expect(block.column).toEqual(2);
      expect(canMoveOver.map.itemsMap[0][0]).toBe(null);
      expect(canMoveOver.map.itemsMap[1][2]).toBe(block);
    });
  });

  describe('moveOverAfter method', () => {
    it('should do nothing', () => {
      const block = canMoveOver.map.itemsMap[0][0];
      canMoveOver.moveOverAfter(block);
      expect(canMoveOver.line).toEqual(1);
      expect(canMoveOver.column).toEqual(2);
      expect(block.line).toEqual(0);
      expect(block.column).toEqual(0);
      expect(canMoveOver.map.itemsMap[0][0]).toBe(block);
      expect(canMoveOver.map.itemsMap[1][2]).toBe(null);
    });
  });

  describe('canShootThrough method', () => {
    it('should return true', () => {
      expect(canMoveOver.canShootThrough()).toEqual(true);
    });
  });

  describe('shootOverBefore method', () => {
    it('should return a list of point to draw (direction 37)', () => {
      const pointList = canMoveOver.shootOverBefore(37);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 38)', () => {
      const pointList = canMoveOver.shootOverBefore(38);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 39)', () => {
      const pointList = canMoveOver.shootOverBefore(39);
      expect(pointList.length).toEqual(themeSettings.width);
    });

    it('should return a list of point to draw (direction 40)', () => {
      const pointList = canMoveOver.shootOverBefore(40);
      expect(pointList.length).toEqual(themeSettings.width);
    });
  });

  describe('shootOverAfter method', () => {
    it('should return the next block coordinates (direction 37)', () => {
      const coordinates = canMoveOver.shootOverAfter(37);
      expect(coordinates).toEqual({column: 1, line: 1});
    });

    it('should return the next block coordinates (direction 38)', () => {
      const coordinates = canMoveOver.shootOverAfter(38);
      expect(coordinates).toEqual({column: 2, line: 0});
    });

    it('should return the next block coordinates (direction 39)', () => {
      const coordinates = canMoveOver.shootOverAfter(39);
      expect(coordinates).toEqual({column: 3, line: 1});
    });

    it('should return the next block coordinates (direction 40)', () => {
      const coordinates = canMoveOver.shootOverAfter(40);
      expect(coordinates).toEqual({column: 2, line: 2});
    });

    it('should not return the next block coordinates (bad direction)', () => {
      const coordinates = canMoveOver.shootOverAfter(36);
      expect(coordinates).toBeUndefined();
    });
  });
});
