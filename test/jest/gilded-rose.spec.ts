import { Item, GildedRose } from '@/gilded-rose';

function createUpdatedItem(name, sellIn, quality) {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  expect(items.length).toEqual(1)
  return items[0];
}

describe('Gilded Rose', () => {
  it('can create item with specific name', () => {
    const item = createUpdatedItem('foo', 0, 0)
    expect(item.name).toBe('foo')
  });
  
  it('can create multiple items', () => {
    const gildedRose = new GildedRose([
      new Item('Foo', 1, 10),
      new Item('Bar', 1, 10),
      new Item('Baz', 1, 10)
    ]);
    const items = gildedRose.updateQuality();
    expect(items.length).toEqual(3)
  })

  it('can create zero items', () => {
    const gildedRose = new GildedRose([
    ]);
    const items = gildedRose.updateQuality();
    expect(items.length).toEqual(0)
    
  })

  describe('normal item', () => {
    it('reduce item quality after update quality', () => {
      const item = createUpdatedItem('foo', 1, 50)
      expect(item.quality).toBe(49)
      expect(item.sellIn).toBe(0)
    })

    it('reduce item quality 2 times faster if item expired', () => {
      const item = createUpdatedItem('foo', 0, 50)
      expect(item.quality).toBe(48)
      expect(item.sellIn).toBe(-1)
    })

    it('cannot reduce quality to less than 0', () => {
      const item = createUpdatedItem('foo', 0, 0)
      expect(item.quality).toBe(0)
      expect(item.sellIn).toBe(-1)
    })
  })
});
