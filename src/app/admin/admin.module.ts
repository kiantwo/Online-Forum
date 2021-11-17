import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminBanUserComponent } from './admin-ban-user/admin-ban-user.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    AdminBanUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule,
  ],
  exports: [AdminMainComponent, AdminBanUserComponent]
})
export class AdminModule { }
