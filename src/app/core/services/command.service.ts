import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Command} from '../models/command';

@Injectable({providedIn: 'root'})
export class CommandService {
  getCommands(): Observable<Command[]> {
    return of([
      {id: 1, userId: 1, productId: 2, quantity: 3, date: '2026-02-01'},
      {id: 2, userId: 2, productId: 1, quantity: 1, date: '2026-02-02'},
      {id: 3, userId: 1, productId: 3, quantity: 2, date: '2026-02-03'},
      {id: 4, userId: 3, productId: 2, quantity: 5, date: '2026-02-04'}
    ]);
  }
}
