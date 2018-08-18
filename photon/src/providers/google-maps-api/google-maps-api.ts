import { Observable } from 'rxjs';
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
  Marker,
  MarkerOptions
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

  initialiseMap(mapElement: ElementRef, latitude: number, longitude: number): GoogleMap {
    let element = mapElement.nativeElement;
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: latitude,
           lng: longitude
         },
         zoom: 15,
         tilt: 10
       }
    };
    return GoogleMaps.create(element, mapOptions);
  }

  addMarker(map: GoogleMap, latitude: number, longitude: number) {
    let markerOptions: MarkerOptions = {
      position: new LatLng(latitude, longitude)
    }
    return map.addMarker(markerOptions);
  }

  createMap(latitude: number, longitude: number): any {
    console.log("Making map...");
    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: latitude,
           lng: longitude
         },
         zoom: 18,
         tilt: 30
       }
    };
    let map = GoogleMaps.create('map_canvas', mapOptions);
    let markerOptions: MarkerOptions = {
      position: new LatLng(latitude, longitude)
    }
    return map.addMarker(markerOptions);
  }
}
