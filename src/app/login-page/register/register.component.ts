import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
