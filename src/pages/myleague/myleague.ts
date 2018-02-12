import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
   leagueData : any
  constructor(public navCtrl: NavController, public navParams: NavParams,public service: RemoteServiceProvider) {
    this.getLeagueData();
  }



  getLeagueData(){

     this.service.getLeagueData().subscribe((res: any[]) => {
      this.leagueData = res;
      console.log(this.leagueData);
  });
}

  deleteLeague(id){
   
      this.service.deleteLeague(id).subscribe((res: any[]) => {
       this.getLeagueData()
      },
      error => {
        //this.apiMessage = JSON.stringify(error['error']['res']);
      });

    }
  }
  
