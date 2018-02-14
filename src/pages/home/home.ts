import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../editprofile/editprofile';
import { RegistrationPage } from '../registration/registration';
import { MyleaguePage } from '../myleague/myleague';
import { MygroupPage} from '../mygroup/mygroup'; 

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //@ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userIsLogged: boolean;
  userEmail: string;

  pages: Array<{ title: string, component: any }>;

  constructor(public service: RemoteServiceProvider, public navCtrl: NavController) {
    this.userIsLogged = false;
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = true;
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserEmail"));
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

  logout() {
    console.log('dckndk')
    sessionStorage.setItem("loginDone", null);
    sessionStorage.setItem("loggedUserId", null);
    sessionStorage.setItem("loggedUserEmail", null);
    this.navCtrl.push(HomePage);
  }
}
