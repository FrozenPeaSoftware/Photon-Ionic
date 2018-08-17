import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';
import { Photo } from '../../app/models/photo.interface';
import { User } from '../../app/models/user.interface';
import { Comment } from '../../app/models/comment.interface';
import { MapPage } from './../map/map';
import { Component, ChangeDetectorRef } from '@angular/core';
import { App } from 'ionic-angular';
import {
  ModalController,
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestoreModule,
  DocumentSnapshot,
} from 'angularfire2/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { storage, database } from 'firebase';

import * as firebase from 'firebase';

import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {
  loaded: boolean;

  source: string;

  photoUserID: string;
  currentUserID: string;
  photoID: string;

  photoUserName: string;
  currentUserName: string;

  locationDescription: string;
  likes: Number;
  commentCount: Number;
  description: string;
  photoURL: string;

  liked: boolean;

  photoData: Photo;

  commentInput: string;

  comments: { commentData: Comment; name: string }[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingScreenProvider: LoadingScreenProvider,
    public appCtrl: App
  ) {
    this.loaded = false;
    this.loadingScreenProvider.show('Loading photo...');

    this.commentInput = '';

    this.currentUserID = this.auth.getUID();

    this.photoUserID = navParams.get('userID');
    this.photoID = navParams.get('photoID');
    this.source = navParams.get('source');

    const photoRef = this.getPhotoData(this.photoUserID, this.photoID);
    photoRef.valueChanges().subscribe((photo: Photo) => {
      this.photoData = photo;
      this.description = photo.description;
      this.locationDescription = photo.locationDescription;
      this.photoURL = photo.url;
    });

    this.getLikeCount();
    this.setLikedState(this.currentUserID);

    this.getComments();

    const photoUserRef = this.getUserData(this.photoUserID);
    photoUserRef.valueChanges().subscribe((user: User) => {
      this.photoUserName = user.name;
    });

    const currentUserRef = this.getUserData(this.currentUserID);
    currentUserRef.valueChanges().subscribe((user: User) => {
      this.currentUserName = user.name;
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

    likesRef.snapshotChanges().subscribe(snapshot => {
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

    likesRef.snapshotChanges().subscribe(snapshot => {
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

    commentsRef.valueChanges().subscribe(value => {
      const comments = [];
      value.forEach((commentData: Comment) => {
        const comment = {
          commentData: commentData,
          name: '',
        };
        const userRef = this.getUserData(commentData.userID);
        userRef.valueChanges().subscribe((user: User) => {
          comment.name = user.name;
        });
        comments[comments.length] = comment;
      });
      comments.sort(function(a, b) {
        return a.commentData.timestamp < b.commentData.timestamp ? -1 : 1;
      });
      this.comments = comments;
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
      'users/' +
        this.photoUserID +
        '/photos/' +
        this.photoID +
        '/comments/' +
        this.generateCommentID()
    );
    photoRef
      .set({
        userID: this.currentUserID,
        comment: this.commentInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch(function(error) {
        console.log('Error: ' + error);
      });
    this.commentInput = '';
  }

  showMap() {
    this.appCtrl.getRootNav().push(MapPage, {
      latitude: this.photoData.coordinates.latitude,
      longitude: this.photoData.coordinates.longitude,
    });
  }

  back() {
    if (this.source === 'profile') {
      this.navCtrl.pop();
    } else if (this.source === 'upload') {
      this.navCtrl.popToRoot();
    }
  }

  generateCommentID(): string {
    return UUID.UUID();
  }
}
