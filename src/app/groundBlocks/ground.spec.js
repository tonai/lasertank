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
});
