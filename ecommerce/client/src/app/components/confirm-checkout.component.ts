import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LineItem } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{

  // TODO Task 3

  Citems$!: Observable<LineItem[]>
  form!: FormGroup
  private fb = inject(FormBuilder)
  private itemStore = inject(CartStore)
  private productservice = inject(ProductService)
  private router = inject(Router);

  createCheckOut?: Subscription;

  ngOnInit(): void {
    this.createForm()
    this.Citems$ = this.itemStore.getAllItems

  }

  getTotalPrice(items: LineItem[]): number {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }
  createForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      priority:[false],
      comment:['']
    })
  }

  get myname() { return this.form.get('name')!; }
  get myquantity() { return this.form.get('quantity')!; }
  get myaddress() { return this.form.get('address')!; }


  process(){
    this.createCheckOut = this.productservice.checkout({
      ...this.form.value
    })
      .subscribe({
        next: order => this.router.navigate(['/']).then(() => alert((order as any))),
        error: err => alert(err.message)
      })
  }
}
