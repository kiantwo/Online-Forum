import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Topic } from 'src/app/shared/services/topic';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-delete',
  templateUrl: './forum-delete.component.html',
  styleUrls: ['./forum-delete.component.css']
})
export class ForumDeleteComponent implements OnInit {

@Input() topicId: string;
@Input() topicTitle: string;
@Output() deleteStatus = new EventEmitter<boolean>();


  constructor(private topicServer: TopicService) { }

  ngOnInit(): void {}

  onDelete(id: string){
    this.topicServer.deleteTopic(id);
    this.deleteStatus.emit(false);
  }



}
