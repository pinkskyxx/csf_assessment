import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartStore } from './cart.store';
import { LineItem } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private fb = inject(FormBuilder)

  itemCount!: number
  // form!: FormGroup
  chk_invalid: boolean = true;
  private itemsSubscription: Subscription | undefined;



  constructor(private sharedDataService: CartStore) {
    this.itemsSubscription = this.sharedDataService.getAllItems.subscribe((items: LineItem[]) => {
      this.itemCount = items.length;
    });

  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {

    this.itemCount = 0;
  }


isButtonDisabled(): boolean {
  return this.itemCount <= 0;
}

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }
}
