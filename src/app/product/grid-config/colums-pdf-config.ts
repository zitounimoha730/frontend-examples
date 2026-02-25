import {GridExportPdfDefinition} from '../../core/services/grid-to-pdf.service';
import {ProductGridConfig} from './product-grid-config';

export const COLUMNS_TO_PDF_EXPORT: GridExportPdfDefinition[] = [
  {title: ProductGridConfig.ID, width: '20%'},
  {title: ProductGridConfig.NAME, width: '20%'},
  {title: ProductGridConfig.PRICE, width: '20%'},
  {title: ProductGridConfig.CATEGORY, width: '20%'},
  {title: ProductGridConfig.QUANTITY, width: '20%'}
];
