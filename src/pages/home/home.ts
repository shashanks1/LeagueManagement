import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import {MyleaguePage} from '../myleague/myleague';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public service: RemoteServiceProvider, public navCtrl: NavController) {
    //this.getUserData();
  }

  getUserData() {
    this.service.getUsers().subscribe(
      (res: any[]) => {
      }, error => {
      });
  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  openRegistration() {
    this.navCtrl.push(RegistrationPage);
  }

  openLeague() {
    this.navCtrl.push(MyleaguePage);
  }
}
