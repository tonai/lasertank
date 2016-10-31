import moverFactory from './mover';

const groundBlock = jasmine.createSpyObj('groundBlock', ['canMoveOver', 'moveOverBefore', 'moveOverAfter']);
const map = {
  getBlock: jasmine.createSpy('getBlock').and.callFake(() => groundBlock)
};

moverFactory.__set__('mapFactory', () => map);

describe('moverFactory', () => {
  let mover;

  beforeEach(() => {
    mover = moverFactory(1, 2);
    groundBlock.canMoveOver.calls.reset();
    groundBlock.moveOverBefore.calls.reset();
    groundBlock.moveOverAfter.calls.reset();
    map.getBlock.calls.reset();
  });

  describe('initialization', () => {
    it('should return a mover object', () => {
      expect(typeof mover).toEqual('object');
      expect(mover.line).toEqual(1);
      expect(mover.column).toEqual(2);
    });
  });

  describe('move method', () => {
    it('should move the block when canMoveOver returns true', () => {
      groundBlock.canMoveOver.and.callFake(() => true);
      mover.el = {style: {left: '', right: ''}};
      mover.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(groundBlock.canMoveOver).toHaveBeenCalled();
      expect(groundBlock.moveOverBefore).toHaveBeenCalledWith(mover);
      expect(groundBlock.moveOverAfter).toHaveBeenCalledWith(mover);
    });

    it('should not move the block when canMoveOver returns false', () => {
      groundBlock.canMoveOver.and.callFake(() => false);
      mover.el = {style: {left: '', right: ''}};
      mover.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(groundBlock.canMoveOver).toHaveBeenCalled();
      expect(groundBlock.moveOverBefore).not.toHaveBeenCalled();
      expect(groundBlock.moveOverAfter).not.toHaveBeenCalled();
    });
  });
});
