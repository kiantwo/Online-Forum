import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-forum';

  currentUser: any;
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  isAdmin = false;
  isBanned = false;

  unsubscribe: any;

  constructor(private fb: FormBuilder, public authService: AuthService, public afs: AngularFirestore) {
  }

  ngOnInit(): void {
    //check if currentUser isAdmin
    this.unsubscribe = this.authService.afAuth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.afs.collection('users').doc(currentUser.uid).get().subscribe((result) => {
          if (result) {
            if(result.get('isBanned')) {
              this.isBanned = true;
            }
            this.isAdmin = result.get('isAdmin');
          }
        })
      }
    })
  }
  
  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
