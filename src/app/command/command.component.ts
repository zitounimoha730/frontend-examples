import {Component, inject, Signal} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {Command} from '../core/models/command';
import {CommandService} from '../core/services/command.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AgGridAngular} from 'ag-grid-angular';


@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  imports: [AgGridAngular],
  styleUrls: ['./command.component.scss']
})
export class CommandComponent {
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'userId', headerName: 'User ID', sortable: true, filter: true },
    { field: 'productId', headerName: 'Product ID', sortable: true, filter: true },
    { field: 'quantity', headerName: 'Quantity', sortable: true, filter: true },
    { field: 'date', headerName: 'Date', sortable: true, filter: true }
  ];
  protected readonly commands$: Signal<Command[]>;
  private commandService = inject(CommandService);

  constructor() {
    this.commands$ = toSignal(this.commandService.getCommands(), {initialValue: []});
  }
}
