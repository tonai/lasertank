import rotableFactory from './rotable';

describe('rotableFactory', () => {
  let rotable;

  beforeEach(() => {
    rotable = rotableFactory(1, 2);
  });

  describe('initialization', () => {
    it('should return a ground object', () => {
      expect(typeof rotable).toEqual('object');
      expect(rotable.line).toEqual(1);
      expect(rotable.column).toEqual(2);
      expect(rotable.direction).toEqual(38);
      expect(rotable.angle).toEqual(0);
    });
  });

  describe('rotate method', () => {
    it('should not rotate', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate();
      expect(rotable.angle).toEqual(0);
      expect(rotable.direction).toEqual(38);
    });

    it('should rotate to direction 37', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(37);
      expect(rotable.angle).toEqual(-90);
      expect(rotable.direction).toEqual(37);
    });

    it('should rotate to direction 39', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(39);
      expect(rotable.angle).toEqual(90);
      expect(rotable.direction).toEqual(39);
    });

    it('should rotate to direction 40', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(40);
      expect(rotable.angle).toEqual(180);
      expect(rotable.direction).toEqual(40);
    });

    it('should rotate to direction 38', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(38);
      expect(rotable.angle).toEqual(0);
      expect(rotable.direction).toEqual(38);
    });

    it('should rotate clockwise', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(true);
      expect(rotable.angle).toEqual(90);
      expect(rotable.direction).toEqual(39);
    });

    it('should rotate counterclockwise', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(false);
      expect(rotable.angle).toEqual(-90);
      expect(rotable.direction).toEqual(37);
    });

    it('should do a clockwise loop', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(true);
      rotable.rotate(true);
      rotable.rotate(true);
      rotable.rotate(true);
      expect(rotable.angle).toEqual(360);
      expect(rotable.direction).toEqual(38);
    });

    it('should do a counterclockwise loop', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(false);
      rotable.rotate(false);
      rotable.rotate(false);
      rotable.rotate(false);
      expect(rotable.angle).toEqual(-360);
      expect(rotable.direction).toEqual(38);
    });

    it('should do a clockwise loop using directions', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(37);
      rotable.rotate(40);
      rotable.rotate(39);
      rotable.rotate(38);
      expect(rotable.angle).toEqual(-360);
      expect(rotable.direction).toEqual(38);
    });

    it('should do a counterclockwise loop using directions', () => {
      rotable.el = {style: {transform: ''}};
      rotable.rotate(39);
      rotable.rotate(40);
      rotable.rotate(37);
      rotable.rotate(38);
      expect(rotable.angle).toEqual(360);
      expect(rotable.direction).toEqual(38);
    });
  });
});
