import { Item, GildedRose } from '@/gilded-rose';

function createUpdatedItem(name, sellIn, quality) {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  expect(items.length).toEqual(1)
  return items[0];
}

describe('Gilded Rose', () => {
  describe('Sulfuras, Hand of Ragnaros', () => {
    describe.each([
      { sellIn: 0, quality: 0, expectedQuality: 0, expectedSellIn: 0 },
      { sellIn: 0, quality: 1, expectedQuality: 1, expectedSellIn: 0 },
      { sellIn: 0, quality: 99, expectedQuality: 99, expectedSellIn: 0 },
      { sellIn: 1, quality: 0, expectedQuality: 0, expectedSellIn: 1 },
      { sellIn: 1, quality: 1, expectedQuality: 1, expectedSellIn: 1 },
      { sellIn: 1, quality: 99, expectedQuality: 99, expectedSellIn: 1 },
    ])('quality and sellIn should not decrease', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality is still ${quality} and sellIn is still ${sellIn}`, () => {
        const item = createUpdatedItem('Sulfuras, Hand of Ragnaros', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })
  })
});
