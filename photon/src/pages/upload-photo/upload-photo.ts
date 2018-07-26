import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { storage } from 'firebase';
import { Camera, CameraOptions} from '@ionic-native/camera';

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
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public camera: Camera,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPhotoPage');
  }

  choosePhoto() {
    this.getPhoto(0);
  }

  takePhoto() {
    this.getPhoto(1);
  }

  getPhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    };

    this.camera.getPicture(options).then(
      imageData => {
        let image = 'data:image/jpeg;base64,' + imageData;
        const photos = storage().ref('Photos/photo.jpg');
        photos.putString(image, 'data_url');

      },
      err => {
        // Handle error
      }
    );
  }
}
