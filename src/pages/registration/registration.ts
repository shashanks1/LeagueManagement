import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registrationForm: FormGroup;
  email: string;
  fullName: string;
  userName: string;
  password: string;
  agree: boolean;
  apiMessage: string;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.email = '';
    this.fullName = '';
    this.userName = '';
    this.password = '';
    this.agree = true;
    this.apiMessage = null;

    this.registrationForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
      'fullName': [null, Validators.required],
      'userName': [null, Validators.required],
      'password': [null, Validators.required],
      'agree': [null]

    });
  }

  signUp(postData) {
    this.service.signUp(postData).subscribe((res: any[]) => {
      this.apiMessage = JSON.stringify(res['res']);
      this.navCtrl.push(LoginPage);
    },
      error => {
        this.apiMessage = JSON.stringify(error['res']);
      });
  }
}
