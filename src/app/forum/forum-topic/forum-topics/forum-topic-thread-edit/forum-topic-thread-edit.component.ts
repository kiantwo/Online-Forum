import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/app/shared/services/topic';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-topic-thread-edit',
  templateUrl: './forum-topic-thread-edit.component.html',
  styleUrls: ['./forum-topic-thread-edit.component.css']
})
export class ForumTopicThreadEditComponent implements OnInit, OnChanges {

  constructor(private fb: FormBuilder, private topicService: TopicService, private route: ActivatedRoute,) { }

  //editForm: FormGroup;
  @Input() threadToEdit: any;
  editForm: any;
  @Output() editStatus = new EventEmitter<number>();
  topicID$: any;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: [this.threadToEdit.title, [Validators.required, Validators.pattern("[0-9a-zA-z ()]+"), Validators.minLength(2), Validators.maxLength(30)]]
    });
    this.topicID$ = this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges(): void {
    this.editForm = this.fb.group({
      title: [this.threadToEdit.title, [Validators.required, Validators.pattern("[0-9a-zA-z ()]+"), Validators.minLength(2), Validators.maxLength(30)]]
    })
  }

  onSubmitChanges(){
    const payload: Thread = {
      dateCreated: this.threadToEdit.dateCreated,
      poster: this.threadToEdit.poster,
      threadID: this.threadToEdit.threadID,
      title: this.f.title.value,
    }
    this.topicService.editThread(this.topicID$, this.threadToEdit.threadID, payload);
    this.editStatus.emit(0);
  }

  onClose(){
    this.editStatus.emit(0);
  }

  editComplete(value: any){
    this.onClose();
  }

  get f(){
    return this.editForm.controls;
  }

}
