import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumTopicsComponent } from './forum-topic/forum-topics/forum-topics.component';
import { ForumCreateTopicComponent } from './forum-topic/forum-create-topic/forum-create-topic.component';
import { ForumEditTopicComponent } from './forum-topic/forum-edit-topic/forum-edit-topic.component';
import { ForumDeleteComponent } from './forum-topic/forum-delete/forum-delete.component';
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
