import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {

  topics$: any;
  threads$: any;

  constructor(public authService: AuthService, public afs: AngularFirestore, public topicService: TopicService) { }

  ngOnInit(): void {

  }

}
