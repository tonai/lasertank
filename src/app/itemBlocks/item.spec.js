import itemFactory from './item';

itemFactory.__set__('grassFactory', {id: 1});

describe('itemFactory', () => {
  let item;

  beforeEach(() => {
    item = itemFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return an item object', () => {
      expect(typeof item).toEqual('object');
      expect(item.ground).toEqual(1);
      expect(item.line).toEqual(1);
      expect(item.column).toEqual(2);
    });
  });

  describe('canMoveOver method', () => {
    it('should return true', () => {
      expect(item.canMoveOver()).toEqual(false);
    });
  });
});
