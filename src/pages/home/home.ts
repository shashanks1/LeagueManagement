import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public service: RemoteServiceProvider) {
    this.getUserData();
  }

  getUserData() {
    this.service.getUsers().subscribe(
      (res: any[]) => {
        console.log(res)
      }, error => {
        console.log(error);
      });
  }

}
