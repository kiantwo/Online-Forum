import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {

  topics$: any;
  threads$: any;

  constructor(public authService: AuthService, public afs: AngularFirestore, public topicService: TopicService) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(topics => {
      if (topics) {
        //get general discussions: pretend lang na sa localhost:4200/general-discussions na daw ni
        this.topics$ = topics[2];

        //get all the threads under general discussions
        this.topicService.getThreads(this.topics$.topicID).subscribe(threads => {
          if (threads) {
            this.threads$ = threads;
          }
        });
      }
    })
  }

}
