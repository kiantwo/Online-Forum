import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEnvelope, faReply } from '@fortawesome/free-solid-svg-icons';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-delete-reply',
  templateUrl: './forum-thread-delete-reply.component.html',
  styleUrls: ['./forum-thread-delete-reply.component.css']
})
export class ForumThreadDeleteReplyComponent implements OnInit {
  faReply = faReply;
  faEnvelope = faEnvelope;

  @Input() reply: any;
  @Input() from: any;
  @Output() success = new EventEmitter<any>();

  topicID: any;
  threadID: any;

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicID = 'YFb7yHbbsy0EfujSESXV' //(for test purposes) -- general discussion topicID
    this.threadID = this.route.snapshot.paramMap.get('tid');
  }

  onDelete() {
    this.success.emit();
    this.topicService.deleteReply(this.reply.replyID, this.topicID, this.threadID);
  }

}
