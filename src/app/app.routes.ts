import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CommandComponent } from './command/command.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'user', component: UserComponent },
	{ path: 'product', component: ProductComponent },
	{ path: 'command', component: CommandComponent }
];
