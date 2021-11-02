import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumCreateTopicComponent } from './forum-create-topic/forum-create-topic.component';


@NgModule({
  declarations: [
    ForumMainComponent,
    ForumCreateTopicComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ForumMainComponent,
    ForumCreateTopicComponent,
  ]
})
export class ForumModule { }
