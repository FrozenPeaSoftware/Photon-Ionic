import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';

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
  imageURL: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageURL = '';
  }

  ionViewDidLoad() {
    this.imageURL = this.navParams.get('image');
  }

  back() {
    this.navCtrl.pop();
  }

  upload() {
    const photos = storage().ref('Photos/photo.jpg');
    photos.putString(this.imageURL, 'data_url');
  }
}
