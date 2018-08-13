import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';
import { Photo } from '../../app/models/photo.interface';
import { User } from '../../app/models/user.interface';
import { MapPage } from './../map/map';
import { Component, ChangeDetectorRef } from '@angular/core';
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule, DocumentSnapshot } from 'angularfire2/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { storage, database } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  loaded: boolean;

  photoUserID: string;
  currentUserID: string;
  photoID: string;

  photoUserName: string;
  currentUserName: string;

  location: string;
  likes: Number;
  commentCount: Number;
  description: string;
  photoURL: string;

  liked: boolean;

  photoData: Photo;

  commentInput: string;

  comments = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingScreenProvider: LoadingScreenProvider,
    private changeDetector: ChangeDetectorRef
  ) {
    this.loaded = false;
    this.loadingScreenProvider.show('Loading photo...');

    this.commentInput = "";

    this.currentUserID = this.auth.getUID();
    this.photoUserID = 'WuXkSZ55Q0MWzPJ1x3qt0YTWvdg1';
    this.photoID = '8dc9f481-40c1-08f6-6aa7-faba953eb60f';

    const photoRef = this.getPhotoData(this.photoUserID, this.photoID);
    photoRef.valueChanges().subscribe((photo: Photo) => {
      this.photoData = photo;
      this.description = photo.description;
      this.location = photo.location;
      this.photoURL = photo.url;
    });

    this.getLikeCount();
    this.setLikedState(this.currentUserID);

    this.getCommentCount();
    this.getComments();

    const photoUserRef = this.getUserData(this.photoUserID);
    photoUserRef.valueChanges().subscribe((user: User) => {
      this.photoUserName = user.name;
      console.log(user.name);
    });
    const currentUserRef = this.getUserData(this.currentUserID);
    currentUserRef.valueChanges().subscribe((user: User) => {
      this.currentUserName = user.name;
      console.log(user.name);
    });
  }

  getPhotoData(userID, photoID): AngularFirestoreDocument<Photo> {
    return this.firestore
      .collection('users')
      .doc(userID)
      .collection('photos')
      .doc(photoID);
  }

  getUserData(userID): AngularFirestoreDocument<User> {
    return this.firestore.collection('users').doc(userID);
  }

  setLikedState(userID) {
    const likesRef = this.firestore
      .collection('users')
      .doc(this.photoUserID)
      .collection('photos')
      .doc(this.photoID)
      .collection('likes')
      .doc(userID);

      likesRef.snapshotChanges().subscribe((snapshot) => {
        this.liked = snapshot.payload.exists;
      });
  }

  getLikeCount() {
    const likesRef = this.firestore
      .collection('users')
      .doc(this.photoUserID)
      .collection('photos')
      .doc(this.photoID)
      .collection('likes');

      likesRef.snapshotChanges().subscribe((snapshot) => {
        this.likes = snapshot.length;
      });
  }

  getComments() {
    const commentsRef = this.firestore
      .collection('users')
      .doc(this.photoUserID)
      .collection('photos')
      .doc(this.photoID)
      .collection('comments');

      commentsRef.valueChanges().subscribe((value => {
        let count = 0;
        value.forEach(doc => {
          this.comments[count] = doc;
          console.log(this.comments[count])
          count = count + 1;
        });
      }));
  }

  getCommentCount() {
    const commentsRef = this.firestore
      .collection('users')
      .doc(this.photoUserID)
      .collection('photos')
      .doc(this.photoID)
      .collection('comments')

      commentsRef.snapshotChanges().subscribe((snapshot) => {
        this.commentCount = snapshot.length;
      });
  }

  toggleLike() {
    const likeRef = this.firestore.doc(
      'users/' +
        this.photoUserID +
        '/photos/' +
        this.photoID +
        '/likes/' +
        this.currentUserID
    );
    if (this.liked) {
      likeRef.delete();
    } else {
      likeRef
      .set({
        liked: true,
      })
      .catch(function() {
        this.liked = !this.liked;
      });
    }
    this.liked = !this.liked;
  }

  submitComment() {
    const photoRef = this.firestore.doc(
      'users/' + this.photoUserID + '/photos/' + this.photoID + '/comments/' + this.currentUserID
    );
    photoRef
      .set({
        id: this.currentUserID,
        name: this.currentUserName,
        comment: this.commentInput
      })
      .catch(function(error) {
        console.log('Error: ' + error);
      });
  }

  showMap() {
    let mapModal = this.modalCtrl.create(MapPage, { userId: 8675309 });
    mapModal.present();
  }
}
