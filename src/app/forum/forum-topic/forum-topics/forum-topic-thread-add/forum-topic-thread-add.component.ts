import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Thread, Reply } from 'src/app/shared/services/topic';
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
  latestThread$: any;
  latestThreadID$: any;

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
  replyForm = this.fb.group({
    from: [''],
    message: [''],
    replyID: [''],
    to: [''],
    toReplyID: [''],
    datePosted: [''],
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
    this.includeMyReply();
    
  }

  includeMyReply(){
    const repyPayload: Reply = {
      replyID: '',
      message: this.r.message.value,
      to: '',
      toReplyID: '',
      from: this.currentUserID, 
      datePosted: firebase.default.firestore.FieldValue.serverTimestamp(),
    }
    let subscription = this.topicService.getThreads(this.topicID).subscribe(result =>{
      this.latestThread$ = result[0];
      this.topicService.addReply(repyPayload, this.topicID, this.latestThread$.threadID);
      subscription.unsubscribe();
    });

    
    this.replyForm.reset();

  }


  get f(){
    return this.form.controls;
  }

  get r(){
    return this.replyForm.controls;
  }


}
