import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsRoutingModule } from './us-routing.module';
import { UsPageComponent } from './pages/us-page/us-page.component';


@NgModule({
  declarations: [
    UsPageComponent
  ],
  imports: [
    CommonModule,
    UsRoutingModule
  ]
})
export class UsModule { }
