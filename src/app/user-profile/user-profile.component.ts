import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: any;
  currentUser: any;
  
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    console.log('User Profile');
  }

}
