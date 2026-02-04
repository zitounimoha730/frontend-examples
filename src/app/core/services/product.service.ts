import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../models/product';

@Injectable({providedIn: 'root'})
export class ProductService {
  getProducts(): Observable<Product[]> {
    return of([
      {id: 1, name: 'Laptop', price: 1200, category: 'Electronics'},
      {id: 2, name: 'Phone', price: 800, category: 'Electronics'},
      {id: 3, name: 'Desk', price: 200, category: 'Furniture'},
      {id: 4, name: 'Chair', price: 100, category: 'Furniture'}
    ]);
  }
}
