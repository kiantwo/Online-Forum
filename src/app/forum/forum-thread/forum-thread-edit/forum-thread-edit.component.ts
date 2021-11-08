import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-forum-thread-edit',
  templateUrl: './forum-thread-edit.component.html',
  styleUrls: ['./forum-thread-edit.component.css']
})
export class ForumThreadEditComponent implements OnInit {
  @Input() replyToEdit: any;
  @Output() onClose = new EventEmitter<any>();

  editForm!: FormGroup;

  threadID: any;
  topicID: any;
  existingMessage: any;

  constructor(private topicService: TopicService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.threadID = this.route.snapshot.paramMap.get('id');
    this.topicID = 'YFb7yHbbsy0EfujSESXV';

    this.editForm = this.fb.group({
      message: [this.replyToEdit.message]
    })
  }

  ngOnChanges(): void {
    this.editForm = this.fb.group({
      message: [this.replyToEdit.message]
    })
  }

  onSubmit() {
    const newMessage = this.f.message.value;

    this.topicService.editReply(newMessage, this.replyToEdit.replyID, this.topicID, this.threadID);
    this.closeEvent(false);
  }

  closeEvent(close: boolean) {
    this.onClose.emit(close);
  }

  get f() {
    return this.editForm.controls;
  }
}
