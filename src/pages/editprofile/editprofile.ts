import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { HomePage } from '../home/home';


@Component({
    selector: 'edit-profile',
    templateUrl: 'editprofile.html',
})
export class EditPage {
    profileForm: FormGroup;
    apiMessage: string;

    constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {

        this.apiMessage = null;

        this.profileForm = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            'full_name': ['', Validators.required],
            'username': [''],
            'office_phone': [''],
            'home_phone': [''],
            'cell_phone': [''],
            'address1': [''],
            'address2': [''],
            'city': [''],
            'state': [''],
            'country': [''],
            'zip': [''],
            'height': [''],
            'dob': [''],
            'gender': [''],
            'preferred_location': [''],
            'handedness': [''],
            'rating_type': [''],
            'rating': [''],
            'others': [''],
            'strength': [''],
            'weakness': ['']
        });
    }

    saveProfile(value) {
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
        this.service.saveProfile(id, value).subscribe((res: any[]) => {
            this.apiMessage = JSON.stringify(res['res']);
        },
            error => {
                this.apiMessage = JSON.stringify(error['error']['res']);
            });
    }
}

