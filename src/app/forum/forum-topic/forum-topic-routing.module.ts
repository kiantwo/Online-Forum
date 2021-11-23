import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ForumThreadMainComponent } from '../forum-thread/forum-thread-main/forum-thread-main.component';
import { ForumThreadRoutingModule } from '../forum-thread/forum-thread-routing.module';
import { ForumThreadModule } from '../forum-thread/forum-thread.module';
import { ForumTopicThreadComponent } from './forum-topics/forum-topic-thread/forum-topic-thread.component';
import { ForumTopicsComponent } from './forum-topics/forum-topics.component';

const routes: Routes = [
  {
    path: 'topic/:id',
    component: ForumTopicThreadComponent,
    canActivate: [AuthGuard],
  },
  /*{
    path:'topic/:id/thread/:tid',
    component: ForumThreadMainComponent
  }*/



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
