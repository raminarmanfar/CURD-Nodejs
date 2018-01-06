import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const appRoutes: Routes = [
  {path: '', component: UsersListComponent, pathMatch: 'full'},
  {path: 'usersList', component: UsersListComponent, pathMatch: 'full'},
  {path: 'addNewUser', component: AddNewUserComponent, pathMatch: 'full'},
  {path: 'editUser/:id', component: EditUserComponent, pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class RoutingModule {}
