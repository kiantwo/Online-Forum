import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginPageModule } from './login-page/login-page.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForumModule } from './forum/forum.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './shared/services/auth.service';
import { AdminModule } from './admin/admin.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ForumThreadModule } from './forum/forum-thread/forum-thread.module';
import { BannedComponent } from './banned/banned.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NotFoundComponent,
    BannedComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    LoginPageModule,
    AdminModule,
    ForumModule,
    ForumThreadModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FontAwesomeModule
  ],
  providers: [AngularFirestore, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
