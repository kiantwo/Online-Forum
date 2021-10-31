import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPass: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.f.password.value === this.f.confirmPass.value) {
      const userData: User = {
        uid: '',
        email: this.f.email.value,
        username: this.f.username.value,
        password: this.f.password.value,
        isAdmin: false,
        isLogged: false
      };

      this.auth.register(userData);
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
