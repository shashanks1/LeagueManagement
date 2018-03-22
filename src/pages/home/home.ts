import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { EditPage } from '../editprofile/editprofile';
import { RegistrationPage } from '../registration/registration';
import { MyLeaguePage } from '../myleague/myleague';
// import { MyGroupPage } from '../mygroup/mygroup';
import { AboutPage } from '../about/about';
import { LatestnewsPage } from '../latestnews/latestnews';
import { HelpPage } from '../help/help';
import { DonatePage } from '../donate/donate';
import { CareerPage } from '../career/career';
import { ContactPage } from '../contact/contact';
import { TermsPage } from '../terms/terms';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';

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
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event)
    {
      history.pushState(null, document.title, location.href);
    });
    
    this.userIsLogged = false;
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = true;
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
    }
    this.pages = [
      { title: 'My League', component: MyLeaguePage },
      { title: 'About', component: AboutPage },
      { title: 'News', component: LatestnewsPage },
      { title: 'Help', component: HelpPage },
      { title: 'Donate', component: DonatePage },
      { title: 'Career', component: CareerPage },
      { title: 'Contact', component: ContactPage },
      { title: 'Terms', component: TermsPage },
      { title: 'Policy', component: PrivacypolicyPage }
    ];
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

  //function to open league page and footer links for the application
  openPages(destinationPage) {
    if (destinationPage == 'My League') {
      if (sessionStorage.getItem("loginDone") != 'userIsLogged') {
        this.navCtrl.setRoot(LoginPage);
      } else {
        this.navCtrl.push(MyLeaguePage);
      }
    }
    else {
      for (let i = 0; i < this.pages.length; i++) {
        if (this.pages[i].title == destinationPage) {
          this.navCtrl.push(this.pages[i].component);
        }
      }
    }
  }

  // openGroup() {
  //   if (sessionStorage.getItem("loginDone") != 'userIsLogged') {
  //     this.navCtrl.setRoot(LoginPage);
  //   } else {
  //     this.navCtrl.push(MyGroupPage);
  //   }
  // }

  //function to logout of the application
  logout() {
    sessionStorage.setItem("loginDone", null);
    sessionStorage.setItem("loggedUserId", null);
    sessionStorage.setItem("loggedUserName", null);
    sessionStorage.setItem("loggedUserEmail", null);
    sessionStorage.setItem("profile_pic", null);
    this.navCtrl.push(HomePage);
  }
}
