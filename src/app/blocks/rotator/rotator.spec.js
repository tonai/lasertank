import rotatorFactory from './rotator';

describe('rotatorFactory', () => {
  let rotator;

  beforeEach(() => {
    rotator = rotatorFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a ground object', () => {
      expect(typeof rotator).toEqual('object');
      expect(rotator.line).toEqual(1);
      expect(rotator.column).toEqual(2);
      expect(rotator.direction).toEqual(38);
      expect(rotator.angle).toEqual(0);
    });
  });

  describe('rotate method', () => {
    it('should not rotate', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate();
      expect(rotator.angle).toEqual(0);
      expect(rotator.direction).toEqual(38);
    });

    it('should rotate to direction 37', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(37);
      expect(rotator.angle).toEqual(-90);
      expect(rotator.direction).toEqual(37);
    });

    it('should rotate to direction 39', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(39);
      expect(rotator.angle).toEqual(90);
      expect(rotator.direction).toEqual(39);
    });

    it('should rotate to direction 40', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(40);
      expect(rotator.angle).toEqual(180);
      expect(rotator.direction).toEqual(40);
    });

    it('should rotate to direction 38', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(38);
      expect(rotator.angle).toEqual(0);
      expect(rotator.direction).toEqual(38);
    });

    it('should rotate clockwise', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(true);
      expect(rotator.angle).toEqual(90);
      expect(rotator.direction).toEqual(39);
    });

    it('should rotate counterclockwise', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(false);
      expect(rotator.angle).toEqual(-90);
      expect(rotator.direction).toEqual(37);
    });

    it('should do a clockwise loop', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(true);
      rotator.rotate(true);
      rotator.rotate(true);
      rotator.rotate(true);
      expect(rotator.angle).toEqual(360);
      expect(rotator.direction).toEqual(38);
    });

    it('should do a counterclockwise loop', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(false);
      rotator.rotate(false);
      rotator.rotate(false);
      rotator.rotate(false);
      expect(rotator.angle).toEqual(-360);
      expect(rotator.direction).toEqual(38);
    });

    it('should do a clockwise loop using directions', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(37);
      rotator.rotate(40);
      rotator.rotate(39);
      rotator.rotate(38);
      expect(rotator.angle).toEqual(-360);
      expect(rotator.direction).toEqual(38);
    });

    it('should do a counterclockwise loop using directions', () => {
      rotator.el = {style: {transform: ''}};
      rotator.rotate(39);
      rotator.rotate(40);
      rotator.rotate(37);
      rotator.rotate(38);
      expect(rotator.angle).toEqual(360);
      expect(rotator.direction).toEqual(38);
    });
  });
});
