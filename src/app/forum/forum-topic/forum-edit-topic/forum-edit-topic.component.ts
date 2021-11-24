import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';



@Component({
  selector: 'app-forum-edit-topic',
  templateUrl: './forum-edit-topic.component.html',
  styleUrls: ['./forum-edit-topic.component.css']
})
export class ForumEditTopicComponent implements OnInit, OnChanges {
 
  @Input() topicToEdit: any;
  //editForm: FormGroup;
  editForm: any;
  @Output() editStatus = new EventEmitter<boolean>();
    



  constructor(private fb: FormBuilder, private topicService: TopicService) {}
  

  ngOnInit(): void {
    this.goToBottom();
    this.editForm = this.fb.group({
      topicID: [this.topicToEdit.topicID],
      name:[this.topicToEdit.name],
      description: [this.topicToEdit.description],
    });
  }

  ngOnChanges(): void{
    this.goToBottom();
    this.editForm = this.fb.group({
      topicID: [this.topicToEdit.topicID],
      name:[this.topicToEdit.name],
      description: [this.topicToEdit.description],

    });
  }


  onSubmitChanges(){
    const payload: Topic = {
      topicID: this.f.topicID.value,
      description: this.f.description.value,

      name: this.f.name.value,

    };
    
    this.topicService.editTopic(payload.topicID, payload);
    this.editForm.reset();
    this.onClose();
  }

  get f(){
    return this.editForm.controls;
  }

  onClose(){
    this.editStatus.emit(false);
  }

  onDeleteTopic(status: boolean){
    this.editStatus.emit(status);
  }


  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
