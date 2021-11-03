import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopicService } from 'src/app/shared/services/topic.service';
import { Topic } from 'src/app/shared/services/topic';


@Component({
  selector: 'app-forum-edit-topic',
  templateUrl: './forum-edit-topic.component.html',
  styleUrls: ['./forum-edit-topic.component.css']
})
export class ForumEditTopicComponent implements OnInit {
 
  //@Input() topicToEdit: Topic;
  //editForm: FormGroup;
  editForm: any;
    



  constructor(private fb: FormBuilder, private topicService: TopicService) {
    console.log("I AM HERE!");
  }
  

  ngOnInit(): void {
    this.editForm = this.fb.group({
      topicID: [''],
      name:[''],
      description: [''],
      access:[''],
      imageUrl: [''],
    });
    console.log("I SEOCOND");
  }


  onSubmitChanges(){
    const payload: Topic = {
      topicID: this.f.topicID.value,
      description: this.f.description.value,
      imageUrl: '',
      name: this.f.name.value,
      access: this.f.access.value,
    };
    
    this.topicService.editTopic(payload.topicID, payload);
    this.editForm.reset();
  }

  get f(){
    return this.editForm.controls;
  }

  onClick(){
    console.log("I'm Clicked!");
    //console.log(this.topicToEdit);
  }
}
