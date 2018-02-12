import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { HomePage } from '../home/home';


@Component({
  selector: 'edit-profile',
  templateUrl: 'editprofile.html',
})
export class EditProfile {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
    
  }  
}

