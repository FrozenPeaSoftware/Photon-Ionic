import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { SafeUrl } from '../../../node_modules/@angular/platform-browser';

/**
 * Generated class for the PhotoOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-options',
  templateUrl: 'photo-options.html',
})
export class PhotoOptionsPage {
  safeImageURL: any;
  base64Image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.safeImageURL = this.navParams.get('safeImageURL');
    this.base64Image = this.navParams.get('base64Image');
  }

  back() {
    this.navCtrl.pop();
  }

  upload() {
    const photos = storage().ref('Photos/photo.jpg');
    photos.putString(this.base64Image, 'data_url');
  }
}
