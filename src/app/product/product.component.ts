import {Component, inject, Signal} from '@angular/core';
import {AgGridEvent, ColDef, GridApi} from 'ag-grid-community';
import {Product} from '../core/models/product';
import {ProductService} from '../core/services/product.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AgGridAngular} from 'ag-grid-angular';
import {COLUMNS_TO_PDF_EXPORT} from './grid-config/colums-pdf-config';
import {GridToPdfService} from '../core/services/grid-to-pdf.service';
import {productColumnDefs} from './grid-config/product-grid-config';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [AgGridAngular],
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  columnDefs: ColDef[] = productColumnDefs;
  protected readonly products$: Signal<Product[]>;
  private gridApi?: GridApi;
  private productService = inject(ProductService);
  private readonly gridToPdfService = inject(GridToPdfService);

  constructor() {
    this.products$ = toSignal(this.productService.getProducts(), {initialValue: []});
  }

  public exportToPdf() {
    if (this.gridApi) {
      const now = new Date();
      const formattedDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
      this.gridToPdfService.exportToPdf(
        this.gridApi,
        COLUMNS_TO_PDF_EXPORT,
        `Produits Export ${formattedDate}`,
        `PRODUCTS_EXPORT_${formattedDate}`
      );
    }
  }

  protected onGridReady(params: AgGridEvent): void {
    this.gridApi = params.api;
  }
}
