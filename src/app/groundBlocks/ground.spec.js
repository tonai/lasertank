import groundFactory from './ground';

describe('groundFactory', () => {
  let ground;

  beforeEach(() => {
    const map = {
      itemsMap: [
        [{line: 0, column: 0}, null, null],
        [null, null, null],
        [null, null, null]
      ]
    };
    groundFactory.__set__('mapFactory', () => map);
    ground = groundFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a ground object', () => {
      expect(typeof ground).toEqual('object');
      expect(ground.line).toEqual(1);
      expect(ground.column).toEqual(2);
    });
  });

  describe('canMoveOver method', () => {
    it('should return true', () => {
      expect(ground.canMoveOver()).toEqual(true);
    });
  });

  describe('moveOverBefore method', () => {
    it('should return true', () => {
      const block = ground.map.itemsMap[0][0];
      ground.moveOverBefore(block);
      expect(ground.line).toEqual(1);
      expect(ground.column).toEqual(2);
      expect(block.line).toEqual(1);
      expect(block.column).toEqual(2);
      expect(ground.map.itemsMap[0][0]).toBe(null);
      expect(ground.map.itemsMap[1][2]).toBe(block);
    });
  });

  describe('moveOverAfter method', () => {
    it('should do nothing', () => {
      const block = ground.map.itemsMap[0][0];
      ground.moveOverAfter(block);
      expect(ground.line).toEqual(1);
      expect(ground.column).toEqual(2);
      expect(block.line).toEqual(0);
      expect(block.column).toEqual(0);
      expect(ground.map.itemsMap[0][0]).toBe(block);
      expect(ground.map.itemsMap[1][2]).toBe(null);
    });
  });

  describe('shootOverBefore method', () => {
    it('should return a list of point to draw (direction 37)', () => {
      const pointList = ground.shootOverBefore(37);
      expect(pointList.length).toEqual(29);
    });

    it('should return a list of point to draw (direction 38)', () => {
      const pointList = ground.shootOverBefore(38);
      expect(pointList.length).toEqual(29);
    });

    it('should return a list of point to draw (direction 39)', () => {
      const pointList = ground.shootOverBefore(39);
      expect(pointList.length).toEqual(29);
    });

    it('should return a list of point to draw (direction 40)', () => {
      const pointList = ground.shootOverBefore(40);
      expect(pointList.length).toEqual(29);
    });
  });

  describe('shootOverAfter method', () => {
    it('should return the next block coordinates (direction 37)', () => {
      const coordinates = ground.shootOverAfter(37);
      expect(coordinates).toEqual({column: 1, line: 1});
    });

    it('should return the next block coordinates (direction 38)', () => {
      const coordinates = ground.shootOverAfter(38);
      expect(coordinates).toEqual({column: 2, line: 0});
    });

    it('should return the next block coordinates (direction 39)', () => {
      const coordinates = ground.shootOverAfter(39);
      expect(coordinates).toEqual({column: 3, line: 1});
    });

    it('should return the next block coordinates (direction 40)', () => {
      const coordinates = ground.shootOverAfter(40);
      expect(coordinates).toEqual({column: 2, line: 2});
    });

    it('should not return the next block coordinates (bad direction)', () => {
      const coordinates = ground.shootOverAfter(36);
      expect(coordinates).toBeUndefined();
    });
  });
});
