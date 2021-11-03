import { Component, OnInit } from '@angular/core';
import { faClock, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forum-thread-block',
  templateUrl: './forum-thread-block.component.html',
  styleUrls: ['./forum-thread-block.component.css']
})
export class ForumThreadBlockComponent implements OnInit {
  faReply = faReply;
  faClock = faClock;
  faCommentDots = faCommentDots;

  constructor() { }

  ngOnInit(): void {
  }

}
