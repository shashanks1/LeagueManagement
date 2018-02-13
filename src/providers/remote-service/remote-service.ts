import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    public http: HttpClient,
    private _firebaseAuth: AngularFireAuth
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  submitLogin(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/login', data);
  }

  signUp(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user', data);
  }

  submitForgotPassword(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/forgot-password', data);
  }

  submitChangePassword(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/change-password', data);
  }

  getLeagueData() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league');
  }

  deleteLeague(id) {
    return this.http.delete('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/{id}');
  }

  saveProfile(id, data) {
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id, data);
  }

  getUserData(id) {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id);
  }
}
