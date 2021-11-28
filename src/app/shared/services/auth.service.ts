import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
    //save user data in localstorage when logged in
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '');
      }

      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user') || '');
      }
    })
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {

      //set user role data to localStorage 'isAdmin' -- re-direct user to main page
      this.logUser();

    }).catch((err) => {
      window.alert(err.message);
    })
  }

  register(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
      //set result.displayName to user.displayName
      //(result.displayName will always be set to null on creation unless .updateProfile is called)
      result.user?.updateProfile({
        displayName: user.displayName
      })

      //set uid of user from '' to uid generated by result
      user.uid = result.user?.uid!;
      this.SetUserData(user);

      //set user role data to localStorage 'isAdmin' -- re-direct user to main page
      this.logUser();

    }).catch((err) => {
      window.alert(err.message)
    })
  }

  logUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user.uid).get().subscribe(result => {
          if (result) {
            //store isAdmin info to localStorage
            localStorage.setItem('isAdmin', result.get('isAdmin'));
          }
        });
        this.router.navigate(['main']);
      }
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    user.password = this.saltPassword(user.password);

    //assigning data to be stored in Firestore Database Document
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      password: user.password,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      dateRegistered: firebase.default.firestore.FieldValue.serverTimestamp()
    }

    //create document in Firestore Database
    return userRef.set(userData, {
      merge: true
    })
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      console.log(this.isLoggedIn);
      localStorage.removeItem('user');
      localStorage.removeItem('isAdmin');
      this.userData = null;
      this.router.navigate(['login']);
    })
  }

  saltPassword(password: any): any {
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user !== null ? true : false;
  }

  get isAdmin(): boolean {
    const role = JSON.parse(localStorage.getItem('isAdmin') || '');
    return role;
  }

  //get all users from firestore
  getUsers() {
    const usersCollection = this.afs.collection<User>('users', (ref) => ref.orderBy('dateRegistered', 'desc').where('isAdmin', '==', false));
    const user$ = usersCollection.valueChanges();
    return user$;
  }

  getSingleUser(uid: any) {
    return this.afs.collection('users').doc(uid).get();
  }

  banUser(uid: any, banStatus: boolean) {
    this.afs.collection('users').doc(uid).update({isBanned: banStatus});
  }
}
