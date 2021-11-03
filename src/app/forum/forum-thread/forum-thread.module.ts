import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumThreadRoutingModule } from './forum-thread-routing.module';
import { ForumThreadMainComponent } from './forum-thread-main/forum-thread-main.component';
import { ForumThreadBlockComponent } from './forum-thread-block/forum-thread-block.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    ForumThreadMainComponent,
    ForumThreadBlockComponent
  ],
  imports: [
    CommonModule,
    ForumThreadRoutingModule,
    FontAwesomeModule
  ],
  exports: [ForumThreadMainComponent]
})
export class ForumThreadModule { }
