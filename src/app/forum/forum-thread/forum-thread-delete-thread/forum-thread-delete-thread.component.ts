import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-delete-thread',
  templateUrl: './forum-thread-delete-thread.component.html',
  styleUrls: ['./forum-thread-delete-thread.component.css']
})
export class ForumThreadDeleteThreadComponent implements OnInit {
  @Input() topicID: any;
  @Input() threadID: any;

  constructor(private topicService: TopicService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.topicService.deleteThread(this.topicID, this.threadID);
    this.router.navigate(["../.."], {relativeTo: this.route});
  }
}
