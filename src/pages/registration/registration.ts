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
  email: string;
  fullName: string;
  userName: string;
  password: string;
  agree: boolean;
  successMessage: string;
  errorMessage: string;

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.email = '';
    this.fullName = '';
    this.userName = '';
    this.password = '';
    this.agree = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.registrationForm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
      'fullName': ['', Validators.required],
      'userName': ['', Validators.required],
      'password': ['', Validators.required],
      'agree': [''],
      'profile': ['']

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
