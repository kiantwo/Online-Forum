import { Component, Input, OnInit } from '@angular/core';
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
  replies$: any []= [];
  authors: any = [];
  show: any = [];


  inEdit: any = 0;

  @Input() topicIndex: any;

  constructor(
    public afs: AngularFirestore,
    public topicService: TopicService,
    private route: ActivatedRoute,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.topicID$ = this.route.snapshot.paramMap.get('id');
    //getting the threads
    this.topicService.getThreads(this.topicID$).subscribe(threads => {
      if (threads) {
        this.threads$ = threads;
        
        //pushing each returned latest reply to the replies$ array
        this.threads$.forEach((element: { threadID: any; }, index: any) => {
          this.topicService.getReplies(this.topicID$, element.threadID).subscribe(replies => {
            if(replies){
              if(replies.length != 0){
                this.show.push(1);
                
              }
              else{
                this.show.push(0);
              }           
              this.replies$.push(replies[replies.length - 1]); 
              if(replies.length != 0)
                this.getDisplayName();
            }
          })

          
        });
        
      }
    });

    

    //getting a single topic for the navigation
    this.topicService.getSingleTopic(this.topicID$).subscribe( topics => {
      if(topics){
        this.topics$ = topics.data();
      }
    })

    
  }



  getDisplayName(){

      let index = this.replies$.length - 1;
      this.authService.getSingleUser(this.replies$[index].from).subscribe(result => {
        //console.log(result.get('displayName'));
        this.authors.push(result.get('displayName'));
      })
    
   
  }

  onClickEdit(){  
      this.inEdit = 1;
  }
}
