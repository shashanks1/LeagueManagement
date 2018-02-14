import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
/**
 * Generated class for the MyleaguePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myleague',
  templateUrl: 'myleague.html',
})
export class MyleaguePage {
  modificationForm: FormGroup;
  addLeague: boolean;
  editLeague: boolean;
  leagueData: any;
  editValue : any;
  testarray : Array<any> =[];


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.getLeagueData();
    this.addLeague = false;
    this.editLeague = false;
    this.editValue = '';
    


    this.modificationForm = fb.group({
      'league_name': [''],
      'description' : [''],
      'players': [''],
      'league_location': [''],
      
      /*'round_robin_period' : {
        'from' : [''],
        'to' : ['']
      },
      'playoff_period' : {
        'from' : [''],
        'to' : ['']
      },*/
      'round_robin_period.from' : [''],
      'round_robin_period.to' : [''],
      'playoff_period.from' : [''],
      'playoff_period.to' : [''],
      'scoring_point' : ['']

    });
  }

  getLeagueData() {

    this.service.getLeagueData().subscribe((res: any[]) => {
      this.leagueData = res;
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
      'league_name' : editValue.league_name,
      'players' : editValue.players ,
      'league_location' : editValue.league_location,
      'description' : editValue.description,
      'round_robin_period.from' : editValue.round_robin_period,
      'round_robin_period.to' : editValue.round_robin_period,
      'playoff_period.from' : editValue.playoff_period,
      'playoff_period.to' : editValue.playoff_period,
      'scoring_point' : editValue.scoring_point
     })
  }

  submitNewLeague(postData) {
    if (this.addLeague) {
      console.log(postData);
      this.testarray.push(postData.players);
      console.log(this.testarray);
      postData.players = this.testarray;
      console.log(postData);
      this.service.addNewLeague(postData).subscribe((res: any[]) => {
      })
    }
    else {
      this.service.updateLeague(this.editValue.id, postData).subscribe((res: any[]) => {
        
      })

    }
  }

  deleteLeague(id) {

    this.service.deleteLeague(id).subscribe((res: any[]) => {
      this.getLeagueData()
    },
      error => {
        //this.apiMessage = JSON.stringify(error['error']['res']);
      });

  }
}

