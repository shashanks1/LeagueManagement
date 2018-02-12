import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  baseUrl: string;

  constructor(
    public http: HttpClient
  ) {
    this.baseUrl = "https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user";
  }

  getUsers() {
    return this.http.get(this.baseUrl);
  }

  submit(data) {
    return this.http.post('https://8gmku063fh.execute-api.us-east-2.amazonaws.com/demo/user/login', data);
  }
}
