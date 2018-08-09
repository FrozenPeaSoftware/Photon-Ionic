import { MapPage } from './../pages/map/map';
import { AuthService } from './../services/auth.service';
import { PhotoPage } from './../pages/photo/photo';
import { GoogleMapsApiProvider } from './../providers/google-maps-api/google-maps-api';
import { PhotoOptionsPage } from './../pages/photo-options/photo-options';
import { LocationSearchComponent } from '../components/location-search/location-search';

import { FIREBASE_CONFIG } from './firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Crop } from '@ionic-native/crop';

import { UploadPhotoPage } from '../pages/upload-photo/upload-photo';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { OptionsPage } from '../pages/options/options';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    UploadPhotoPage,
    PhotoOptionsPage,
    AboutPage,
    HomePage,
    LoginPage,
    TabsPage,
    RegisterPage,
    OptionsPage,
    LocationSearchComponent,
    PhotoPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      scrollAssist: false,
      autoFocusAssist: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UploadPhotoPage,
    PhotoOptionsPage,
    AboutPage,
    HomePage,
    LoginPage,
    TabsPage,
    RegisterPage,
    OptionsPage,
    LocationSearchComponent,
    PhotoPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    Keyboard,
    Crop,
    Base64,
    GoogleMapsApiProvider,
    AngularFireAuth,
    AuthService
  ],
})
export class AppModule {}
