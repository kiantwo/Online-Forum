import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumThreadMainComponent } from './forum-thread-main/forum-thread-main.component';

const routes: Routes = [
  {
    path: '',
    component: ForumThreadMainComponent,
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumThreadRoutingModule { }
