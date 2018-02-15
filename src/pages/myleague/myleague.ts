import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-myleague',
  templateUrl: 'myleague.html',
})
export class MyleaguePage {
  modificationForm: FormGroup;
  addLeague: boolean;
  editLeague: boolean;
  leagueData: Array<any>;
  groupsData: Array<any>;
  editValue: any;
  testarray: Array<any> = [];
  successMessage: string;
  errorMessage: string;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.addLeague = false;
    this.editLeague = false;
    this.editValue = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.leagueData = [];
    this.groupsData = [];

    this.modificationForm = fb.group({
      'league_name': [null, Validators.required],
      'description': [null],
      'league_location': [null],
      'round_robin_period_from': [null],
      'round_robin_period_to': [null],
      'playoff_period_from': [null],
      'playoff_period_to': [null],
      'categories': [null, Validators.required],
      'groups': [null],
      'scoring_point': [null]
    });

    this.getLeagueData();
    this.getGroups();
  }

  getLeagueData() {
    this.service.getLeagueData().subscribe((res: any[]) => {
      this.leagueData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  getGroups() {
    this.service.getGroups().subscribe((res: any[]) => {
      this.groupsData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  addNewLeague() {
    this.successMessage = '';
    this.errorMessage = '';
    this.addLeague = true;
    this.editLeague = false;
  }

  backToListing() {
    this.successMessage = '';
    this.errorMessage = '';
    this.addLeague = false;
    this.editLeague = false;
  }

  editLeagueFunc(editValue) {
    this.successMessage = '';
    this.errorMessage = '';
    this.editLeague = true;
    this.addLeague = false;
    this.editValue = editValue;
    let selectedGroup = []
    editValue.groups.forEach(function (obj) {
      selectedGroup.push(obj.id);
    });
    editValue.groups = selectedGroup;

    this.modificationForm.setValue({
      'league_name': editValue.league_name,
      'league_location': editValue.league_location,
      'description': editValue.description,
      'round_robin_period_from': editValue.round_robin_period_from,
      'round_robin_period_to': editValue.round_robin_period_to,
      'playoff_period_from': editValue.playoff_period_from,
      'playoff_period_to': editValue.playoff_period_to,
      'categories': editValue.categories,
      'groups': editValue.groups,
      'scoring_point': editValue.scoring_point
    })
  }

  submitNewLeague(postData) {
    this.testarray = [];
    this.testarray.push(postData.players);
    postData.players = this.testarray;

    this.successMessage = '';
    this.errorMessage = '';
    if (this.addLeague) {
      this.service.addNewLeague(postData).subscribe((res: any[]) => {
        this.getLeagueData();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editLeague = false;
        this.addLeague = false;

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
    else {

      this.service.updateLeague(this.editValue.id, postData).subscribe((res: any[]) => {
        this.getLeagueData();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editLeague = false;
        this.addLeague = false;

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })

    }
  }

  deleteLeague(id) {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.deleteLeague(id).subscribe((res: any[]) => {
      this.successMessage = JSON.stringify(res['res']);
      this.successMessage = JSON.parse(this.successMessage);
      this.getLeagueData()
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }
}

