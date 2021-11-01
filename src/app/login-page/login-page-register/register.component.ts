import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faIdCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faArrowLeft = faArrowLeft;
  faIdCard = faIdCard;

  buttonPressed = false;
  isSame = false;
  hasChange = false;

  form = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //re-direct to forum page if user already logged in
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {   //check if currentUser exists, if it does == user is logged in
      this.router.navigate(['main']);
    }

    this.onFormValueChange();
  }


  //check if form input changed
  onFormValueChange() {
    const initialValue = this.form.value
    this.form.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.form.value[key] !=
        initialValue[key])

      //set buttonPressed back to false if user changes input
      if (this.hasChange) {
        this.isSame = false;
        this.buttonPressed = false;
      }
    });
  }

  onSubmit() {
    this.buttonPressed = true;
    this.checkSame();
    //if no invalid inputs in form
    if (this.form.valid) {
      //if password is the same for both inputs
      if (this.isSame) {
        const payload: User = {
          uid: '',
          displayName: this.f.displayName.value,
          email: this.f.email.value,
          password: this.f.password.value
        };

        //call register function from AuthService
        this.authService.register(payload);
        this.form.reset();
      }
    }
  }

  //check if password is the same for both inputs
  checkSame() {
    console.log(this.f.password.value);
    console.log(this.f.confirmPass.value);
    //check if not empty
    if (this.f.password.value.length != 0 && this.f.confirmPass.value.length != 0) {
      if (this.f.password.value === this.f.confirmPass.value) {
        this.isSame = true;
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  get email() {
    return this.f.email;
  }

  get displayName() {
    return this.f.displayName;
  }

  get password() {
    return this.f.password;
  }

  get confirmPass() {
    return this.f.confirmPass;
  }

}
