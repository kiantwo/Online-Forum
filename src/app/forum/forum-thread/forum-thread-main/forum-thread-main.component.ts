import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-main',
  templateUrl: './forum-thread-main.component.html',
  styleUrls: ['./forum-thread-main.component.css']
})
export class ForumThreadMainComponent implements OnInit {
  topics$: any;
  replies$: any;
  threadID: any;
  thread: any;

  constructor(public topicService: TopicService, private route: ActivatedRoute, public afs: AngularFirestore) { }

  ngOnInit(): void {
    //get id passed to route
    this.threadID = this.route.snapshot.paramMap.get('id');

    this.topicService.getTopics().subscribe(topics => {
      //(partial / to change later) get topic info
      if (topics) {
        this.topics$ = topics[2];

        //get thread info
        this.afs.collection('topics/' + this.topics$.topicID + '/threads').doc(this.threadID).get().subscribe(result => {
          this.thread = result.data();
        })

        //get replies in thread
        this.topicService.getReplies(this.topics$.topicID, this.threadID).subscribe(replies => {
          this.replies$ = replies;
        })
      }
    })
  }

}
