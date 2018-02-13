import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../editprofile/editprofile';
import { RegistrationPage } from '../registration/registration';
import { MyleaguePage } from '../myleague/myleague';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userIsLogged: boolean;

  pages: Array<{ title: string, component: any }>;

  constructor(public service: RemoteServiceProvider, public navCtrl: NavController) {
    this.userIsLogged = false;
   console.log(sessionStorage.getItem("loginDone"))
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = true;
    }
  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  editProfile() {
    this.navCtrl.push(EditPage);
  }

  openRegistration() {
    this.navCtrl.push(RegistrationPage);
  }

  openLeague() {
    this.navCtrl.push(MyleaguePage);
  }
}
