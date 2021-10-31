import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;
  user$!: Observable<User[]>;

  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<User>('users');
    this.user$ = this.usersCollection.valueChanges();
   }

   register(user: User) {
     const pushkey = this.afs.createId();
     user.uid = pushkey;
     this.usersCollection.doc(pushkey).set(user);
   }

   getUsers() {
     return this.user$;
   }

   modifyUser(userId: string, userChanges: User) {
     this.usersCollection.doc(userId).update(userChanges);
   }

   removeStudent(userId: string) {
     this.usersCollection.doc(userId).delete();
   }
}
