import {ColDef} from 'ag-grid-community';

export enum ProductGridConfig {
  ID = 'ID',
  NAME = 'Name',
  PRICE = 'Price',
  CATEGORY = 'Category',
  QUANTITY = 'Quantity'
}


export const productColumnDefs: ColDef[] = [
  {field: 'id', headerName: 'ID', sortable: true, filter: true},
  {field: 'name', headerName: 'Name', sortable: true, filter: true},
  {field: 'price', headerName: 'Price', sortable: true, filter: true},
  {field: 'category', headerName: 'Category', sortable: true, filter: true},
  {field: 'quantity', headerName: 'Quantity', sortable: true, filter: true}
];
