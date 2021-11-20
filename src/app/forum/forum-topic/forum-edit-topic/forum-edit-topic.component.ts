import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';



@Component({
  selector: 'app-forum-edit-topic',
  templateUrl: './forum-edit-topic.component.html',
  styleUrls: ['./forum-edit-topic.component.css']
})
export class ForumEditTopicComponent implements OnInit {
 
  @Input() topicToEdit: any;
  //editForm: FormGroup;
  editForm: any;
  @Output() editStatus = new EventEmitter<boolean>();
    



  constructor(private fb: FormBuilder, private topicService: TopicService) {}
  

  ngOnInit(): void {
    this.editForm = this.fb.group({
      topicID: [this.topicToEdit.topicID],
      name:[this.topicToEdit.name],
      description: [this.topicToEdit.description],
      access:[this.topicToEdit.access],
      imageUrl: [''],
    });
  }


  onSubmitChanges(){
    const payload: Topic = {
      topicID: this.f.topicID.value,
      description: this.f.description.value,
      imageUrl: '',
      name: this.f.name.value,
      access: this.f.access.value,
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
}
