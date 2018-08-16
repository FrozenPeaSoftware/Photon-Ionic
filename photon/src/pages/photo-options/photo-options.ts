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

import { UUID } from 'angular2-uuid';

import * as firebase from 'firebase';
import { LatLng } from '../../../node_modules/@ionic-native/google-maps';

export interface LocationItem {
  description: string,
  location: LatLng,
  placeID: string
}

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
  description: string;

  locationItem: LocationItem;

  GooglePlaces: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMapsAPI: GoogleMapsApiProvider,
    private auth: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.locationSearchInput = '';
    this.selectedLocation = false;
    let elem = document.createElement('div');
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
  }

  ionViewDidLoad() {
    this.safeImageURL = this.navParams.get('safeImageURL');
    this.base64Image = this.navParams.get('base64Image');
  }

  back() {}

  upload() {
    const userID = this.auth.getUID();
    const photoID = this.generatePhotoID();

    const storageLocation = storage().ref(
      'users/' + userID + '/photos/' + photoID + '.jpg'
    );
    storageLocation.putString(this.base64Image, 'data_url').then(data => {
      storageLocation.getDownloadURL().then(url => {
        const photoRef = this.firestore.doc(
          'users/' + userID + '/photos/' + photoID
        );
        photoRef
          .set({
            userID: userID,
            description: this.description,
            location: this.locationSearchInput,
            coordinates: {
              latitude: 0,
              longitude: 0,
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            url: url
          })
          .then(function() {
            console.log('Success');
          })
          .catch(function(error) {
            console.log('Error: ' + error);
          });
      });
    });
  }

  generatePhotoID(): string {
    return UUID.UUID();
  }

  updateSearchResults() {
    this.selectedLocation = false;
    this.googleMapsAPI.updateSearchResults(this.locationSearchInput);
  }

  selectSearchResult(item) {

    let locationItem: LocationItem;

    function fn(place, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.log('Error getting place details, status code: ' + status);
      }
      locationItem = {
        description: item.description,
        location: place.geometry.location,
        placeID: item.place_id
      }
      console.log(locationItem.location);
    };

    this.locationItem = locationItem;

    this.locationSearchInput = item.description;
    this.selectedLocation = true;

    this.GooglePlaces.getDetails({
      placeId: item.place_id
    }, fn);
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
