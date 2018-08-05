import { LocationSearchComponent } from './../../components/location-search/location-search';
import { GoogleMapsApiProvider } from './../../providers/google-maps-api/google-maps-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';

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
    public googleMapsAPI: GoogleMapsApiProvider
  ) {
    this.locationSearchInput = '';
    this.selectedLocation = false;
  }

  ionViewDidLoad() {
    this.safeImageURL = this.navParams.get('safeImageURL');
    this.base64Image = this.navParams.get('base64Image');
  }

  back() {
    this.navCtrl.pop();
  }

  upload() {
    const photos = storage().ref('Photos/photo.jpg');
    photos.putString(this.base64Image, 'data_url');
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
