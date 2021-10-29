import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faArrowLeft, faIdCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.f.password.value === this.f.confirmPass.value) {
      console.log(this.form.controls);
    }

    else {
      console.log('Error');
    }
  }

  get f() {
    return this.form.controls;
  }

}
