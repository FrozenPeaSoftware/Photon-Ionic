import { Injectable, ElementRef } from '@angular/core';
import { Component, NgZone } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Injectable()
export class GoogleMapsApiProvider {
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;

  constructor(
    public zone: NgZone,
    public loadingCtrl: LoadingController
  ) {
    this.geocoder = new google.maps.Geocoder();
    let elem = document.createElement('div');
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.loading = this.loadingCtrl.create();
  }

  updateSearchResults(input) {
    if (input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach(prediction => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      }
    );
  }

  createMap(): any {
    console.log("Making map...");
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };
    return GoogleMaps.create('map_canvas', mapOptions);
  }

  selectSearchResult(item) {
    /*this.loading.present();
    this.autocompleteItems = [];
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.autocompleteItems = [];
        this.GooglePlaces.nearbySearch(
          {
            location: results[0].geometry.location,
            radius: '500',
            types: ['restaurant'], //check other types here https://developers.google.com/places/web-service/supported_types
            // key: 'YOUR_KEY_HERE'
          },
          near_places => {
            this.zone.run(() => {
              this.nearbyItems = [];
              for (var i = 0; i < near_places.length; i++) {
                this.nearbyItems.push(near_places[i]);
              }
              this.loading.dismiss();
            });
          }
        );
      }
    });*/
  }
}
