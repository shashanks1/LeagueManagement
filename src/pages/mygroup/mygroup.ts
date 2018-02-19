import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-mygroup',
  templateUrl: 'mygroup.html',
})
export class MyGroupPage {
  modificationForm: FormGroup;
  addGroup: boolean;
  editGroupValue: boolean;

  noGroupData: boolean;
  groupData: Array<any>;
  playerData: Array<any>;
  editValue: any;
  testarray: Array<any>;
  successMessage: string;
  errorMessage: string;
  userEmail: string;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
    }
    this.addGroup = false;
    this.editGroupValue = false;
    this.noGroupData = false;
    this.editValue = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.groupData = [];
    this.playerData = [];
    this.modificationForm = fb.group({
      'group_name': [null, Validators.required],
      'players': [null, Validators.required]
    });

    this.getGroupData();
    this.getPlayerData();
  }

  //function to get player data from API
  getPlayerData() {
    this.service.getPlayerData().subscribe((res: any[]) => {
      this.playerData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  //function to get group data from API for mygroup page
  getGroupData() {
    this.noGroupData = false;
    this.service.getGroupData().subscribe((res: any[]) => {
      this.groupData = res;
      if (this.groupData.length == 0)
        this.noGroupData = true;
      else
        this.noGroupData = false;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  //function to open Add new group form
  addNewGroup() {
    this.modificationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.addGroup = true;
    this.editGroupValue = false;
  }

  //function to cancel adding or editing group form
  backToGroup() {
    this.modificationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.addGroup = false;
    this.editGroupValue = false;
  }

  //function to open edit group form
  editGroup(editValue) {
    this.successMessage = '';
    this.errorMessage = '';
    this.editGroupValue = true;
    this.addGroup = false;
    this.editValue = editValue;
    let selectedGroup = []
    editValue.players.forEach(function (obj) {
      selectedGroup.push(obj.id);
    });
    editValue.players = selectedGroup;

    this.modificationForm.setValue({
      'group_name': editValue.group_name,
      'players': editValue.players

    })
  }

  //function to submit added and edited group to the API
  submitNewGroup(postData) {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.addGroup) {
      this.service.addNewGroup(postData).subscribe((res: any[]) => {
        this.modificationForm.reset();
        this.getGroupData();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editGroupValue = false;
        this.addGroup = false;

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
    else {
      this.service.updateGroup(this.editValue.id, postData).subscribe((res: any[]) => {
        this.modificationForm.reset();
        this.getGroupData();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editGroupValue = false;
        this.addGroup = false;

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
  }

  //function to delete group
  deleteGroup(id) {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.deleteGroup(id).subscribe((res: any[]) => {
      this.successMessage = JSON.stringify(res['res']);
      this.successMessage = JSON.parse(this.successMessage);
      this.getGroupData()
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  //function to redirect to home page
  openHomePage() {
    this.navCtrl.push(HomePage);
  }

  //function to logout of the application
  logout() {
    sessionStorage.setItem("loginDone", null);
    sessionStorage.setItem("loggedUserId", null);
    sessionStorage.setItem("loggedUserName", null);
    this.navCtrl.push(HomePage);
  }
}
