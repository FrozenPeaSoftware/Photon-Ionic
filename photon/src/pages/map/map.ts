import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GoogleMapsApiProvider } from '../../providers/google-maps-api/google-maps-api';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public googleMapsAPI: GoogleMapsApiProvider) {}

  ionViewDidLoad() {
    this.map = this.googleMapsAPI.createMap();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
