import { Photo } from '../../app/models/photo.interface';
import { User } from '../../app/models/user.interface';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  loading: any;

  name: string;
  location: string;
  likes: Number;
  commentCount: Number;
  description: string;
  photoURL: string;

  liked: boolean;

  photoData: Photo;

  comments = [
    {
      name: 'Celine Young',
      comment: 'Yeet this is a comment.',
    },
    {
      name: 'Mohsen Javaher',
      comment: 'Good morning beautiful',
    },
    {
      name: 'Mohsen Javaher',
      comment: 'pls reply',
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingCtrl: LoadingController
  ) {
    this.showLoading();
    this.likes = 462;
    this.commentCount = 38;
    this.liked = false;

    const userID = this.auth.getUID();
    const photoID = '8dc9f481-40c1-08f6-6aa7-faba953eb60f';

    const photoRef = this.getPhotoData(userID, photoID);
    photoRef.valueChanges().subscribe((photo: Photo) => {
      this.photoData = photo;
      this.description = photo.description;
      this.location = photo.location;
      this.photoURL = photo.url;
    });

    const userRef = this.getUserData(userID);
    userRef.valueChanges().subscribe((user: User) => {
      this.name = user.name;
    });
  }

  getPhotoData(userID, photoID): AngularFirestoreDocument<Photo> {
    return this.firestore
      .collection('users')
      .doc(userID)
      .collection('photos')
      .doc(photoID);
  }

  getUserData(userID) {
    return this.firestore.collection('users').doc(userID);
  }

  toggleLike() {
    this.liked = !this.liked;
  }

  showMap() {
    let mapModal = this.modalCtrl.create(MapPage, { userId: 8675309 });
    mapModal.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Loading photo...',
      showBackdrop: false
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    this.loading.dismiss();
  }
}
