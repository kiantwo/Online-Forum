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

  addTopic(topic: Topic) {
    const pushkey = this.afs.createId();
    topic.topicID = pushkey;
    this.topicCollection.doc(pushkey).set(topic);
  }

  getTopics() {
    return this.topic$;
  }

  getThreads(topicID: any) {
    const threadCollection = this.afs.collection('topics/' + topicID + '/threads');
    const thread$ = threadCollection.valueChanges();

    return thread$;
  }

  getReplies(topicID: any, threadID: any) {
    const repliesCollection = this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies', (ref) => ref.orderBy('datePosted'));
    const replies$ = repliesCollection.valueChanges();

    return replies$;
  }

  deleteTopic() {
    this.topicCollection.doc()
  }

  editTopic(topicID: string, topicChanges: Topic) {
    this.topicCollection.doc(topicID).update(topicChanges);
  }
}
