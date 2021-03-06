import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumThreadRoutingModule } from './forum-thread-routing.module';
import { ForumThreadMainComponent } from './forum-thread-main/forum-thread-main.component';
import { ForumThreadBlockComponent } from './forum-thread-block/forum-thread-block.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForumThreadReplyComponent } from './forum-thread-reply/forum-thread-reply.component'
import { ReactiveFormsModule } from '@angular/forms';
import { ForumThreadDeleteReplyComponent } from './forum-thread-delete-reply/forum-thread-delete-reply.component';
import { ForumThreadEditComponent } from './forum-thread-edit/forum-thread-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminModule } from 'src/app/admin/admin.module';
import { ForumThreadDeleteThreadComponent } from './forum-thread-delete-thread/forum-thread-delete-thread.component';

@NgModule({
  declarations: [
    ForumThreadMainComponent,
    ForumThreadBlockComponent,
    ForumThreadReplyComponent,
    ForumThreadDeleteReplyComponent,
    ForumThreadEditComponent,
    ForumThreadDeleteThreadComponent
  ],
  imports: [
    CommonModule,
    ForumThreadRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminModule,
  ],
  exports: [ForumThreadMainComponent]
})
export class ForumThreadModule { }
