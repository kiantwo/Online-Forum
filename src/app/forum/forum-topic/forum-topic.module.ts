import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumTopicRoutingModule } from './forum-topic-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForumCreateTopicComponent } from './forum-create-topic/forum-create-topic.component';
import { ForumDeleteComponent } from './forum-delete/forum-delete.component';
import { ForumEditTopicComponent } from './forum-edit-topic/forum-edit-topic.component';
import { ForumTopicsComponent } from './forum-topics/forum-topics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumTopicThreadComponent } from './forum-topics/forum-topic-thread/forum-topic-thread.component';
import { ForumThreadModule } from '../forum-thread/forum-thread.module';


@NgModule({
  declarations: [
    ForumCreateTopicComponent,
    ForumEditTopicComponent,
    ForumDeleteComponent,
    ForumTopicsComponent,
    ForumTopicThreadComponent,

  ],
  imports: [
    CommonModule,
    ForumTopicRoutingModule,
    FormsModule,
    ForumThreadModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],

  exports: [ForumTopicsComponent, ForumTopicThreadComponent]

})
export class ForumTopicModule { }
