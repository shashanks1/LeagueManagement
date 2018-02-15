import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registrationForm: FormGroup;
  agree: boolean;
  successMessage: string;
  errorMessage: string;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.agree = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.registrationForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      'full_name': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      'username': [null, Validators.required],
      'password': [null, Validators.required],
      'agree': [null]

    });
  }

  signUp(postData) {
    this.successMessage = '';
    this.errorMessage = '';
    this.service.signUp(postData).subscribe((res: any[]) => {
      sessionStorage.setItem("registrationMessage", JSON.stringify(res['res']));
      this.navCtrl.push(LoginPage);
    },
      error => {
        this.errorMessage = JSON.parse(error['error']['res']);
        this.errorMessage = JSON.parse(this.errorMessage);
      });
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
