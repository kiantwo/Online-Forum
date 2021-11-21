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
  topic$: any;
  threads$: any[] = [];

  topicID: any = '';

  @Input() topicIndex: any;

  constructor(
    public afs: AngularFirestore,
    public topicService: TopicService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.topic$ = this.route.snapshot.paramMap.get('id');


    this.topicService.getSingleTopic(this.topic$).subscribe(topics => {
      if(topics){

        //getting the threads
        this.threads$ = Object.assign([], this.topicService.getThreads(this.topic$));



      }
    })
  }
}
