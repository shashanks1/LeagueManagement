import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
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
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  forgotForm: FormGroup;
  changePasswordForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  forgotPassword: boolean;
  changePassword: boolean;
  pages: Array<{ title: string, component: any }>;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.successMessage = '';
    this.errorMessage = '';
    this.forgotPassword = false;
    this.changePassword = false;
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

    sessionStorage.setItem("loginDone", null);
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'password': [null, Validators.required]
    });
    this.forgotForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])]
    });

    this.changePasswordForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'old_password': [null, Validators.required],
      'new_password': [null, Validators.required]
    });

    if (sessionStorage.getItem("registrationMessage") != 'null') {
      this.successMessage = JSON.parse(sessionStorage.getItem("registrationMessage"));
    }
  }

  // function to submit login to the API
  submitLogin(value) {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.service.submitLogin(value).subscribe((res: any[]) => {
      sessionStorage.setItem("loginDone", 'userIsLogged');
      sessionStorage.setItem("loggedUserId", JSON.stringify(res['res']['id']));
      sessionStorage.setItem("loggedUserName", JSON.stringify(res['res']['full_name']));
      sessionStorage.setItem("loggedUserEmail", JSON.stringify(res['res']['email']));
      sessionStorage.setItem("is_admin", JSON.stringify(res['res']['is_admin']));
      this.navCtrl.push(HomePage);
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
        this.loginForm.reset();
      });
  }

  // function to open forgot password form 
  openForgotPassword() {
    this.changePasswordForm.reset();
    this.forgotForm.reset();
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.forgotPassword = true;
    this.changePassword = false;
  }

  // function to submit forgot password to the API
  submitForgotPassword(value) {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.service.submitForgotPassword(value).subscribe((res: any[]) => {
      this.successMessage = JSON.stringify(res['res']);
      this.successMessage = JSON.parse(this.successMessage);
      this.changePasswordForm.reset();
      this.forgotForm.reset();
      this.changePassword = false;
      this.forgotPassword = false;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  // function to submit forgot password to the API
  submitChangePassword(value) {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.service.submitChangePassword(value).subscribe((res: any[]) => {
      this.successMessage = JSON.stringify(res['res']);
      this.successMessage = JSON.parse(this.successMessage);
      this.changePasswordForm.reset();
      this.forgotForm.reset();
      this.changePassword = false;
      this.forgotPassword = false;
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  // function to open change password form
  openChangePassword() {
    sessionStorage.setItem("registrationMessage", null);
    this.changePasswordForm.reset();
    this.forgotForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.changePassword = true;
    this.forgotPassword = false;
  }

  // function to cancel forgot or change password form
  cancel() {
    this.loginForm.reset();
    this.changePasswordForm.reset();
    this.forgotForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
    this.changePassword = false;
    this.forgotPassword = false;
  }

  //function to sign in with google
  signInWithGoogle() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signInWithGoogle().then((res) => {
      let postData = {
        'email': (res['additionalUserInfo']['profile']['email']),
        'full_name': (res['additionalUserInfo']['profile']['name']),
        'username': (res['additionalUserInfo']['profile']['name']),
        'source': 'Google',
        'localId': (res['user']['uid'])
      }
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

