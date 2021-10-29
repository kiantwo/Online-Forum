import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FontAwesomeModule
  ],
  exports: [LoginComponent, RegisterComponent, MainComponent]
})
export class LoginPageModule { }
