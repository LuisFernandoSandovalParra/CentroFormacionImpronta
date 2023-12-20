import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { CountRoutingModule } from './count-routing.module';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { CountNavbarComponent } from './pages/count-navbar/count-navbar.component';
import { MyCoursesListComponent } from './pages/my-courses-list/my-courses-list.component';
import { CoursesStoreComponent } from './pages/courses-store/courses-store.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursePaymentFormComponent } from './pages/course-payment-form/course-payment-form.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    MyCoursesComponent,
    CountNavbarComponent,
    MyCoursesListComponent,
    CoursesStoreComponent,
    CourseDetailsComponent,
    CoursePaymentFormComponent,
    ProfileEditComponent,
  ],
  imports: [CommonModule, CountRoutingModule, ReactiveFormsModule, MatDialogModule],
})
export class CountModule {}
