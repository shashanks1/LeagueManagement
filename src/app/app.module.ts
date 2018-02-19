import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { AuthInterceptor } from '../providers/auth.interceptor';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from '../pages/registration/registration';
import { LoginPage } from '../pages/login/login';
import { EditPage } from '../pages/editprofile/editprofile';
import { MyLeaguePage } from '../pages/myleague/myleague';
import { MyGroupPage } from '../pages/mygroup/mygroup';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { CameraMock } from '../providers/remote-service/Camera-Service';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA5SA8AVybxIcaRek3qa6b4Uvkiq2aCQxE",
    authDomain: "leaguemanagement-8bbc4.firebaseapp.com",
    databaseURL: "https://leaguemanagement-8bbc4.firebaseio.com",
    projectId: "leaguemanagement-8bbc4",
    storageBucket: "",
    messagingSenderId: "772145571852"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrationPage,
    LoginPage,
    EditPage,
    MyLeaguePage,
    MyGroupPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage,
    RegistrationPage,
    LoginPage,
    MyLeaguePage,
    MyGroupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Camera, useClass: CameraMock },
    CameraMock,
    RemoteServiceProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
