import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { EditProfile } from '../editprofile/editprofile';
import { RegistrationPage } from '../registration/registration';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userIsLogged: string;

  pages: Array<{ title: string, component: any }>;

  constructor(public service: RemoteServiceProvider, public navCtrl: NavController) {
    sessionStorage.setItem("registrationMessage", null);
    this.userIsLogged = null;

    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = sessionStorage.getItem("loginDone");
    }
  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  editProfile() {
    this.navCtrl.push(EditProfile);
  }

  openRegistration() {
    this.navCtrl.push(RegistrationPage);
  }
}
