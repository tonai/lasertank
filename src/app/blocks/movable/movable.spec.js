import movableFactory from './movable';

const groundBlock = jasmine.createSpyObj('groundBlock', ['canMoveOver', 'moveOverBefore', 'moveOverAfter']);
const map = {
  getBlock: jasmine.createSpy('getBlock').and.callFake(() => groundBlock)
};

movableFactory.__set__('mapFactory', () => map);

describe('movableFactory', () => {
  let movable;

  beforeEach(() => {
    movable = movableFactory(1, 2);
    groundBlock.canMoveOver.calls.reset();
    groundBlock.moveOverBefore.calls.reset();
    groundBlock.moveOverAfter.calls.reset();
    map.getBlock.calls.reset();
  });

  describe('initialization', () => {
    it('should return a movable object', () => {
      expect(typeof movable).toEqual('object');
      expect(movable.line).toEqual(1);
      expect(movable.column).toEqual(2);
    });
  });

  describe('move method', () => {
    it('should move the block when canMoveOver returns true', () => {
      groundBlock.canMoveOver.and.callFake(() => true);
      movable.el = {style: {left: '', right: ''}};
      movable.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(groundBlock.canMoveOver).toHaveBeenCalled();
      expect(groundBlock.moveOverBefore).toHaveBeenCalledWith(movable);
      expect(groundBlock.moveOverAfter).toHaveBeenCalledWith(movable);
    });

    it('should not move the block when canMoveOver returns false', () => {
      groundBlock.canMoveOver.and.callFake(() => false);
      movable.el = {style: {left: '', right: ''}};
      movable.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(groundBlock.canMoveOver).toHaveBeenCalled();
      expect(groundBlock.moveOverBefore).not.toHaveBeenCalled();
      expect(groundBlock.moveOverAfter).not.toHaveBeenCalled();
    });
  });
});
