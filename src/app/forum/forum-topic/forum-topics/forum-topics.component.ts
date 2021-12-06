import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-forum-topics',
  templateUrl: './forum-topics.component.html',
  styleUrls: ['./forum-topics.component.css'],
})
export class ForumTopicsComponent implements OnInit {
  topic$: any[] = [];
  lastThread$: any[] = [];
  topicToEdit: any;
  inEdit: boolean = false;

  isAdmin = false;
  unsubscribe: any;

  constructor(public topicSerivce: TopicService, public authService: AuthService, private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.isUserAdmin();
    //retreive topics using topicSerivce from firestore and assign it to topic$
    this.unsubscribe = this.topicSerivce.getTopics().subscribe((value) => {
      this.topic$ = value;

      //get info of most recent threads
      this.topic$.forEach((element: any, index: any) => {
        this.topicSerivce.getLatestThread(element.topicID).subscribe((result) => {
          this.lastThread$[index] = result[0];
        })
      });
    });
  }
  
  //checks if currentUser is Admin
  isUserAdmin() {
    this.authService.afAuth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.afs.collection('users').doc(currentUser.uid).get().subscribe((result) => {
          if (result) {
            this.isAdmin = result.get('isAdmin');
          }
        })
      }
    })
  }

  //shows edit form and gets the topic details to be editted
  onClick(i: number) {
    this.topicToEdit = this.topic$[i];
    this.inEdit = true;
  }

  //shows/hides edit form
  editComplete(value: any) {
    this.inEdit = value;
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
