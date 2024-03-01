import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { ItemSlice, LineItem } from "./models";
import { BehaviorSubject, Observable } from "rxjs";
// TODO Task 2
// Use the following class to implement your store

const INIT: ItemSlice = {
  loadedOn: 0,
  items: []
}
@Injectable()
export class CartStore extends ComponentStore<ItemSlice> {

  constructor() { super(INIT) }

  private itemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemCount$: Observable<number> = this.itemCountSubject.asObservable();

  updateItemCount(itemCount: number): void {
    this.itemCountSubject.next(itemCount);
  }

  readonly addToStore = this.updater<LineItem>(
    (slice: ItemSlice, value: LineItem) => {
      const newSlice: ItemSlice = {
        loadedOn: slice.loadedOn,
        items: [...slice.items, value]
      };
      return newSlice;
    }
  );

  readonly loadToStore = this.updater<LineItem[]>(
    (_slice: ItemSlice, values: LineItem[]) => {
      return {
        loadedOn: (new Date()).getTime(),
        items: values
      } as ItemSlice
    }
  )

  // Selectors
  readonly getAllItems = this.select<LineItem[]>(
    (slice: ItemSlice) => slice.items
  )

  readonly getLoadedTime = this.select<Date>(
    (slice: ItemSlice) => new Date(slice.loadedOn)
  )

  readonly getItemsWhereQuantity = (quantity: number) =>
    this.select<LineItem[]>(
      (slice: ItemSlice) => slice.items.filter(item => item.quantity < quantity)
    )

// remove an item from the store
readonly removeFromStore = this.updater<string>(
  (slice: ItemSlice, itemId: string) => {
    const filteredItems = slice.items.filter(item => item.prodId !== itemId);
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

