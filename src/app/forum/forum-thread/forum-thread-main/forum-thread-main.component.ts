import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  displayName: any;
  quotedIndex: any;
  replyClicked = false;

  constructor(public authService: AuthService, public topicService: TopicService, private route: ActivatedRoute, public afs: AngularFirestore) { }

  ngOnInit(): void {
    //get id passed to route
    this.threadID = this.route.snapshot.paramMap.get('id');

    this.topicService.getSingleTopic('YFb7yHbbsy0EfujSESXV').subscribe(topics => {
      //(partial / to change later) get topic info
      if (topics) {
        this.topics$ = topics.data();

        //get thread info
        this.afs.collection('topics/' + this.topics$.topicID + '/threads').doc(this.threadID).get().subscribe(result => {
          this.thread = result.data();
          this.getDisplayName();
        })

        //get replies in thread
        this.topicService.getReplies(this.topics$.topicID, this.threadID).subscribe(replies => {
          this.replies$ = replies;
        })
      }
    })
  }

  getDisplayName() {
    this.authService.getSingleUser(this.thread.poster).subscribe(result => {
      this.displayName = result.get('displayName');
    })
  }

  //big reply button is clicked
  onReplyClick() {
    this.replyClicked = true;
  }

  //specific reply link is clicked
  onReply(index: any) {
    this.replyClicked = true;
    this.quotedIndex = index;
  }

  onReplyClose(close: boolean) {
    this.quotedIndex = null;
    this.replyClicked = close;
  }
}
