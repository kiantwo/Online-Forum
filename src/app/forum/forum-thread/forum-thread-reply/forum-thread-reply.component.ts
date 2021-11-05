import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forum-thread-reply',
  templateUrl: './forum-thread-reply.component.html',
  styleUrls: ['./forum-thread-reply.component.css']
})
export class ForumThreadReplyComponent implements OnInit {
  @Input() quotedReply: any;
  @Output() onClose = new EventEmitter<boolean>();

  quotedDisplayName: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void { }

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
    }
  }

  closeEvent(close: boolean) {
    this.onClose.emit(close);
  }
}
