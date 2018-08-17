import { PhotoPage } from './../photo/photo';
import { LocationSearchComponent } from '../../components/location-search/location-search';
import { GoogleMapsApiProvider } from '../../providers/google-maps-api/google-maps-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';

import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';

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
  valid: boolean;
  description: string;
  latitude: number;
  longitude: number;
  placeID: string;
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

  locationItem: LocationItem = {
    valid: false,
    description: '',
    latitude: -1,
    longitude: -1,
    placeID: '',
  };

  GooglePlaces: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMapsAPI: GoogleMapsApiProvider,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingScreenProvider: LoadingScreenProvider
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
    this.loadingScreenProvider.show('Uploading photo...');

    let context = this;

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
        let latitude = -1;
        let longitude = -1;
        if (this.locationItem.valid) {
          latitude = this.locationItem.latitude;
          longitude = this.locationItem.longitude;
        }
        photoRef
          .set({
            userID: userID,
            description: this.description,
            locationDescription: this.locationSearchInput,
            coordinates: {
              latitude: latitude,
              longitude: longitude,
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            url: url,
          })
          .then(function() {
            console.log('Photo upload successful!');
            context.goToPhoto(context, userID, photoID);
          })
          .catch(function(error) {
            console.log('Error: ' + error);
            // TODO: Handle error when photo did not upload correctly.
          });
      });
    });
  }

  goToPhoto(context, userID, photoID) {
    context.loadingScreenProvider.dismiss();
    context.navCtrl.push(PhotoPage, {
      userID: userID,
      photoID: photoID,
      source: 'upload'
    });
  }

  generatePhotoID(): string {
    return UUID.UUID();
  }

  updateSearchResults() {
    if (this.locationSearchInput !== this.locationItem.description) {
      console.log('Setting location item as invalid.');
      this.locationItem.valid = false;
    }
    this.selectedLocation = false;
    this.googleMapsAPI.updateSearchResults(this.locationSearchInput);
  }

  selectSearchResult(item) {
    this.locationSearchInput = item.description;
    this.selectedLocation = true;

    function setLocationCallback(context, place, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.log('Error getting place details, status code: ' + status);
      }
      context.locationItem = {
        valid: true,
        description: item.description,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        placeID: item.place_id,
      };
    }

    let context = this;

    this.GooglePlaces.getDetails(
      {
        placeId: item.place_id,
      },
      function(place, status) {
        setLocationCallback(context, place, status);
      }
    );
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
