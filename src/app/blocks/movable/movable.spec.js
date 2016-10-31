import movableFactory from './movable';

const groundBlock = jasmine.createSpyObj('groundBlock', ['moveOverBefore', 'moveOverAfter']);
const map = {
  getBlock: jasmine.createSpy('getBlock').and.callFake(() => groundBlock)
};

movableFactory.__set__('mapFactory', () => map);

describe('movableFactory', () => {
  let movable;

  beforeEach(() => {
    movable = movableFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a movable object', () => {
      expect(typeof movable).toEqual('object');
      expect(movable.line).toEqual(1);
      expect(movable.column).toEqual(2);
    });
  });

  describe('move method', () => {
    it('should move the block', () => {
      movable.el = {style: {left: '', right: ''}};
      movable.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(groundBlock.moveOverBefore).toHaveBeenCalledWith(movable);
      expect(groundBlock.moveOverAfter).toHaveBeenCalledWith(movable);
    });
  });
});
