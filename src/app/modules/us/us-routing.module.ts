import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsPageComponent } from './pages/us-page/us-page.component';

const routes: Routes = [{
  path:'',
  component: UsPageComponent
},
{
  path:'**',
  redirectTo: '/home'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsRoutingModule { }
