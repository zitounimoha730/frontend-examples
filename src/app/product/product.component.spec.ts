/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../core/services/product.service';
import { GridToPdfService } from '../core/services/grid-to-pdf.service';
import { AgGridAngular } from 'ag-grid-angular';
import { of } from 'rxjs';
import { COLUMNS_TO_PDF_EXPORT } from './grid-config/colums-pdf-config';
import { productColumnDefs } from './grid-config/product-grid-config';

// Mock ProductService
class MockProductService {
  getProducts() {
    return of([]);
  }
}

// Mock GridToPdfService
class MockGridToPdfService {
  exportToPdf = jasmine.createSpy('exportToPdf');
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let gridToPdfService: MockGridToPdfService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridAngular],
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: GridToPdfService, useClass: MockGridToPdfService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    gridToPdfService = TestBed.inject(GridToPdfService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columnDefs', () => {
    expect(component.columnDefs).toBe(productColumnDefs);
  });

  it('should call exportToPdf on gridToPdfService when exportToPdf is called and gridApi is set', () => {
    const mockGridApi = {} as any;
    component['gridApi'] = mockGridApi;
    const now = new Date();
    const formattedDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    component.exportToPdf();
    expect(gridToPdfService.exportToPdf).toHaveBeenCalledWith(
      mockGridApi,
      COLUMNS_TO_PDF_EXPORT,
      jasmine.stringMatching(`Produits Export ${formattedDate}`),
      jasmine.stringMatching(`PRODUCTS_EXPORT_${formattedDate}`)
    );
  });

  it('should not call exportToPdf on gridToPdfService if gridApi is not set', () => {
    component['gridApi'] = undefined;
    component.exportToPdf();
    expect(gridToPdfService.exportToPdf).not.toHaveBeenCalled();
  });

  it('should set gridApi on onGridReady', () => {
    const params = { api: {} } as any;
    component.onGridReady(params);
    expect(component['gridApi']).toBe(params.api);
  });
});
*/