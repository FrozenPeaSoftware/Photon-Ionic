import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the UploadPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-photo',
  templateUrl: 'upload-photo.html',
})
export class UploadPhotoPage {
  imageURI: any;
  imageFileName: any;

  constructor(
    public navCtrl: NavController,
    public database: AngularFireDatabase,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPhotoPage');
  }

  uploadPhoto() {
    //
  }
}
