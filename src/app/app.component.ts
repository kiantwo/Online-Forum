import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-forum';

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  isLoggedIn = false;

  constructor(private fb: FormBuilder, public authService: AuthService) {

  }

  ngOnInit(): void {

  }

  get f () {
    return this.form.controls;
  }
}
