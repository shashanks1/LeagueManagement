import { Component, ViewChild } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MyleaguePage } from '../pages/myleague/myleague';
import { MygroupPage } from '../pages/mygroup/mygroup';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My League', component: MyleaguePage },
      { title: 'My Group', component: MygroupPage }
    ];

  }

  // function to initialize the app 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // function to open the page on sideMenu click
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
