import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumThreadRoutingModule } from '../forum-thread/forum-thread-routing.module';
import { ForumThreadModule } from '../forum-thread/forum-thread.module';
import { ForumTopicThreadComponent } from './forum-topics/forum-topic-thread/forum-topic-thread.component';
import { ForumTopicsComponent } from './forum-topics/forum-topics.component';

const routes: Routes = [
  {
    path: '',
    component: ForumTopicsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ForumThreadModule,
    ForumThreadRoutingModule,
  ],
  exports: [RouterModule]
})
export class ForumTopicRoutingModule { }
