import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-mygroup',
  templateUrl: 'mygroup.html',
})
export class MygroupPage {
  modificationForm: FormGroup;
  addGroup: boolean;
  editGroup: boolean;
  groupData: Array<any>;
  playerData: Array<any>;
  editValue: any;
  testarray: Array<any>;
  successMessage: string;
  errorMessage: string;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.addGroup = false;
    this.editGroup = false;
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

  getPlayerData() {
    this.service.getPlayerData().subscribe((res: any[]) => {
      this.playerData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  getGroupData() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.getGroupData().subscribe((res: any[]) => {
      this.groupData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  addNewGroup() {
    this.modificationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.addGroup = true;
    this.editGroup = false;
  }

  backToGroup() {
    this.modificationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.addGroup = false;
    this.editGroup = false;
  }

  editGroupFunc(editValue) {
    this.successMessage = '';
    this.errorMessage = '';
    this.editGroup = true;
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

  submitNewGroup(postData) {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.addGroup) {
      this.service.addNewGroup(postData).subscribe((res: any[]) => {
        this.modificationForm.reset();
        this.getGroupData();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editGroup = false;
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
        this.editGroup = false;
        this.addGroup = false;

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
  }

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
}
