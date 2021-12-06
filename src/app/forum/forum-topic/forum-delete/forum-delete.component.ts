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

@Input() operation: string = "1";


  constructor(private topicServer: TopicService) { }

  ngOnInit(): void {}



  //operation 1 is when this component is called from the edit form, thus emitting status false to hide the edit form once a topic has been deleted
  //operation 2 is when this component is called from forum-topic-thread (deleting the topic from thread lists), so no more hiding the edit form
  onDelete(id: string){
    if (this.operation == "1"){
      this.topicServer.deleteTopic(id);
      this.deleteStatus.emit(false);
    }
    else{
      this.topicServer.deleteTopic(id);
    }
  }



}
