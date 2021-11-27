import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ForumMainComponent } from './forum-main/forum-main.component';
import { ForumThreadMainComponent } from './forum-thread/forum-thread-main/forum-thread-main.component';

const routes: Routes = [
  /*{
    path: 'topic/:id',
    loadChildren: () => import('./forum-topic/forum-topic.module').then((m) => m.ForumTopicModule),
    canActivate: [AuthGuard],
  },*/
  {
    path: 'topic/:id/thread/:tid',
    loadChildren: () => import('./forum-thread/forum-thread.module').then((m) => m.ForumThreadModule),
    canActivate: [AuthGuard],
  },
  
 
  
  
  /*{
    path: 'thread',
    component: ForumThreadMainComponent,
    canActivate: [AuthGuard]
  }*/
  {
    path: '',
    component: ForumMainComponent,
    canActivate: [AuthGuard],
  },
  /*{
    path: 'thread/:id', // localhost:4200/(topic)/thread/threadid
    component: ForumThreadMainComponent,
    canActivate: [AuthGuard]
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
