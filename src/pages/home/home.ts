import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../editprofile/editprofile';
import { RegistrationPage } from '../registration/registration';
import { MyLeaguePage } from '../myleague/myleague';
import { MyGroupPage } from '../mygroup/mygroup';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  rootPage: any = HomePage;
  userIsLogged: boolean;
  userEmail: string;

  pages: Array<{ title: string, component: any }>;

  constructor(public service: RemoteServiceProvider, public navCtrl: NavController) {
    this.userIsLogged = false;
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = true;
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
    }
  }

  //function to open login page for the application
  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  //function to open edit profile page for the application
  editProfile() {
    this.navCtrl.push(EditPage);
  }

  //function to open registration page for the application
  openRegistration() {
    this.navCtrl.push(RegistrationPage);
  }

  //function to open legaue page for the application
  openLeague() {
    if (sessionStorage.getItem("loginDone") != 'userIsLogged') {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.push(MyLeaguePage);
    }
  }

  openGroup() {
    if (sessionStorage.getItem("loginDone") != 'userIsLogged') {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.push(MyGroupPage);
    }
  }

  //function to logout of the application
  logout() {
    sessionStorage.setItem("loginDone", null);
    sessionStorage.setItem("loggedUserId", null);
    sessionStorage.setItem("loggedUserName", null);
    sessionStorage.setItem("loggedUserEmail",null);
    this.navCtrl.push(HomePage);
  }
}
