import { LoginPage } from './../pages/login/login';
import { CustomiseProfilePage } from './../pages/customise-profile/customise-profile';
import { ProfilePage } from './../pages/profile/profile';
import { AuthService } from './../services/auth.service';
import { TabsPage } from '../pages/tabs/tabs';
import { FIREBASE_CONFIG } from './firebase.config';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { initializeApp } from 'firebase';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private auth: AuthService,
    keyboard: Keyboard,
  ) {

    // Allows user to bypass the login page if they are already authenticated
    /*
      if (!auth.authenticated) {
        this.rootPage = 'LoginPage';
      } else {
        this.rootPage = TabsPage;
      }
      */

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      keyboard.disableScroll(true);
      statusBar.styleDefault();
      splashScreen.hide();
      statusBar.hide();
    });
  }
}
