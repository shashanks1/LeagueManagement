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
    successMessage: string;
    errorMessage: string;

    constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {

        this.successMessage = '';
        this.errorMessage = '';

        this.profileForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            'full_name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
            'username': [null],
            'office_phone': [null],
            'home_phone': [null],
            'cell_phone': [null],
            'address1': [null],
            'address2': [null],
            'city': [null],
            'user_state': [null],
            'country': [null],
            'zip': [null],
            'height': [null],
            'dob': [null],
            'gender': [null],
            'preferred_location': [null],
            'handedness': [null],
            'rating_type': [null],
            'rating': [null],
            'user_others': [null],
            'strength': [null],
            'weakness': [null],
        });
        this.getUserData();
    }

    saveProfile(value) {
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
        this.service.saveProfile(id, value).subscribe((res: any[]) => {
            this.successMessage = JSON.stringify(res['res']);
            this.successMessage = JSON.parse(this.successMessage);
        },
            error => {
                this.errorMessage = JSON.stringify(error['error']['res']);
                this.errorMessage = JSON.parse(this.errorMessage);
            });
    }

    cancel() {
        this.navCtrl.push(HomePage);
    }

    getUserData() {
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
        this.service.getUser(id).subscribe((res: any[]) => {
            this.profileForm.setValue({
                'email': res['res']['email'],
                'full_name': res['res']['full_name'],
                'username': res['res']['username'],
                'office_phone': res['res']['office_phone'],
                'home_phone': res['res']['home_phone'],
                'cell_phone': res['res']['cell_phone'],
                'address1': res['res']['address1'],
                'address2': res['res']['address2'],
                'city': res['res']['city'],
                'user_state': res['res']['user_state'],
                'country': res['res']['country'],
                'zip': res['res']['zip'],
                'height': res['res']['height'],
                'dob': res['res']['dob'],
                'gender': res['res']['gender'],
                'preferred_location': res['res']['preferred_location'],
                'handedness': res['res']['handedness'],
                'rating_type': res['res']['rating_type'],
                'rating': res['res']['rating'],
                'user_others': res['res']['user_others'],
                'strength': res['res']['strength'],
                'weakness': res['res']['weakness'],
            });
        },
            error => {
                this.errorMessage = JSON.stringify(error['error']['res']);
                this.errorMessage = JSON.parse(this.errorMessage);
            });
    }
}

