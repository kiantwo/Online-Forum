import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';
import { orderBy } from '@firebase/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-forum-topic-thread',
  templateUrl: './forum-topic-thread.component.html',
  styleUrls: ['./forum-topic-thread.component.css'],
})
export class ForumTopicThreadComponent implements OnInit {
  topicID$: any;
  threads$: any;
  topics$: any = [];
  replies$: any = [];
  authors: any = [];
  description: any;

  inEdit: any = 0;
  threadToEdit: any;

  isAdmin = false;
  currentUserID: any;

  @Input() topicIndex: any;

  constructor(
    public afs: AngularFirestore,
    public topicService: TopicService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;
  }

  ngOnInit(): void {
    this.topicID$ = this.route.snapshot.paramMap.get('id');
    this.isAdmin = this.authService.isAdmin;
    //getting the threads
    this.topicService.getThreads(this.topicID$).subscribe((threads) => {
      if (threads) {
        this.threads$ = threads;
        //pushing each returned latest reply to the replies$ array
        this.threads$.forEach((element: { threadID: any }, index: any) => {
          //get latest reply
          this.topicService.getLastestReply(this.topicID$, element.threadID).subscribe(reply => {
            this.replies$[index] = reply[0];
            if(reply.length != 0){
              this.getDisplayName(index, this.replies$[index]['from']);
            }
          })
        });
      }
    });

    //getting a single topic for the navigation
    this.topicService.getSingleTopic(this.topicID$).subscribe((topics) => {
      if (topics) {
        this.topics$ = topics.data();
      }
    });

    this.topicService.getSingleTopic(this.topicID$).subscribe( result => {
      if(result){
        this.description = result.get('description');
      }
    })
  }

  getDisplayName(i: number, id: string) {
    this.authService.getSingleUser(this.replies$[i].from).subscribe((result) => {
        //console.log(result.get('displayName'));
        this.authors[i] = result.get('displayName');
      });
  }

  onClickEdit(i: number) {
    this.inEdit = 1;
    this.threadToEdit = this.threads$[i];
  }

  editComplete(value: any){
    this.inEdit = value;
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
