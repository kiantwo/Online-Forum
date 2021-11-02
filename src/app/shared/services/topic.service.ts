import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Topic } from '../services/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private topicCollection: AngularFirestoreCollection<Topic>;
  topic$!: Observable<Topic[]>;

  constructor(private afs: AngularFirestore) {
    this.topicCollection = this.afs.collection<Topic>('topics');
    this.topic$ = this.topicCollection.valueChanges();
   }

   addTopic(topic: Topic){
     const pushkey = this.afs.createId();
     topic.topicID = pushkey;
     this.topicCollection.doc(pushkey).set(topic);
   }

   getTopics(){
     return this.topic$;
   }



}
