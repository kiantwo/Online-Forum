import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/compat';


@Component({
  selector: 'app-forum-create-topic',
  templateUrl: './forum-create-topic.component.html',
  styleUrls: ['./forum-create-topic.component.css']
})
export class ForumCreateTopicComponent implements OnInit {


  form = this.fb.group({
    topicID: [''],
    name:[''],
    description: [''],

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
    };
    
    this.topicService.addTopic(payload);
    this.form.reset();
  }

  get f(){
    return this.form.controls;
  }

}
