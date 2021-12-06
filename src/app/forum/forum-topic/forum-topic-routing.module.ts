import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { ForumThreadRoutingModule } from '../forum-thread/forum-thread-routing.module';
import { ForumThreadModule } from '../forum-thread/forum-thread.module';
import { ForumTopicThreadComponent } from './forum-topics/forum-topic-thread/forum-topic-thread.component';

const routes: Routes = [
  {
    path: ':id',
    component: ForumTopicThreadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/thread/:tid',
    loadChildren: () => import('../forum-thread/forum-thread.module').then((m) => m.ForumThreadModule),
    canActivate: [AuthGuard],
  },
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
