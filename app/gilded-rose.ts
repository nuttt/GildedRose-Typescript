export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.updateItemQuality(i);
    }

    return this.items;
  }

  isItemExpired(item: Item) {
    return item.sellIn < 0
  }

  isItemForSell(item: Item) {
    return item.name !== "Sulfuras, Hand of Ragnaros"
  }

  trimQualityValue(quality: number) {
    return Math.max(0, Math.min(quality, 50))
  }

  calculateNewItemSellIn(item: Item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return item.sellIn
    }

    return item.sellIn - 1
  }

  calculateQualtyChange(item: Item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return 0
    }

    if (item.name === "Aged Brie") {
      if (this.isItemExpired(item)) {
        return 2
      }
      return 1
    }

    if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (this.isItemExpired(item)) {
        return -item.quality
      } else if (item.sellIn < 5) {
        return 3
      } else if (item.sellIn < 10) {
        return 2
      }
      return 1
    }

    if (this.isItemExpired(item)) {
      return -2
    }

    return -1
  }

  calculateNewItemQuality(item: Item) {
    if (!this.isItemForSell(item)) {
      return item.quality + this.calculateQualtyChange(item)
    }
    
    // trim only item for sell
    return this.trimQualityValue(item.quality + this.calculateQualtyChange(item))
  }


  updateItemQuality(i: number) {
    const item = this.items[i]

    item.sellIn = this.calculateNewItemSellIn(item)
    item.quality = this.calculateNewItemQuality(item)
    
    return
  }

  // private _updateItemQuality(i: number) {
  //   if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //     if (this.items[i].quality > 0) {
  //       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //         this.items[i].quality = this.items[i].quality - 1;
  //       }
  //     }
  //   } else {
  //     if (this.items[i].quality < 50) {
  //       this.items[i].quality = this.items[i].quality + 1;
  //       if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (this.items[i].sellIn < 11) {
  //           if (this.items[i].quality < 50) {
  //             this.items[i].quality = this.items[i].quality + 1;
  //           }
  //         }
  //         if (this.items[i].sellIn < 6) {
  //           if (this.items[i].quality < 50) {
  //             this.items[i].quality = this.items[i].quality + 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //     this.items[i].sellIn = this.items[i].sellIn - 1;
  //   }
  //   if (this.items[i].sellIn < 0) {
  //     if (this.items[i].name != 'Aged Brie') {
  //       if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //         if (this.items[i].quality > 0) {
  //           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //             this.items[i].quality = this.items[i].quality - 1;
  //           }
  //         }
  //       } else {
  //         this.items[i].quality = this.items[i].quality - this.items[i].quality;
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1;
  //       }
  //     }
  //   }
  // }
}
