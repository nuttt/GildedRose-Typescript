import { Item, GildedRose } from '@/gilded-rose';

function createUpdatedItem(name, sellIn, quality) {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  expect(items.length).toEqual(1)
  return items[0];
}

describe('Gilded Rose', () => {

  describe('Aged Brie', () => {
    it('quality increse after update', () => {
      const item = createUpdatedItem('Aged Brie', 1, 0)
      expect(item.quality).toBe(1)
      expect(item.sellIn).toBe(0)
    })

    it('quality increse 2x after expired', () => {
      const item = createUpdatedItem('Aged Brie', 0, 0)
      expect(item.quality).toBe(2)
      expect(item.sellIn).toBe(-1)
    })

    describe.each([
      { sellIn: 0, quality: 49, expectedQuality: 50, expectedSellIn: -1 },
      { sellIn: 0, quality: 50, expectedQuality: 50, expectedSellIn: -1 },
      { sellIn: 1, quality: 50, expectedQuality: 50, expectedSellIn: 0 }
    ])('max quality of aged brie', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality is ${quality} & sellIn is ${sellIn}, after update itme, quality should be ${expectedQuality}`, () => {
        const item = createUpdatedItem('Aged Brie', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })
  })
});
