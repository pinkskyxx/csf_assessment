import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Item, ItemSlice } from "./imodels";
// import { v4 as uuidv4 } from 'uuid'
import { SlicePipe } from "@angular/common";

const INIT: ItemSlice = {
  loadedOn: 0,
  items: []
}

@Injectable()
export class ItemStore extends ComponentStore<ItemSlice> {

  constructor() { super(INIT) }

readonly addToStore = this.updater<Item>(
  (slice: ItemSlice, value: Item) => {
    value.id = this.generateUniqueId(); // Assign a unique ID to the item
    const newSlice: ItemSlice = {
      loadedOn: slice.loadedOn,
      items: [...slice.items, value]
    };
    return newSlice;
  }
);

private generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${timestamp}${randomNumber}`;
}

  readonly loadToStore = this.updater<Item[]>(
    (_slice: ItemSlice, values: Item[]) => {
      return {
        loadedOn: (new Date()).getTime(),
        items: values
      } as ItemSlice
    }
  )

  // Selectors
  readonly getAllItems = this.select<Item[]>(
    (slice: ItemSlice) => slice.items
  )

  readonly getLoadedTime = this.select<Date>(
    (slice: ItemSlice) => new Date(slice.loadedOn)
  )

  readonly getItemsWhereQuantity = (quantity: number) =>
    this.select<Item[]>(
      (slice: ItemSlice) => slice.items.filter(item => item.quantity < quantity)
    )


// remove an item from the store
readonly removeFromStore = this.updater<string>(
  (slice: ItemSlice, itemId: string) => {
    const filteredItems = slice.items.filter(item => item.id !== itemId);
    const newSlice: ItemSlice = {
      loadedOn: slice.loadedOn,
      items: filteredItems
    };
    return newSlice;
  }
);

// remove all items from the store
readonly removeAllFromStore = this.updater<string>(
  (slice: ItemSlice, _: string) => {
    const newSlice: ItemSlice = {
      loadedOn: slice.loadedOn,
      items: []
    };
    return newSlice;
  }
);
}
