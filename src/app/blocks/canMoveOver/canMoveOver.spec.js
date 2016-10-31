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
});
