import cannotMoveOverFactory from './cannotMoveOver';

describe('cannotMoveOverFactory', () => {
  let cannotMoveOver;

  beforeEach(() => {
    cannotMoveOver = cannotMoveOverFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a cannotMoveOver object', () => {
      expect(typeof cannotMoveOver).toEqual('object');
      expect(cannotMoveOver.line).toEqual(1);
      expect(cannotMoveOver.column).toEqual(2);
    });
  });

  describe('cannotMoveOver method', () => {
    it('should return false', () => {
      expect(cannotMoveOver.canMoveOver()).toEqual(false);
    });
  });
});
