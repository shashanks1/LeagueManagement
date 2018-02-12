import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  forgotForm: FormGroup;
  changePasswordForm: FormGroup;
  password: string;
  apiMessage: string;
  email: string;
  forgotPassword: boolean;
  changePassword: boolean;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.email = '';
    this.password = '';
    this.apiMessage = null;
    this.forgotPassword = false;
    this.changePassword = false;
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
  }

  // function to submit login to the API
  submitLogin(value) {
    this.apiMessage = null;
    this.service.submitLogin(value).subscribe((res: any[]) => {
    });
  }

  // function to open forgot password form 
  openForgotPassword() {
    this.apiMessage = null;
    this.forgotPassword = true;
    this.changePassword = false;
  }

  // function to submit forgot password to the API
  submitForgotPassword(value) {
    this.apiMessage = null;
    this.service.submitForgotPassword(value).subscribe((res: any[]) => {
      this.apiMessage = JSON.stringify(res['res']);
      this.cancel();
    });
  }

  // function to submit forgot password to the API
  submitChangePassword(value) {
    this.apiMessage = null;
    this.service.submitChangePassword(value).subscribe((res: any[]) => {
      this.apiMessage = JSON.stringify(res['res']);
      this.cancel();
    });
  }

  // function to open change password form
  openChangePassword() {
    this.apiMessage = null;
    this.changePassword = true;
    this.forgotPassword = false;
  }

  // function to cancel forgot or change password form
  cancel() {
    this.apiMessage = null;
    this.changePassword = false;
    this.forgotPassword = false;
  }
}

