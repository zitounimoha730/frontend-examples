// // src/app/user/user.component.spec.ts
// import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
// import {NO_ERRORS_SCHEMA, Signal} from '@angular/core';
// import {of} from 'rxjs';
//
// import {UserComponent} from './user.component';
// import {UserService} from '../core/services/user.service';
// import {User} from '../core/models/user';
//
// describe('UserComponent', () => {
//   let fixture: ComponentFixture<UserComponent>;
//   let component: UserComponent;
//   let userServiceMock: { getUsers: jasmine.Spy };
//   const mockUsers: User[] = [
//     {id: 1, name: 'Alice', email: 'alice@example.com', organization: 'OrgA'},
//     {id: 2, name: 'Bob', email: 'bob@example.com', organization: 'OrgB'}
//   ];
//
//   beforeEach(waitForAsync(() => {
//     userServiceMock = {
//       getUsers: jasmine.createSpy('getUsers').and.returnValue(of(mockUsers))
//     };
//
//     TestBed.configureTestingModule({
//       declarations: [UserComponent],
//       providers: [{provide: UserService, useValue: userServiceMock}],
//       schemas: [NO_ERRORS_SCHEMA] // ignore ag-grid element in template
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(UserComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should call getUsers and expose users through the signal', () => {
//     expect(userServiceMock.getUsers).toHaveBeenCalled();
//     const usersSignal = (component as any).users$ as Signal<User[]>;
//     expect(typeof usersSignal).toBe('function');
//     expect(usersSignal()).toEqual(mockUsers);
//   });
// });
