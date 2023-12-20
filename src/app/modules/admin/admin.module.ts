import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminNavbarComponent } from './pages/admin-navbar/admin-navbar.component';
import { AdminProfileEditComponent } from './pages/admin-profile-edit/admin-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminNavbarComponent,
    AdminProfileEditComponent,
    AdminUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
