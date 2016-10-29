import shooterFactory from './shooter';

describe('shooterFactory', () => {
  let shooter;

  beforeEach(() => {
    shooter = shooterFactory(1, 2);
    const map = {
      getBlock: jasmine.createSpy('getBlock'),
      clearCanvas: jasmine.createSpy('clearCanvas'),
      drawCanvasPixel: jasmine.createSpy('drawCanvasPixel'),
      updateCanvas: jasmine.createSpy('updateCanvas')
    };
    shooterFactory.__set__('mapFactory', () => map);
    shooter.shootOverBefore = jasmine.createSpy('shootOverBefore');
    shooter.shootOverAfter = jasmine.createSpy('shootOverAfter');
  });

  describe('initialization', () => {
    it('should return an shooter object', () => {
      expect(typeof shooter).toEqual('object');
      expect(shooter.line).toEqual(1);
      expect(shooter.column).toEqual(2);
      expect(shooter.direction).toEqual(38);
    });
  });

  describe('getPointList method', () => {
    it('should get the list of points to draw (case 1)', () => {
      let loop = 0;
      shooter.shootOverBefore.and.callFake(() => [1, 2, 3]);
      shooter.shootOverAfter.and.callFake(() => ({line: 1, column: 1}));
      shooter.map.getBlock.and.callFake(() => {
        loop++;
        switch (loop) {
          case 1:
            return {
              shootOverBefore: () => [4, 5, 6],
              shootOverAfter: () => null
            };
          default:
            return null;
        }
      });
      const pointList = shooter.getPointList(shooter);
      expect(shooter.shootOverBefore).toHaveBeenCalledWith(38);
      expect(shooter.shootOverAfter).toHaveBeenCalledWith(38);
      expect(shooter.map.getBlock).toHaveBeenCalledTimes(1);
      expect(shooter.map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(pointList).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should get the list of points to draw (case 2)', () => {
      let loop = 0;
      shooter.shootOverBefore.and.callFake(() => [1, 2, 3]);
      shooter.shootOverAfter.and.callFake(() => ({line: 1, column: 1}));
      shooter.map.getBlock.and.callFake(() => {
        loop++;
        switch (loop) {
          case 1:
            return {
              shootOverBefore: () => [4, 5, 6],
              shootOverAfter: () => ({line: 1, column: 0})
            };
          default:
            return null;
        }
      });
      const pointList = shooter.getPointList(shooter);
      expect(shooter.shootOverBefore).toHaveBeenCalledWith(38);
      expect(shooter.shootOverAfter).toHaveBeenCalledWith(38);
      expect(shooter.map.getBlock).toHaveBeenCalledTimes(2);
      expect(shooter.map.getBlock).toHaveBeenCalledWith(1, 1);
      expect(shooter.map.getBlock).toHaveBeenCalledWith(1, 0);
      expect(pointList).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('draw method', () => {
    it('should draw the shoot', done => {
      shooter.shootOverBefore.and.callFake(() => [
        {line: 2, column: 2},
        {line: 3, column: 2},
        {line: 4, column: 2}
      ]);
      shooter.shootOverAfter.and.callFake(() => null);
      document.addEventListener('actionEnd', () => {
        expect(shooter.map.drawCanvasPixel).toHaveBeenCalledWith(2, 2, 255, 0, 0, 255);
        expect(shooter.map.drawCanvasPixel).toHaveBeenCalledWith(2, 3, 255, 0, 0, 255);
        expect(shooter.map.drawCanvasPixel).toHaveBeenCalledWith(2, 4, 255, 0, 0, 255);
        expect(shooter.map.updateCanvas).toHaveBeenCalledTimes(2);
        expect(shooter.map.clearCanvas).toHaveBeenCalled();
        expect(shooter.start).toBe(null);
        done();
      });
      shooter.shoot();
    });
  });
});
