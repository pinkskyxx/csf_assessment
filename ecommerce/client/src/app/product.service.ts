import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, Product} from "./models";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // checkout(order: Order) {
  //   // TODO Task 3
  // }

  //test send
  public checkout(order: Order): Observable<Order> {
    const formData = new FormData();
    formData.set('address', order.address);
    // formData.set('cart', order.cart as any);
    formData.set('comments', order.comments);
    formData.set('name', order.name);
    // formData.set('priority', order.priority as any);
    return this.http.post<Order>(`/api/Order`, formData);
  }

  //actual send
  public checkout1(order: Order): Observable<Order> {
    const formData = new FormData();
    formData.set('address', order.address);
    formData.set('cart', order.cart as any);
    formData.set('comments', order.comments);
    formData.set('name', order.name);
    formData.set('priority', order.priority as any);
    return this.http.post<Order>(`/api/Order`, formData);
  }
}
