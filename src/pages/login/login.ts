import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { HomePage } from '../home/home';


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


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.successMessage = '';
    this.errorMessage = '';
    this.forgotPassword = false;
    this.changePassword = false;
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

      this.navCtrl.push(HomePage);
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
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
      sessionStorage.setItem("loggedUserName", JSON.stringify(res['additionalUserInfo']['profile']['name']));
      sessionStorage.setItem("loginDone", 'userIsLogged');
      this.navCtrl.push(HomePage);
    })
      .catch((err) => console.log(err));
  }
}

