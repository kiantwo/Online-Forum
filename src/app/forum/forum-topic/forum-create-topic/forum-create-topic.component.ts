import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat/app';


@Component({
  selector: 'app-forum-create-topic',
  templateUrl: './forum-create-topic.component.html',
  styleUrls: ['./forum-create-topic.component.css']
})
export class ForumCreateTopicComponent implements OnInit {


  form = this.fb.group({
    topicID: [''],
    name:['', [Validators.required, Validators.pattern("[a-zA-z ()]+")]],
    description: ['',[Validators.required, Validators.minLength(2), Validators.pattern("[0-9a-zA-z ().,?\'\"]+"), Validators.maxLength(350)]],

  })

  constructor(private fb: FormBuilder, private topicService: TopicService, private storage: AngularFireStorage) { }

  uploadFile(event: any){
    const file = event.target.files[0];
    // const filePath = '/photos'
    // const task = this.storage.upload(filePath,file);
    console.log(file.name);
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const payload: Topic = {
      topicID: '',
      description: this.f.description.value,
      name: this.f.name.value,
      dateCreated: firebase.default.firestore.FieldValue.serverTimestamp()
    };
    
    this.topicService.addTopic(payload);
    this.form.reset();
    this.onClose();
  }

  get f(){
    return this.form.controls;
  }

  onClose(){
    if( document.getElementById("topicName").classList.contains('ng-touched') ){
      this.f.name.markAsUntouched();
    }
    
    if ( document.getElementById("description").classList.contains('ng-touched') ){
      this.f.description.markAsUntouched();
    }
  }


}
