import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-topic-thread-delete',
  templateUrl: './forum-topic-thread-delete.component.html',
  styleUrls: ['./forum-topic-thread-delete.component.css']
})
export class ForumTopicThreadDeleteComponent implements OnInit {

  constructor(public topicService: TopicService) { }

  @Input() topicID: any;
  @Input() threadID: any;
  @Output() editStatus = new EventEmitter<number>();
  

  ngOnInit(): void {
  }

  onDelete(){
    this.topicService.deleteThread(this.topicID, this.threadID);
    this.editStatus.emit(0);
  }

}
