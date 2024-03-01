import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-store',
  templateUrl: './side-store.component.html',
  styleUrl: './side-store.component.css'
})



export class SideStoreComponent {

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  Citems$!: Observable<Product[]>

}
