import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-topic-thread',
  templateUrl: './forum-topic-thread.component.html',
  styleUrls: ['./forum-topic-thread.component.css'],
})
export class ForumTopicThreadComponent implements OnInit {
  topicID$: any;
  threads$: any;
  topics$: any = [];

  @Input() topicIndex: any;

  constructor(
    public afs: AngularFirestore,
    public topicService: TopicService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.topicID$ = this.route.snapshot.paramMap.get('id');
    

    //getting the threads
    this.topicService.getThreads(this.topicID$).subscribe(threads => {
      if (threads) {
        this.threads$ = threads;
      }
    });

    this.topicService.getSingleTopic(this.topicID$).subscribe( topics => {
      if(topics){
        this.topics$ = topics.data();
      }
    })
  }
}
