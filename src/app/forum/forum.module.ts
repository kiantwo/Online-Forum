import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumTopicModule } from './forum-topic/forum-topic.module';



@NgModule({
  declarations: [
    ForumMainComponent,
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ForumTopicModule,
  ],
  exports: [
    ForumMainComponent,

  ]
})
export class ForumModule { }
