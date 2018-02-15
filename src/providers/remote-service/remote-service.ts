import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


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

  getGroups() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group');
  }

  deleteLeague(id){
    return this.http.delete('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/'+id);
  }

  updateLeague(id,data){
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/'+id,data);
  }

  addNewLeague(data){
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league',data);
  }

  saveProfile(id, data) {
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id, data);
  }

  getUser(id) {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id);
  }

  getGroupData() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group');
  }

  deleteGroup(id) {
    return this.http.delete('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group/'+id);

  }

  updateGroup(id,data){
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group/'+id,data);
  }

  addNewGroup(data){
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group',data)
  }

  getPlayerData(){
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user?q=players');
  }

}
