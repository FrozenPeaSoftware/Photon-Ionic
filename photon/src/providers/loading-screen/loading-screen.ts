import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingScreenProvider {
  loadingScreen: any;
  loadingScreenActive: boolean;

  constructor(public loadingCtrl: LoadingController) {
    this.loadingScreenActive = false;
  }

  show(message: string) {
    if (this.loadingScreenActive) {
      console.log("Could not show loading screen, a loading screen is already active.");
      return;
    }
    this.loadingScreen = this.loadingCtrl.create({
      spinner: 'crescent',
      content: message,
      showBackdrop: true,
    });
    this.loadingScreen.present();
    this.loadingScreenActive = true;
  }

  dismiss() {
    if (!this.loadingScreenActive) {
      console.log("Could not dismiss loading screen, there is no loading screen currently active.");
      return;
    } else {
      this.loadingScreen.dismiss();
      this.loadingScreenActive = false;
    }
  }
}
