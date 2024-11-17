import { Item, GildedRose } from '@/gilded-rose';

function createUpdatedItem(name, sellIn, quality) {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const items = gildedRose.updateQuality();
  expect(items.length).toEqual(1)
  return items[0];
}

describe('Gilded Rose', () => {
  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    describe.each([
      { sellIn: 99, quality: 50, expectedSellIn: 98, expectedQuality: 50 },
      { sellIn: 99, quality: 0, expectedSellIn: 98, expectedQuality: 1 },
      { sellIn: 11, quality: 50, expectedSellIn: 10, expectedQuality: 50 },
      { sellIn: 11, quality: 0, expectedSellIn: 10, expectedQuality: 1 }
    ])('quality increase by 1 when they are more than 10 days left but max quality is 50', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality should be ${expectedQuality} when sellIn is ${sellIn} & quality is ${quality}`, () => {
        const item = createUpdatedItem('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })

    describe.each([
      { sellIn: 10, quality: 50, expectedSellIn: 9, expectedQuality: 50 },
      { sellIn: 10, quality: 49, expectedSellIn: 9, expectedQuality: 50 },
      { sellIn: 10, quality: 47, expectedSellIn: 9, expectedQuality: 49 },
      { sellIn: 9, quality: 0, expectedSellIn: 8, expectedQuality: 2 },
      { sellIn: 6, quality: 1, expectedSellIn: 5, expectedQuality: 3 },
    ])('quality increase by 2 when they is 6 to 10 days left but max quality is 50', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality should be ${expectedQuality} when sellIn is ${sellIn} & quality is ${quality}`, () => {
        const item = createUpdatedItem('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })

    describe.each([
      { sellIn: 5, quality: 50, expectedSellIn: 4, expectedQuality: 50 },
      { sellIn: 5, quality: 48, expectedSellIn: 4, expectedQuality: 50 },
      { sellIn: 5, quality: 45, expectedSellIn: 4, expectedQuality: 48 },
      { sellIn: 3, quality: 0, expectedSellIn: 2, expectedQuality: 3 },
      { sellIn: 1, quality: 0, expectedSellIn: 0, expectedQuality: 3 },
    ])('quality increase by 3 when they is 1 to 5 days left but max quality is 50', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality should be ${expectedQuality} when sellIn is ${sellIn} & quality is ${quality}`, () => {
        const item = createUpdatedItem('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })

    describe.each([
      { sellIn: 0, quality: 50, expectedSellIn: -1, expectedQuality: 0 },
      { sellIn: 0, quality: 25, expectedSellIn: -1, expectedQuality: 0 },
      { sellIn: -1, quality: 0, expectedSellIn: -2, expectedQuality: 0 }
    ])('quality drop to zero when sellIn is 0', ({ sellIn, quality, expectedQuality, expectedSellIn }) => {
      it(`quality is zero when sellIn is ${sellIn}`, () => {
        const item = createUpdatedItem('Backstage passes to a TAFKAL80ETC concert', sellIn, quality)
        expect(item.quality).toBe(expectedQuality)
        expect(item.sellIn).toBe(expectedSellIn)
      })
    })
  })
});
