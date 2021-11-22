import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  buttonPressed = false;
  hasChange = false;

  constructor(private topicService: TopicService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.threadID = this.route.snapshot.paramMap.get('tid');
    this.topicID = 'YFb7yHbbsy0EfujSESXV';

    this.editForm = this.fb.group({
      message: [this.replyToEdit.message, [Validators.required]]
    })

    this.onFormValueChange();
  }

  ngOnChanges(): void {
    this.editForm = this.fb.group({
      message: [this.replyToEdit.message, [Validators.required]]
    })
    this.onFormValueChange();
  }

  onFormValueChange() {
    const initialValue = this.editForm.value
    this.editForm.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.editForm.value[key] !=
        initialValue[key])

      //set buttonPressed back to false if user changes input
      if (this.hasChange) {
        this.buttonPressed = false;
      }
    });

  }

  onSubmit() {
    this.buttonPressed = true;

    if (this.editForm.valid && this.replyToEdit.message !== this.f.message.value) {
      const newMessage = this.f.message.value;
      this.topicService.editReply(newMessage, this.replyToEdit.replyID, this.topicID, this.threadID);
      this.closeEvent(false);
    }

    else if(this.editForm.valid && this.replyToEdit.message === this.f.message.value) {
      this.closeEvent(false);
    }
  }

  closeEvent(close: boolean) {
    this.onClose.emit(close);
  }

  get f() {
    return this.editForm.controls;
  }

  get message() {
    return this.editForm.controls.message;
  }
}
