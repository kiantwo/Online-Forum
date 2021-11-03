import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ForumThreadMainComponent } from './forum-thread/forum-thread-main/forum-thread-main.component';

const routes: Routes = [
  /*{
    path: 'thread',
    component: ForumThreadMainComponent,
    canActivate: [AuthGuard]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
