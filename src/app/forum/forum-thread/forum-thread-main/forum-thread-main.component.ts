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
  topics$: any = [];
  replies$: any = [];

  threadID: any = '';
  thread: any = [];
  displayName: any = '';
  quotedIndex: any;
  currentUserID: any;

  page: number = 1;
  itemsPerPage = 10;
  lastPage: any;

  isAdmin = false;
  replyClicked = false;

  constructor(public authService: AuthService, public topicService: TopicService, private route: ActivatedRoute, public afs: AngularFirestore) {
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;
  }

  ngOnInit(): void {
    //get id passed to route
    this.threadID = this.route.snapshot.paramMap.get('id');
    this.isAdmin = this.authService.isAdmin;

    this.topicService.getSingleTopic('YFb7yHbbsy0EfujSESXV').subscribe(topics => {
      //(partial / to change later) get topic info
      if (topics) {
        this.topics$ = topics.data();

        //get thread info
        this.topicService.getSingleThread(this.topics$.topicID, this.threadID).subscribe(result => {
          this.thread = result.data();
          this.getDisplayName();
        })

        //get replies in thread
        this.topicService.getReplies(this.topics$.topicID, this.threadID).subscribe(replies => {
          this.replies$ = replies;

          //get value of last page
          this.lastPage = Math.floor((this.replies$.length / this.itemsPerPage) + 1);
        })
      }
    })
  }

  getDisplayName() {
    this.authService.getSingleUser(this.thread.poster).subscribe(result => {
      this.displayName = result.get('displayName');
    })
  }

  //when page number is clicked
  goToTop(e: any){
    this.replyClicked = false;
    window.scrollTo(document.body.scrollHeight, 0);
    this.page = e;
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

  //if reply component is closed
  onReplyClose(close: boolean) {
    this.quotedIndex = null;
    this.replyClicked = close;
  }

  //if reply is submitted successfully
  onReplySuccess() {
    this.onReplyClose(false);

    //go to position/page where latest reply is displayed
    this.page = this.lastPage;
    window.scrollTo(0, document.body.scrollHeight);
  }
}
