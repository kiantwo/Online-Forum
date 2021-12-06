import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopicService } from 'src/app/shared/services/topic.service';



@Component({
  selector: 'app-forum-edit-topic',
  templateUrl: './forum-edit-topic.component.html',
  styleUrls: ['./forum-edit-topic.component.css']
})
export class ForumEditTopicComponent implements OnInit, OnChanges {
 
  @Input() topicToEdit: any;
  editForm: any;
  @Output() editStatus = new EventEmitter<boolean>();
    



  constructor(private fb: FormBuilder, private topicService: TopicService) {}
  

  ngOnInit(): void {
    this.goToBottom();
    this.editForm = this.fb.group({
      topicID: [this.topicToEdit.topicID,],
      name:[this.topicToEdit.name,  [Validators.required, Validators.pattern("[a-zA-z ()]+")]],
      description: [this.topicToEdit.description, [Validators.required, Validators.minLength(2), Validators.pattern("[0-9a-zA-z ().,?\'\"]+"), Validators.maxLength(350)]],
    });
  }

  ngOnChanges(): void{
    this.goToBottom();
    this.editForm = this.fb.group({
      topicID: [this.topicToEdit.topicID, ],
      name:[this.topicToEdit.name, [Validators.required, Validators.pattern("[a-zA-z ()]+")]],
      description: [this.topicToEdit.description, [Validators.required, Validators.minLength(2), Validators.pattern("[0-9a-zA-z ().,?\'\"]+"), Validators.maxLength(350)]],

    });
  }


  onSubmitChanges(){
    const payload: any = {
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

  //upon closing make those elements back to untouched to hide the error/validator messages, and emit false to hide the edit form
  onClose(){
    if( document.getElementById("topicName").classList.contains('ng-touched') ){
      this.f.name.markAsUntouched();
    }
    
    if ( document.getElementById("description").classList.contains('ng-touched') ){
      this.f.description.markAsUntouched();
    }

    this.editStatus.emit(false);
  }

  //emit false to hide the edit form
  onDeleteTopic(status: boolean){
    this.editStatus.emit(status);
  }

  //scroll to bottom
  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
