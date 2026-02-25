import {Injectable} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {TableCell, TableLayout, TDocumentDefinitions} from 'pdfmake/interfaces';
import {ProductGridConfig} from '../../product/grid-config/product-grid-config';
import {Column, GridApi, IRowNode} from 'ag-grid-community';

(pdfMake as any)['vfs'] = (pdfFonts as any).vfs;

export interface GridExportPdfDefinition {
  title: ProductGridConfig;
  width: string;
}

@Injectable({
  providedIn: 'root',
})
export class GridToPdfService {
  private readonly HEADER_ROW_COLOR = '#f8f8f8';
  private readonly EVEN_ROW_COLOR = '#fcfcfc';
  private readonly ODD_ROW_COLOR = '#fff';

  private readonly PDF_INNER_BORDER_COLOR = '#dde2eb';
  private readonly PDF_OUTER_BORDER_COLOR = '#babfc7';

  public exportToPdf(gridApi: GridApi, columnsDef: GridExportPdfDefinition[], title: string, fileName: string) {
    const document = this.getPdfDefinitions(gridApi, columnsDef, title);
    pdfMake.createPdf(document).download(fileName + '.pdf');
  }

  private getPdfDefinitions(
    gridApi: GridApi,
    columnsDef: GridExportPdfDefinition[],
    title: string,
  ): TDocumentDefinitions {
    const headerRow = this.getHeaders(columnsDef);
    const rows = this.getRows(gridApi, columnsDef);
    return {
      pageOrientation: 'landscape',
      content: [
        {
          text: title,
          style: 'header',
        },
        {
          table: {
            headerRows: 1,
            dontBreakRows: true,
            widths: columnsDef.map(col => col.width),
            body: [headerRow].concat(rows),
          },
          layout: this.createLayout(1),
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          color: '#6c58f7',
          margin: [0, 0, 0, 4],
        },
      },
      pageMargins: [10, 10, 10, 10],
    };
  }

  private getHeaders(columnsDef: GridExportPdfDefinition[]): TableCell[] {
    return columnsDef.map(colDef => ({
      text: colDef.title,
      bold: true,
      margin: [0, 2, 0, 2],
      fontSize: 11,
    }));
  }

  private getRows(gridApi: GridApi, columnsDef: GridExportPdfDefinition[]): TableCell[][] {
    const rowsToExport: TableCell[][] = [];
    gridApi.forEachNodeAfterFilterAndSort(node => {
      const rowToExport = columnsDef.map(colDef => {

        const column = gridApi.getAllDisplayedColumns().find(c => c.getColDef().headerName === colDef.title);
        if (column) {
          return this.mapNodeToTableCell(column, node, gridApi);
        }

        return {fontSize: 10, text: '', width: 10};
      });
      rowsToExport.push(rowToExport);
    });
    return rowsToExport;
  }

  private mapNodeToTableCell(colKey: Column, rowNode: IRowNode, gridApi: GridApi): TableCell {
    let cellValue = gridApi.getCellValue({colKey, rowNode});

    return {
      fontSize: 10,
      text: cellValue ?? '',
      ...colKey.getColDef().cellStyle,
      width: 10,
    };
  }

  private createLayout(numberOfHeaderRows: number): TableLayout {
    return {
      fillColor: rowIndex => {
        if (rowIndex < numberOfHeaderRows) {
          return this.HEADER_ROW_COLOR;
        }
        return rowIndex % 2 === 0 ? this.EVEN_ROW_COLOR : this.ODD_ROW_COLOR;
      },
      vLineWidth: () => 1,
      hLineColor: (rowIndex, node) =>
        rowIndex === 0 || rowIndex === node.table.body.length
          ? this.PDF_OUTER_BORDER_COLOR
          : this.PDF_INNER_BORDER_COLOR,
      vLineColor: (rowIndex, node) =>
        rowIndex === 0 || rowIndex === node.table.widths?.length
          ? this.PDF_OUTER_BORDER_COLOR
          : this.PDF_INNER_BORDER_COLOR,
    };
  }
}
