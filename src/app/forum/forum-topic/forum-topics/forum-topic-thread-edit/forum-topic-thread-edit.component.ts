import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-forum-topic-thread-edit',
  templateUrl: './forum-topic-thread-edit.component.html',
  styleUrls: ['./forum-topic-thread-edit.component.css']
})
export class ForumTopicThreadEditComponent implements OnInit {

  constructor() { }

  @Input() topicToEdit: any;
  //editForm: FormGroup;
  editForm: any;
  @Output() editStatus = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

}
