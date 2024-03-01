import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemSlice, LineItem} from '../models';
import { CartStore } from '../cart.store';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)

  private itemStore = inject(CartStore)
  Citems$!: Observable<LineItem[]>

  @Input({ required: true })
  productId!: string

  @Input({ required: true })
  nameId!: string
  @Input({ required: true })
  priceId!: number
  @Input({ required: true })
  quantityId!: string

  // @Input({ required: true })
  itemCount!: number
  private itemsSubscription: Subscription | undefined;
  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
    this.Citems$ = this.itemStore.getAllItems
    this.itemsSubscription = this.itemStore.getAllItems.subscribe((items: LineItem[]) => {
      this.itemCount = items.length;
    });

  }

  addToCart() {
    console.log("Press here")
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.nameId,
      price: this.priceId
    }

    console.info('lineitem = ', lineItem)
    this.itemStore.addToStore(lineItem)

    this.updateItemCountAndNotify(this.itemCount)
    this.form = this.createForm()
  }

  updateItemCountAndNotify(itemCount: number): void {
    this.itemStore.updateItemCount(itemCount);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }


  removeTagA(entries: any ){

    console.log("Order-delete indiv")
    console.log(entries.id)
    this.itemStore.removeFromStore(entries.id)
    this.itemStore.updateItemCount(this.itemCount);
  }
}
function selectSnapshot<T, U>(getAllItems: any) {
  throw new Error('Function not implemented.');
}

