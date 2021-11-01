import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';

@NgModule({
  declarations: [
    AdminMainComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [AdminMainComponent]
})
export class AdminModule { }
