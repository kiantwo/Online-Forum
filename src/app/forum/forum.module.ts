import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumMainComponent } from './forum-main/forum-main.component';


@NgModule({
  declarations: [
    ForumMainComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule
  ],
  exports: [
    ForumMainComponent
  ]
})
export class ForumModule { }
