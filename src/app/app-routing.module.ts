import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'my-count',
    loadChildren: () =>
      import('../app/modules/count/count.module').then((m) => m.CountModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
