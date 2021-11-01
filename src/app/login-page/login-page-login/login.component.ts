import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;

  buttonPressed = false;
  hasChange = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //re-direct to forum page if user already logged in
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {  //check if currentUser exists, if it does == user is logged in
      this.router.navigate(['main']);
    }

    this.onFormValueChange();
  }

  onFormValueChange() {
    const initialValue = this.form.value
    this.form.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.form.value[key] !=
        initialValue[key])

      //set buttonPressed back to false if user changes input
      if (this.hasChange) {
        this.buttonPressed = false;
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    this.buttonPressed = true;

    if (this.form.valid) {
      const userData: User = {
        uid: '',
        displayName: '',
        email: this.f.email.value,
        password: this.f.password.value
      }

      this.authService.login(userData);
    }
  }

}
