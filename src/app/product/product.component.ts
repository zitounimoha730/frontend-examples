import {Component, inject, Signal} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {Product} from '../core/models/product';
import {ProductService} from '../core/services/product.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [AgGridAngular],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  columnDefs: ColDef[] = [
    {field: 'id', headerName: 'ID', sortable: true, filter: true},
    {field: 'name', headerName: 'Name', sortable: true, filter: true},
    {field: 'price', headerName: 'Price', sortable: true, filter: true},
    {field: 'category', headerName: 'Category', sortable: true, filter: true}
  ];
  protected readonly products$: Signal<Product[]>;
  private productService = inject(ProductService);

  constructor() {
    this.products$ = toSignal(this.productService.getProducts(), {initialValue: []});
  }
}
