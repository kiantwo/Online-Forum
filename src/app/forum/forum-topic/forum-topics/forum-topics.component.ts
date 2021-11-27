import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';
import { faEdit, faStore } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forum-topics',
  templateUrl: './forum-topics.component.html',
  styleUrls: ['./forum-topics.component.css'],
})
export class ForumTopicsComponent implements OnInit {
  topic$: any[] = [];
  lastThread$: any[] = [];
  topicToEdit: any;
  topicIndex: number = 0;
  inEdit: boolean = false;
  faEdit = faEdit;
  faStore = faStore;

  threadsOfATopic: any = [];
  specificTopidID: any;

  isAdmin = false;

  constructor(public topicSerivce: TopicService, public authService: AuthService) {}

  ngOnInit(): void {
    console.log(localStorage);
    this.isAdmin = this.authService.isAdmin;
    
    //retreive topics using topicSerivce from firestore and assign it to topic$
    this.topicSerivce.getTopics().subscribe((value) => {
      this.topic$ = value;

      //get info of most recent threads
      this.topic$.forEach((element: any, index: any) => {
        this.topicSerivce.getThreads(element.topicID).subscribe((result) => {
          this.lastThread$[index] = result[0];
        });
      });
    });
  }

  onClick(i: number) {
    this.topicToEdit = this.topic$[i];
    this.inEdit = false;
    this.inEdit = true;
    this.topicIndex = i;
  }

  editComplete(value: any) {
    this.inEdit = value;
  }

  onClickTopic(i: number) {
    this.specificTopidID = this.topic$[i].topicID;
    this.topicSerivce.getThreads(this.specificTopidID).subscribe((threads) => {
      if (threads) {
        this.threadsOfATopic = threads;
      }

      //console.log(this.threadsOfATopic);
    });
  }
}
