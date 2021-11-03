import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumMainComponent } from './forum/forum-main/forum-main.component';
import { ForumThreadMainComponent } from './forum/forum-thread/forum-thread-main/forum-thread-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: ForumMainComponent,
    canActivate: [AuthGuard]  //dont let user access if isLoggedIn returns false
  },
  {
    path: 'thread',
    component: ForumThreadMainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
