import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page-login/login.component';
import { MainComponent } from './login-page-main/main.component';
import { RegisterComponent } from './login-page-register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: MainComponent,
    children: [
      {
        path: '', component: LoginComponent,
      }
    ]
  },
  {
    path: 'register',
    component: MainComponent,
    children: [
      {
        path: '', component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
