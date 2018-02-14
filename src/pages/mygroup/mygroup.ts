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
  addLeague: boolean;
  editLeague: boolean;
  leagueData: any;
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

    this.modificationForm = fb.group({
      'league_name': [''],
      'description': [''],
      'players': [''],
      'league_location': [''],
      'round_robin_period_from': [''],
      'round_robin_period_to': [''],
      'playoff_period_from': [''],
      'playoff_period_to': [''],
      'scoring_point': ['']
    });

    this.getLeagueData();
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

  addNewLeague() {
    this.addLeague = true;
    this.editLeague = false;
  }

  editLeagueFunc(editValue) {
    this.editLeague = true;
    this.addLeague = false;
    this.editValue = editValue;

    this.modificationForm.setValue({
      'league_name': editValue.league_name,
      'players': editValue.players,
      'league_location': editValue.league_location,
      'description': editValue.description,
      'round_robin_period_from': editValue.round_robin_period_from,
      'round_robin_period_to': editValue.round_robin_period_to,
      'playoff_period_from': editValue.playoff_period_from,
      'playoff_period_to': editValue.playoff_period_to,
      'scoring_point': editValue.scoring_point
    })
  }

  submitNewLeague(postData) {
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

    this.service.deleteLeague(id).subscribe((res: any[]) => {
      this.getLeagueData()
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });

  }
}

