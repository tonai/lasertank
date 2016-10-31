import moverFactory from './mover';

const block = jasmine.createSpyObj('blockBlock', ['canMoveOver', 'moveOverBefore', 'moveOverAfter']);
const map = {
  getBlock: jasmine.createSpy('getBlock').and.callFake(() => block)
};

moverFactory.__set__('mapFactory', () => map);

describe('moverFactory', () => {
  let mover;

  beforeEach(() => {
    mover = moverFactory(1, 2);
    block.canMoveOver.calls.reset();
    block.moveOverBefore.calls.reset();
    block.moveOverAfter.calls.reset();
    map.getBlock.calls.reset();
  });

  describe('initialization', () => {
    it('should return a mover object', () => {
      expect(typeof mover).toEqual('object');
      expect(mover.line).toEqual(1);
      expect(mover.column).toEqual(2);
      expect(mover.el).toBeDefined();
      expect(mover.ground).toBeDefined();
    });
  });

  describe('move method', () => {
    it('should move the block when canMoveOver returns true', () => {
      block.canMoveOver.and.callFake(() => true);
      mover.el = {style: {left: '', right: ''}};
      mover.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(block.canMoveOver).toHaveBeenCalled();
      expect(block.moveOverBefore).toHaveBeenCalledWith(mover);
      expect(block.moveOverAfter).toHaveBeenCalledWith(mover);
    });

    it('should not move the block when canMoveOver returns false', () => {
      block.canMoveOver.and.callFake(() => false);
      mover.el = {style: {left: '', right: ''}};
      mover.move(1, 1);
      expect(map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(block.canMoveOver).toHaveBeenCalled();
      expect(block.moveOverBefore).not.toHaveBeenCalled();
      expect(block.moveOverAfter).not.toHaveBeenCalled();
    });
  });
});
