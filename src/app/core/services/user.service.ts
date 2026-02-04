import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users = [
        { id: 1, name: 'Alice', email: 'alice@example.com', organization: 'Acme Corp' },
        { id: 2, name: 'Bob', email: 'bob@example.com', organization: 'Globex Inc' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', organization: 'Initech' }
    ];

    getUsers(): Observable<User[]> {
        return new Observable(observer => {
            observer.next(this.users);
            observer.complete();
        });
    }
}