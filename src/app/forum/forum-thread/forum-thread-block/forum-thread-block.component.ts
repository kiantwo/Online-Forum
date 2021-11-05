import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faReply, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-block',
  templateUrl: './forum-thread-block.component.html',
  styleUrls: ['./forum-thread-block.component.css']
})
export class ForumThreadBlockComponent implements OnInit {
  //fontAwesome icons
  faReply = faReply;
  faClock = faClock;
  faCommentDots = faCommentDots;
  faEdit = faEdit;
  faDelete = faTrashAlt;

  //@Input() replies$: any;
  @Input() reply: any;
  @Input() index: any;
  @Output() quotedReply = new EventEmitter<any>();

  from: any;
  to: any;
  topicID: any;
  threadID: any;
  currentUserID: any;

  constructor(private route: ActivatedRoute, public topicService: TopicService, public authService: AuthService) {
    this.topicID = 'YFb7yHbbsy0EfujSESXV' //(for test purposes) -- general discussion topicID
    this.threadID = this.route.snapshot.paramMap.get('id');
    this.currentUserID = JSON.parse(localStorage.getItem('user') || '').uid;
  }

  ngOnInit(): void {
    //get userdata in reply
    this.authService.getSingleUser(this.reply.from).subscribe(result => {
      this.from = {
        displayName: result.get('displayName'),
        email: result.get('email'),
        photoURL: result.get('photoURL')
      }
    })

    //if user is replying to another user
    if (this.reply.to) {
      //get user displayName
      this.authService.getSingleUser(this.reply.to).subscribe(result => {
        //get message
        this.topicService.getSingleReply(this.topicID, this.threadID, this.reply.toReplyID).subscribe(reply => {
          this.to = {
            displayName: result.get('displayName'),
            message: reply.get('message')
          }
        })
      })
    }
  }

  //output index of the specific reply that user wants to quote and reply to
  onReply(i: number) {
    this.quotedReply.emit(i);
  }
}
