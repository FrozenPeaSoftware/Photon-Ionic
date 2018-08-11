import { Photo } from '../../app/models/photo.interface';
import { User } from '../../app/models/user.interface';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
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
    private firestore: AngularFirestore
  ) {
    this.likes = 462;
    this.commentCount = 38;
    this.liked = false;

    const userID = this.auth.getUID;
    const photoID = "9f232d93-ab5c-b369-0c7c-c4bf387d7ad2";

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
    return this.firestore.collection('users').doc(userID).collection('photos').doc(photoID);
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
}
