import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { LoginPage } from '../login/login';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  registrationForm : FormGroup;
  email : string;
  fullName : string;
  userName : string;
  password : string;
  agree : boolean;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
  this.email = '';
  this.fullName = '';
  this.userName = '';
  this.password = '';
  this.agree = true;
  this.registrationForm = fb.group({
    'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
    'fullName': [null, Validators.required],
    'userName': [null, Validators.required],
    'password': [null, Validators.required],
    'agree': [null]

  });
  }

  signUp(postData){
    /*let postData= {
      "email": this.email,
      "full_name" : this.fullName,
      "username" : this.userName,
      "password": this.password,
      "profile": {}
    }*/
    this.service.signUp(postData).subscribe((res: any[]) => {
      console.log(res)
    });

  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }
  


}
