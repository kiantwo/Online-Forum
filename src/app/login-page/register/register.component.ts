import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faIdCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
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

  form = this.fb.group({
    displayName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPass: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //re-direct to forum page if user already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(['main']);
    }
  }

  onSubmit() {
    console.log(this.f.password.value);
    
    if(this.f.password.value === this.f.confirmPass.value) {
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

    else {
      alert('Error');
    }
  }

  get f() {
    return this.form.controls;
  }

}
