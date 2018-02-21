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
  
  // function to call the login API
  submitLogin(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/login', data);
  }

  // function to call the signUp/Registration API
  signUp(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user', data);
  }

  // function to call the forgot password API
  submitForgotPassword(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/forgot-password', data);
  }

  // function to call the change password API
  submitChangePassword(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/change-password', data);
  }

  // function to get the league data from the API
  getLeagueData() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league');
  }

  // function to get the group data from the API
  getGroups() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group');
  }

  // function to call API to delete league
  deleteLeague(id){
    return this.http.delete('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/'+id);
  }

  // function to call API to update existing league
  updateLeague(id,data){
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/'+id,data);
  }

  // function to call API to add new league
  addNewLeague(data){
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league',data);
  }

  // function to call API to save profile of the user
  saveProfile(id, data) {
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id, data);
  }

  // function to call API to get user data
  getUser(id) {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/' + id);
  }

  // function to call API to get group data
  getGroupData() {
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group');
  }

  // function to call API to delete group
  deleteGroup(id) {
    return this.http.delete('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group/'+id);

  }

  // function to call API to update existing group
  updateGroup(id,data){
    return this.http.put('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group/'+id,data);
  }

  // function to call API to add new group
  addNewGroup(data){
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/league/group',data)
  }

  // function to call API to get player data
  getPlayerData(){
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user?q=players');
  }

  getLeaguePlayerData(id){
    return this.http.get('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/'+id+'/categories/');
  }

}
