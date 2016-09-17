import mapFactory from './map';

const mapSave = [
  [0, 1],
  [1, 2]
];
const blocks = {
  0: (line, column) => ({id: 0, ground: 1, line, column}),
  1: (line, column) => ({id: 1, line, column}),
  2: (line, column) => ({id: 2, line, column})
};

mapFactory.__set__('mapSave', mapSave);
mapFactory.__set__('blocksFactory', () => blocks);
mapFactory.__set__('tankFactory', {id: 0});

describe('mapFactory', () => {
  let map;

  beforeEach(() => {
    map = mapFactory();
    map.init();
  });

  describe('init method', () => {
    it('should initializes objects', () => {
      expect(map.totalColumns).toEqual(2);
      expect(map.totaLines).toEqual(2);
      expect(map.groundMap).toEqual([
        [jasmine.objectContaining({id: 1}), jasmine.objectContaining({id: 1})],
        [jasmine.objectContaining({id: 1}), jasmine.objectContaining({id: 2})]
      ]);
      expect(map.itemsMap).toEqual([[jasmine.objectContaining({id: 0}), null], [null, null]]);
    });
  });

  describe('draw method', () => {
    it('should draw the map inside an element', () => {
      const div = document.createElement('div');
      map.draw(div);
      expect(div.innerHTML).not.toEqual('');
      expect(map.itemsMap[0][0].el instanceof Element).toBe(true);
    });
  });

  describe('getBlock method', () => {
    it('should return a tank block', () => {
      expect(map.getBlock(0, 0)).toEqual(jasmine.objectContaining({id: 0}));
    });

    it('should return a flag block', () => {
      expect(map.getBlock(1, 1)).toEqual(jasmine.objectContaining({id: 2}));
    });
  });
});
