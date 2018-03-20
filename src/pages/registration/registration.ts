import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { MyLeaguePage } from '../myleague/myleague';
import { AboutPage } from '../about/about';
import { LatestnewsPage } from '../latestnews/latestnews';
import { HelpPage } from '../help/help';
import { DonatePage } from '../donate/donate';
import { CareerPage } from '../career/career';
import { ContactPage } from '../contact/contact';
import { TermsPage } from '../terms/terms';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registrationForm: FormGroup;
  agree: boolean;
  successMessage: string;
  errorMessage: string;
  pages: Array<{ title: string, component: any }>;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.agree = true;
    this.successMessage = '';
    this.errorMessage = '';
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


    this.registrationForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'full_name': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'agree': [false, Validators.pattern('true')]

    });
  }

  // function to submit registration details to the API
  signUp(postData) {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signUp(postData).subscribe((res: any[]) => {
      sessionStorage.setItem("registrationMessage", JSON.stringify(res['res']));
      this.navCtrl.push(LoginPage);
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  //function to sign in with google
  // signInWithGoogle() {
  //   this.successMessage = '';
  //   this.errorMessage = '';
  //   this.service.signInWithGoogle().then((res) => {
  //     sessionStorage.setItem("loggedUserName", JSON.stringify(res['additionalUserInfo']['profile']['name']));
  //     sessionStorage.setItem("loginDone", 'userIsLogged');
  //     this.navCtrl.push(HomePage);
  //   })
  //     .catch((err) => console.log(err));
  // }
  signInWithGoogle() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signInWithGoogle().then((res) => {
      console.log(res);
      let postData = {
        'email': (res['additionalUserInfo']['profile']['email']),
        'full_name': (res['additionalUserInfo']['profile']['name']),
        'username': (res['additionalUserInfo']['profile']['name']),
        'source': 'Google',
        'localId': (res['user']['uid'])
      }
      console.log(postData);
      this.service.signUp(postData).subscribe((res: any[]) => {
        sessionStorage.setItem("loggedUserId", JSON.stringify(res['res']['id']));
        sessionStorage.setItem("loggedUserEmail", JSON.stringify(res['res']['email']));
        // sessionStorage.setitem("loggedUserEmail",JSON.stringify(res['additionalUserInfo']['profile']['email']));
      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        });
      sessionStorage.setItem("loggedUserName", JSON.stringify(res['additionalUserInfo']['profile']['name']));
      sessionStorage.setItem("loginDone", 'userIsLogged');
      this.navCtrl.push(HomePage);
    })
      .catch((err) => console.log(err));
  }

  // //function to sign in with facebook
  // signInWithFacebook() {
  //   this.successMessage = '';
  //   this.errorMessage = '';
  //   this.service.signInWithFacebook().then((res) => {
  //     sessionStorage.setItem("loggedUserName", JSON.stringify(res['additionalUserInfo']['profile']['name']));
  //     sessionStorage.setItem("loginDone", 'userIsLogged');
  //     this.navCtrl.push(HomePage);
  //   })
  //     .catch((err) => console.log(err));
  // }

  //function to sign in with facebook
  signInWithFacebook() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signInWithFacebook().then((res) => {
      let postData = {
        'email': (res['additionalUserInfo']['profile']['email']),
        'full_name': (res['additionalUserInfo']['profile']['name']),
        'username': (res['additionalUserInfo']['profile']['name']),
        'source': 'Google',
        'localId': (res['user']['uid'])
      }
      this.service.signUp(postData).subscribe((res: any[]) => {
        sessionStorage.setItem("loggedUserName", JSON.stringify(res['additionalUserInfo']['profile']['name']));
        sessionStorage.setItem("loginDone", 'userIsLogged');
        // this.navCtrl.push(HomePage);
      },
        error => {
          this.errorMessage = JSON.stringify(error['error']['res']);
          this.errorMessage = JSON.parse(this.errorMessage);
        });
    })
      .catch((err) => console.log(err));
  }

  //function to redirect to home page
  openHomePage() {
    this.navCtrl.push(HomePage);
  }

  //function to redirect to login page
  openLogin() {
    this.navCtrl.push(LoginPage);
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
}
