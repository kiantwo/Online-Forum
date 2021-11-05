import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumThreadRoutingModule } from './forum-thread-routing.module';
import { ForumThreadMainComponent } from './forum-thread-main/forum-thread-main.component';
import { ForumThreadBlockComponent } from './forum-thread-block/forum-thread-block.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForumThreadReplyComponent } from './forum-thread-reply/forum-thread-reply.component'

@NgModule({
  declarations: [
    ForumThreadMainComponent,
    ForumThreadBlockComponent,
    ForumThreadReplyComponent
  ],
  imports: [
    CommonModule,
    ForumThreadRoutingModule,
    FontAwesomeModule
  ],
  exports: [ForumThreadMainComponent]
})
export class ForumThreadModule { }
