import { Component, OnInit } from '@angular/core';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  users$: any[] = [];
  toBan: any;
  faUserSlash = faUserSlash;

  //pagination
  page = 1;
  itemsPerPage = 10;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.toBan = {
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      isBanned: false,
    };

    this.authService.getUsers().subscribe((value) => {
      //retrieve and assign user data from collection to users$ array
      this.users$ = value;
    });
  }

  onClick(i: number) {
    this.toBan = this.users$[i];
  }
}
