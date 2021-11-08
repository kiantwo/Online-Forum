import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
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
