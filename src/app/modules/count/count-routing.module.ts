import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { MyCoursesListComponent } from './pages/my-courses-list/my-courses-list.component';
import { CoursesStoreComponent } from './pages/courses-store/courses-store.component';
import { CoursePaymentFormComponent } from './pages/course-payment-form/course-payment-form.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: 'my-courses',
    component: MyCoursesComponent,
    children: [
      { path: 'list',
        component: MyCoursesListComponent
      },
      {
        path: 'store',
        component: CoursesStoreComponent,
      },
      {
        path: 'payment',
        component: CoursePaymentFormComponent
      },
      {
        path: 'profile',
        component: ProfileEditComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountRoutingModule {}
