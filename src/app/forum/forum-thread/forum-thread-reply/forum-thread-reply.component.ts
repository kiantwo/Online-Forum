import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Reply } from 'src/app/shared/services/topic';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-reply',
  templateUrl: './forum-thread-reply.component.html',
  styleUrls: ['./forum-thread-reply.component.css']
})
export class ForumThreadReplyComponent implements OnInit {
  @Input() quotedReply: any;
  @Output() onClose = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<any>();

  quotedDisplayName: any;

  form = this.fb.group({
    replyID: [''],
    message: ['', [Validators.required]],
    to: [''],
    toReplyID: [''],
  });

  threadID: any;
  topicID: any;
  currentUserID: any;

  buttonPressed = false;
  hasChange = false;

  constructor(private route: ActivatedRoute, private topicService: TopicService, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.goToBottom();
    this.threadID = this.route.snapshot.paramMap.get('tid');
    this.topicID = this.route.snapshot.paramMap.get('id');
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;
  }

  ngOnChanges() {
    //get displayName of recipient
    if (this.quotedReply) {
      this.authService.getSingleUser(this.quotedReply.from).subscribe(result => {
        if (result) {
          this.quotedDisplayName = result.get('displayName');
        }
      })
      this.onFormValueChange();
    }

    else {
      //set null if user not replying to anyone
      this.quotedDisplayName = '';
      this.quotedReply = {
        from: '',
        replyID: '',
      }
    }
  }

  onFormValueChange() {
    const initialValue = this.form.value
    this.form.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.form.value[key] !=
        initialValue[key])

      //set buttonPressed back to false if user changes input
      if (this.hasChange) {
        this.buttonPressed = false;
      }
    });
  }

  onSubmit() {
    this.buttonPressed = true;

    if (this.form.valid) {
      const reply: Reply = {
        replyID: '',
        message: this.f.message.value,
        to: this.quotedReply.from,
        toReplyID: this.quotedReply.replyID,
        from: this.currentUserID,
        datePosted: firebase.default.firestore.FieldValue.serverTimestamp()
      }

      this.topicService.addReply(reply, this.topicID, this.threadID);
      this.success.emit();
    }
  }
  
  closeEvent(close: boolean) {
    this.onClose.emit(close);
  }

  get f() {
    return this.form.controls;
  }

  get message() {
    return this.form.controls.message;
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
