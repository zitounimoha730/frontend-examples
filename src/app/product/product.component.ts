import {Component, inject, Signal, signal, input, output, ChangeDetectionStrategy, computed} from '@angular/core';
import {AgGridEvent, ColDef, GridApi} from 'ag-grid-community';
import {Product} from '../core/models/product';
import {ProductService} from '../core/services/product.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AgGridAngular} from 'ag-grid-angular';
import {COLUMNS_TO_PDF_EXPORT} from './grid-config/colums-pdf-config';
import {GridToPdfService} from '../core/services/grid-to-pdf.service';
import {productColumnDefs} from './grid-config/product-grid-config';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [AgGridAngular, ReactiveFormsModule],
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  columnDefs: ColDef[] = productColumnDefs;
  protected readonly products$ = signal<Product[]>([]);
  private gridApi?: GridApi;
  private productService = inject(ProductService);
  private readonly gridToPdfService = inject(GridToPdfService);

  // Reactive form for new product
  protected readonly productForm = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    price: new FormControl<number|null>(null, {nonNullable: false, validators: [Validators.required, Validators.min(0)]}),
    category: new FormControl('', {nonNullable: true}),
    quantity: new FormControl<number|null>(null, {nonNullable: false, validators: [Validators.min(0)]}),
  });

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products$.set(products);
    });
  }

  protected addProduct() {
    if (this.productForm.invalid) return;
    const formValue = this.productForm.value;
    // Generate a new id (max id + 1)
    const current = this.products$();
    const newId = current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: newId,
      name: formValue.name!,
      price: formValue.price ?? 0,
      category: formValue.category || undefined,
      quantity: formValue.quantity ?? undefined
    };
    this.products$.set([...current, newProduct]);
    this.productForm.reset();
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
