import {Component, inject, Signal} from '@angular/core';

import {User} from '../core/models/user';
import {UserService} from '../core/services/user.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {AgGridAngular} from 'ag-grid-angular';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  imports: [
    AgGridAngular
  ],
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  columnDefs: ColDef[] = [
    {field: 'id', headerName: 'ID', sortable: true, filter: true},
    {field: 'name', headerName: 'Name', sortable: true, filter: true},
    {field: 'email', headerName: 'Email', sortable: true, filter: true},
    {field: 'organization', headerName: 'Organization', sortable: true, filter: true}
  ];
  protected readonly users$: Signal<User[]>;
  private userService = inject(UserService);

  constructor() {
    this.users$ = toSignal(this.userService.getUsers(), {initialValue: []});
  }
}
