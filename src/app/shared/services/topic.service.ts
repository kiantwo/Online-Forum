import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Reply, Topic } from '../services/topic';
import * as firebase from 'firebase/compat/app';

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

  getSingleTopic(topicID: any) {
    return this.afs.collection('topics').doc(topicID).get();
  }

  getThreads(topicID: any) {
    const threadCollection = this.afs.collection('topics/' + topicID + '/threads');
    const thread$ = threadCollection.valueChanges();

    return thread$;
  }

  getSingleThread(topicID: any, threadID: any) {
    return this.afs.collection('topics/' + topicID + '/threads').doc(threadID).get();
  }

  getReplies(topicID: any, threadID: any) {
    const repliesCollection = this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies', (ref) => ref.orderBy('datePosted'));
    const replies$ = repliesCollection.valueChanges();

    return replies$;
  }

  getSingleReply(topicID: any, threadID: any, replyID: any) {
    return this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies').doc(replyID).get();
  }

  deleteTopic(topicID: any) {
    this.topicCollection.doc(topicID).delete();
  }

  editTopic(topicID: string, topicChanges: Topic) {
    this.topicCollection.doc(topicID).update(topicChanges);
  }

  addReply(reply: Reply, topicID: any, threadID: any) {
    const repliesCollection = this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies');
    const pushkey = this.afs.createId();
    reply.replyID = pushkey;
    repliesCollection.doc(pushkey).set(reply);
  }

  editReply(messageChanges: any, replyID: any, topicID: any, threadID: any) {
    const currentDate = firebase.default.firestore.FieldValue.serverTimestamp();
    const repliesCollection = this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies');
    repliesCollection.doc(replyID).update({ message: messageChanges, lastEdit: currentDate });
  }

  deleteReply(replyID: any, topicID: any, threadID: any) {
    const repliesCollection = this.afs.collection('topics/' + topicID + '/threads/' + threadID + '/replies');
    repliesCollection.doc(replyID).delete();
  }
}
