import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-myleague',
  templateUrl: 'myleague.html',
})
export class MyLeaguePage {
  modificationForm: FormGroup;
  addLeague: boolean;
  editLeagueValue: boolean;
  noLeagueData: boolean;
  leagueData: Array<any>;
  groupsData: Array<any>;
  editValue: any;
  testarray: Array<any> = [];
  successMessage: string;
  errorMessage: string;
  userEmail: string;
  is_admin: boolean;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
    }
    this.is_admin = false;

    if (JSON.parse(sessionStorage.getItem("is_admin")) == 'true') {
      this.is_admin = true;
      this.getLeagueData();
    }
    else {
      this.getLeaguePlayerData();
    }
    this.addLeague = false;
    this.editLeagueValue = false;
    this.noLeagueData = false;
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
      'scoring_point': [null],

    });

  }

  //function to get league data from API for myleague page
  getLeagueData() {

    this.noLeagueData = false;
    this.service.getLeagueData().subscribe((res: any[]) => {
      this.leagueData = res;
      if (this.leagueData.length == 0)
        this.noLeagueData = true;
      else
        this.noLeagueData = false;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });

  }

  //function to get group data from API
  getGroups() {
    this.service.getGroups().subscribe((res: any[]) => {
      this.groupsData = res;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  //function to open Add new league form
  addNewLeague() {
    this.modificationForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.addLeague = true;
    this.editLeagueValue = false;
  }

  //function to cancel adding or editing league form and go back to myleague page
  backToListing() {
    this.successMessage = '';
    this.errorMessage = '';
    this.addLeague = false;
    this.editLeagueValue = false;
  }

  //function to open Edit league form
  editLeague(editValue) {
    this.successMessage = '';
    this.errorMessage = '';
    this.editLeagueValue = true;
    this.addLeague = false;
    this.editValue = editValue;
    let selectedGroup = []
    if (editValue.groups) {
      editValue.groups.forEach(function (obj) {
        selectedGroup.push(obj.id);
      });
    }
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
      'scoring_point': editValue.scoring_point,
    })
  }

  //function to submit added and edited league to the API
  submitNewLeague(postData) {

    this.testarray = [];
    this.testarray.push(postData.players);
    postData.players = this.testarray;
    postData.created_by = JSON.parse(sessionStorage.getItem("loggedUserEmail"));


    this.successMessage = '';
    this.errorMessage = '';
    if (this.addLeague) {
      this.service.addNewLeague(postData).subscribe((res: any[]) => {
        this.modificationForm.reset();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editLeagueValue = false;
        this.addLeague = false;
        this.getLeagueData();
      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
    else {

      this.service.updateLeague(this.editValue.id, postData).subscribe((res: any[]) => {
        this.modificationForm.reset();
        this.successMessage = JSON.stringify(res['res']);
        this.successMessage = JSON.parse(this.successMessage);
        this.editLeagueValue = false;
        this.addLeague = false;
        this.getLeagueData();

      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        })
    }
  }

  //function to delete league
  deleteLeague(id) {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.deleteLeague(id).subscribe((res: any[]) => {
      this.successMessage = JSON.stringify(res['res']);
      this.successMessage = JSON.parse(this.successMessage);
      this.modificationForm.reset();
      this.getLeagueData()
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
    sessionStorage.setItem("loggedUserEmail", null);
    this.navCtrl.push(HomePage);
  }

  //function to get league data for player
  getLeaguePlayerData() {
    this.noLeagueData = false;
    this.service.getLeaguePlayerData(JSON.parse(sessionStorage.getItem("loggedUserId"))).subscribe((response: any[]) => {
      this.leagueData = response['res'];
      if (this.leagueData.length == 0)
        this.noLeagueData = true;
      else
        this.noLeagueData = false;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }
}

