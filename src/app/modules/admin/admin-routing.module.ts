import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminProfileEditComponent } from './pages/admin-profile-edit/admin-profile-edit.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';

const routes: Routes = [
  {
    path: 'home',
    component: AdminHomeComponent,
    children: [
      {
        path: 'profile',
        component: AdminProfileEditComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
