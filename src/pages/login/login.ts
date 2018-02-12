import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  rForm: FormGroup;
  post: any;
  password: string;
  eAddress: string;


  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    this.eAddress = '';
    this.password = '';
    this.rForm = fb.group({
      'eAddress': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])]

    });
  }
  Login() {
    let postData = {
      "email": this.eAddress,
      "password": this.password,
    }
    this.service.Login(postData).subscribe((res: any[]) => {
      console.log(res)
    });
  }

}

