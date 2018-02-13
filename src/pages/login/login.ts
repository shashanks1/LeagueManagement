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
  password: string;
  successMessage: string;
  errorMessage: string;
  email: string;
  forgotPassword: boolean;
  changePassword: boolean;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.email = '';
    this.password = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.forgotPassword = false;
    this.changePassword = false;
    sessionStorage.setItem("loginDone", null);
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
      'password': [null, Validators.required]
    });
    this.forgotForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])]
    });

    this.changePasswordForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
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
      sessionStorage.setItem("loggedUserEmail", JSON.stringify(res['res']['email']));
      this.navCtrl.push(HomePage);
    },
      error => {
        this.errorMessage = JSON.stringify(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
  }

  // function to open forgot password form 
  openForgotPassword() {
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
      this.successMessage = JSON.parse(res['res']);
      this.cancel();
    },
      error => {
        this.errorMessage = JSON.parse(error['error']['res']);
      });
  }

  // function to submit forgot password to the API
  submitChangePassword(value) {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.service.submitChangePassword(value).subscribe((res: any[]) => {
      this.successMessage = JSON.parse(res['res']);
      this.cancel();
    },
      error => {
        this.errorMessage = JSON.parse(error['res']);
      });
  }

  // function to open change password form
  openChangePassword() {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.changePassword = true;
    this.forgotPassword = false;
  }

  // function to cancel forgot or change password form
  cancel() {
    sessionStorage.setItem("registrationMessage", null);
    this.successMessage = '';
    this.errorMessage = '';
    this.changePassword = false;
    this.forgotPassword = false;
  }

  signInWithGoogle() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signInWithGoogle().then((res) => {
      sessionStorage.setItem("loggedUserEmail", JSON.stringify(res['additionalUserInfo']['profile']['name']));
      sessionStorage.setItem("loginDone", 'userIsLogged');
      this.navCtrl.push(HomePage);
    })
      .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signInWithFacebook().then((res) => {
      sessionStorage.setItem("loggedUserEmail", JSON.stringify(res['additionalUserInfo']['profile']['name']));
      sessionStorage.setItem("loginDone", 'userIsLogged');
      this.navCtrl.push(HomePage);
    })
      .catch((err) => console.log(err));
  }
}

