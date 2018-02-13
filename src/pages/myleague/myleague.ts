import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.getLeagueData();
    this.addLeague = false;
    this.editLeague = false;
    this.editValue = '';


    this.modificationForm = fb.group({
      'name': [''],
      'players': [''],
      'location': [''],
      'created': [''],
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

    this.modificationForm.setValue({
      'name' : editValue.name,
      'players' : editValue.players ,
      'location' : editValue.location,
      'created' : editValue.created
    })
  }

  submitNewLeague(postData) {
    if (this.addLeague) {
      this.service.addNewLeague(postData).subscribe((res: any[]) => {
      })
    }
    else {
      this.service.updateLeague(postData.id, postData).subscribe((res: any[]) => {
        
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

