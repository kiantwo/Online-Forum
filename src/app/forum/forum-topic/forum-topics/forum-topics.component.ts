import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-topics',
  templateUrl: './forum-topics.component.html',
  styleUrls: ['./forum-topics.component.css']
})
export class ForumTopicsComponent implements OnInit {
  topic$: any[] = [];
  topicToEdit: any;
  topicIndex: number = 0;
  inEdit: boolean = false;

  

  constructor(public topicSerivce: TopicService) { }

  ngOnInit(): void {
    //retreive topics using topicSerivce from firestore and assign it to topic$
    this.topicSerivce.getTopics().subscribe((value) => {
      this.topic$ = value;
    });
  }

  onClick(i: number){
    console.log(i);
    this.topicToEdit = this.topic$[i];
    this.inEdit = true;
    this.topicIndex = i;

  }

  editComplete(value: any){
    this.inEdit = value;
  }

}
