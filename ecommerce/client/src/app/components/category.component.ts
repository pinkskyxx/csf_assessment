import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LineItem, Product} from '../models';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private itemStore = inject(CartStore)
  category: string = "not set"

  products$!: Observable<Product[]>
  Citems$!: Observable<LineItem[]>
  private itemsSubscription: Subscription | undefined;
  itemCount!: number

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']
    this.products$ = this.prodSvc.getProductsByCategory(this.category)
    this.Citems$ = this.itemStore.getAllItems
    this.itemsSubscription = this.itemStore.getAllItems.subscribe((items: LineItem[]) => {
      this.itemCount = items.length;
    });
    // this.itemSvc.load()
    //   .then((items: Item[]) => this.itemStore.loadToStore(items))
  }

  removeTagA(entries: any ){
    console.log(entries.prodId)
    this.itemStore.removeFromStore(entries.prodId)
    this.itemStore.updateItemCount(this.itemCount);
  }

}
