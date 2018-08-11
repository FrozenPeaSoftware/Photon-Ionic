import { PhotoPage } from './../photo/photo';
import { LocationSearchComponent } from '../../components/location-search/location-search';
import { GoogleMapsApiProvider } from '../../providers/google-maps-api/google-maps-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { AuthService } from './../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-photo-options',
  templateUrl: 'photo-options.html',
})
export class PhotoOptionsPage {
  safeImageURL: any;
  base64Image: any;
  locationSearchInput: string;
  selectedLocation: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMapsAPI: GoogleMapsApiProvider,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {
    this.locationSearchInput = '';
    this.selectedLocation = false;
  }

  ionViewDidLoad() {
    this.safeImageURL = this.navParams.get('safeImageURL');
    this.base64Image = this.navParams.get('base64Image');
  }

  back() {}

  upload() {
    const UID = this.auth.getUID;
    const photoID = this.generatePhotoID();
    const docRef = this.firestore.doc('users/' + UID + '/photos/' + photoID);
    docRef
      .set({
        url: 'users/' + UID + '/photos/' + photoID + '.jpg',
        comments: {},
        likes: {},
      })
      .then(function() {
        console.log('Success');
      })
      .catch(function(error) {
        console.log('Error: ' + error);
      });

    docRef.update({
      comments: {
        name: "test user",
        comment: 'this is a comment'
      }
    })
    //const storageLocation = storage().ref('users/' + UID + '/photos/' + photoID + '.jpg');
    //storageLocation.putString(this.base64Image, 'data_url');
  }

  generatePhotoID(): string {
    return '123456';
  }

  updateSearchResults() {
    this.selectedLocation = false;
    this.googleMapsAPI.updateSearchResults(this.locationSearchInput);
  }

  selectSearchResult(item) {
    this.locationSearchInput = item.description;
    this.selectedLocation = true;
    return this.googleMapsAPI.selectSearchResult(item);
  }

  autocompleteItems() {
    return this.googleMapsAPI.autocompleteItems;
  }

  nearbyItems() {
    return this.googleMapsAPI.nearbyItems;
  }

  hideLocationSearch(): boolean {
    return (
      this.locationSearchInput.length == 0 ||
      (this.locationSearchInput.length > 0 && this.selectedLocation) ||
      this.googleMapsAPI.autocompleteItems.length == 0
    );
  }
}
