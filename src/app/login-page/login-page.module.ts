import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from './login-page-login/login.component';
import { RegisterComponent } from './login-page-register/register.component';
import { MainComponent } from './login-page-main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent, RegisterComponent, MainComponent]
})
export class LoginPageModule { }
