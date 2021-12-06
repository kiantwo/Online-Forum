import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
  topics$: any = [];
  description: any;
  posters: any = [];
  
  
  threads$: any = [];
  replies$: any = [];
  authors: any = [];
  

  inEdit: any = 0;
  threadToEdit: any;

  isAdmin = false;
  currentUserID: any;

  operation = "2";
  unsubscribe: any;

  @Input() topicIndex: any;

  constructor(
    public afs: AngularFirestore,
    public topicService: TopicService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private router: Router
  ) {
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;
  }

  ngOnInit(): void {
    this.topicID$ = this.route.snapshot.paramMap.get('id');
    this.isAdmin = this.authService.isAdmin;

    //getting a single topic for the navigation
    this.unsubscribe = this.topicService.getSingleTopic(this.topicID$).subscribe((topics) => {
      if (topics.exists) {
        this.topics$ = topics.data();
        this.description = topics.get('description');

        //getting the threads from a topic
        this.topicService.getThreads(this.topicID$).subscribe((threads) => {
          if (threads) {
            this.threads$ = threads;
            //pushing each returned latest reply to the replies$ array as well as its poster
            this.threads$.forEach((element: { threadID: any }, index: any) => {
              this.getPosterName(index, this.threads$[index].poster);
              //get latest reply
              this.topicService.getLastestReply(this.topicID$, element.threadID).subscribe(reply => {
                this.replies$[index] = reply[0];
                if (reply.length != 0) {
                  this.getDisplayName(index, this.replies$[index]['from']);
                }
              })
            });
          }
        });
      }
      
      else {
        this.router.navigate(['404']);
      }
    });
  }

  //getting display name of the last reply user
  getDisplayName(i: number, id: string) {
    this.authService.getSingleUser(this.replies$[i].from).subscribe((result) => {
      //console.log(result.get('displayName'));
      this.authors[i] = result.get('displayName');
    });
  }

  //getting display name of the thread poster
  getPosterName(i: number, id: string) {
    this.authService.getSingleUser(this.threads$[i].poster).subscribe(result => {
      this.posters[i] = result.get('displayName');
    });
  }

  //get thread to edit, and show the editForm
  onClickEdit(i: number) {
    this.inEdit = 1;
    this.threadToEdit = this.threads$[i];
  }

  //shows/hides the edit form
  editComplete(value: any) {
    this.inEdit = value;
  }

  //scroll to bottom
  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
