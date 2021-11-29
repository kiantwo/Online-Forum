import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    poster: [''],
    threadID: [''],
    title:['', [Validators.required, Validators.pattern("[0-9a-zA-z ()]+"), Validators.minLength(2), Validators.maxLength(30)]],
  })
  replyForm = this.fb.group({
    from: [''],
    message: ['',[Validators.required, Validators.minLength(2)]],
    replyID: [''],
    to: [''],
    toReplyID: [''],
    datePosted: [''],
  })

  onSubmit(){
    const payload: Thread = {
      threadID: '',
      poster: this.currentUserID,
      dateCreated: firebase.default.firestore.FieldValue.serverTimestamp(),
      title: this.f.title.value,
    };

    this.topicService.addThread(payload, this.topicID);
    this.form.reset();
    this.includeMyReply();

    this.onClose();
    
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

  onClose(){
    if( document.getElementById("title").classList.contains('ng-touched') ){
      this.f.title.markAsUntouched();
    }
    
    if ( document.getElementById("reply").classList.contains('ng-touched') ){
      this.r.message.markAsUntouched();
    }
  }


}
