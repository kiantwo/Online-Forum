import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  users$: any[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((value) => {
      //retrieve and assign user data from collection to users$ array
      this.users$ = value;
    });
  }

  onClick(i: number) {
    console.log(this.users$[i]);
  }
}
