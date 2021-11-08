import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-reply',
  templateUrl: './forum-thread-reply.component.html',
  styleUrls: ['./forum-thread-reply.component.css']
})
export class ForumThreadReplyComponent implements OnInit {
  @Input() quotedReply: any;
  @Output() onClose = new EventEmitter<boolean>();

  quotedDisplayName: any;

  form = this.fb.group({
    replyID: [''],
    message: [''],
    to: [''],
    toReplyID: [''],
  });

  threadID: any;
  topicID: any;
  currentUserID: any;

  constructor(private route: ActivatedRoute, private topicService: TopicService, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.threadID = this.route.snapshot.paramMap.get('id');
    this.topicID = 'YFb7yHbbsy0EfujSESXV';
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

  onSubmit() {
    const reply: any = {
      replyID: '',
      message: this.f.message.value,
      to: this.quotedReply.from,
      toReplyID: this.quotedReply.replyID,
      from: this.currentUserID,
      datePosted: firebase.default.firestore.FieldValue.serverTimestamp()
    }

    this.topicService.addReply(reply, this.topicID, this.threadID);
    this.closeEvent(false);
  }

  closeEvent(close: boolean) {
    this.onClose.emit(close);
  }

  get f() {
    return this.form.controls;
  }
}
