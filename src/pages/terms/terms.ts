import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { EditPage } from '../editprofile/editprofile';
import { MyLeaguePage } from '../myleague/myleague';
import { AboutPage } from '../about/about';
import { LatestnewsPage } from '../latestnews/latestnews';
import { HelpPage } from '../help/help';
import { DonatePage } from '../donate/donate';
import { CareerPage } from '../career/career';
import { ContactPage } from '../contact/contact';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy'; 


@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  logged_user: any;
  userEmail: string;
  userIsLogged: boolean;
  pages: Array<{ title: string, component: any }>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.userIsLogged = false;
    if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
      this.userIsLogged = true;
      this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
    }
    this.logged_user = JSON.parse(sessionStorage.getItem("loggedUserEmail"));
    
    this.pages = [
      { title: 'My League', component: MyLeaguePage },
      { title: 'About' , component: AboutPage },
      { title: 'News' , component: LatestnewsPage},
      { title: 'Help' , component: HelpPage},
      { title: 'Donate' , component: DonatePage},
      { title: 'Career' , component: CareerPage},
      { title: 'Contact' , component: ContactPage},
      { title: 'Terms' , component: TermsPage},
      { title: 'Policy' , component: PrivacypolicyPage}
    ];
  }


  //function to redirect to home page
  openHomePage() {
    this.navCtrl.push(HomePage);
  }

  //function to open edit profile page for the application
  editProfile() {
    this.navCtrl.push(EditPage);
  }

  //function to logout of the application
  logout() {
    sessionStorage.setItem("loginDone", null);
    sessionStorage.setItem("loggedUserId", null);
    sessionStorage.setItem("loggedUserName", null);
    sessionStorage.setItem("loggedUserEmail", null);
    this.navCtrl.push(HomePage);
  }

    //function to open league page and footer links for the application
    openPages(destinationPage) {
        for(let i=0;i<this.pages.length;i++){
          if(this.pages[i].title == destinationPage){
            this.navCtrl.push(this.pages[i].component);
          }
        }
      }
    }
