import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {
  constructor(public authService: AuthService) { }

  user: any;
  uid: any;

  ngOnInit(): void {
    /*this.authService.afAuth.onAuthStateChanged(user => {
      if (user) {
        //(partial) get collection data of logged in user
        this.authService.getLoggedInData(user.uid);
      }
    })*/
  }

}
