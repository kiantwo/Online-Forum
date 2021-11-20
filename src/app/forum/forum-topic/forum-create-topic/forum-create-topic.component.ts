import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';
import { FormBuilder } from '@angular/forms';


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
    access:[''],
    imageUrl: [''],
  })

  constructor(private fb: FormBuilder, private topicService: TopicService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const payload: Topic = {
      topicID: '',
      description: this.f.description.value,
      imageUrl: '',
      name: this.f.name.value,
      access: this.f.access.value,
    };
    
    this.topicService.addTopic(payload);
    this.form.reset();
  }

  get f(){
    return this.form.controls;
  }

}
