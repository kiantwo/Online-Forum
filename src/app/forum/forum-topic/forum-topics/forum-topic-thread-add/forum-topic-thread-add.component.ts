import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Thread } from 'src/app/shared/services/topic';
import { TopicService } from 'src/app/shared/services/topic.service';
import * as firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-topic-thread-add',
  templateUrl: './forum-topic-thread-add.component.html',
  styleUrls: ['./forum-topic-thread-add.component.css']
})
export class ForumTopicThreadAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private topicService: TopicService,  private route: ActivatedRoute,) { }

  topicID: any;
  currentUserID: any;

  ngOnInit(): void {

    this.topicID = this.route.snapshot.paramMap.get('id');
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;

  }

  form = this.fb.group({
    dateCreated: [''],
    lastPost: [''],
    poster: [''],
    threadID: [''],
    title:[''],
  })

  onSubmit(){
    const payload: Thread = {
      threadID: '',
      lastPost: '',
      poster: this.currentUserID,
      dateCreated: firebase.default.firestore.FieldValue.serverTimestamp(),
      title: this.f.title.value,
    };

    this.topicService.addThread(payload, this.topicID);
    this.form.reset();
  }


  get f(){
    return this.form.controls;
  }


}
