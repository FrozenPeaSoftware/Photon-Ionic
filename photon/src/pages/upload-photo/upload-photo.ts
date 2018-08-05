import { PhotoOptionsPage } from './../photo-options/photo-options';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';

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
    private crop: Crop,
    public platform: Platform,
    private base64: Base64,
    private sanitizer: DomSanitizer
  ) {}

  choosePhoto() {
    this.getPhoto(0);
  }

  takePhoto() {
    this.getPhoto(1);
  }

  getPhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    };

    this.camera.getPicture(options).then(
      imageURI => {

        if (this.platform.is('android') && !imageURI.startsWith('file://')) {
          imageURI = 'file://' + imageURI;
        }

        this.cropImage(imageURI).then(
          image => {
            this.base64.encodeFile(image).then((base64File: string) => {
              let safeURL = this.sanitizer.bypassSecurityTrustUrl(base64File);
              this.navCtrl.push(PhotoOptionsPage, {
                image: safeURL,
              });
            }, (error) => {
              console.error('Error encoding image to base64.', error);
            });
          }
        );
      },
      error => {
        console.error('Error getting image', error)
      }
    );
  }

  cropImage(imageURI): Promise<any> {
    return this.crop.crop(imageURI, {
      quality: 100,
      targetWidth: Number(this.platform.width),
      targetHeight: Number(this.platform.width)
    }).then(
      croppedImage => {
        console.log('Cropped image: ' + croppedImage);
        return croppedImage;
      },
      error => console.error('Error cropping image.', error)
    );
  }







  /*this.navCtrl.push(PhotoOptionsPage, {
          image: imageURI,
        });*/

    /*this.crop
      .crop(
        'https://wellington.govt.nz/~/media/global/images/megamenu/2017/mega-about.jpg',
        {
          quality: 100,
        }
      )
      .then(
        croppedImage => {
          let image = 'data:image/jpeg;base64,' + croppedImage;
          this.navCtrl.push(PhotoOptionsPage, {
            image: image,
          });
        },
        error => console.error('Error cropping image', error)
      );*/
}
