import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

  name: string;
  location: string;

  liked: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = "Leyton Blackler";
    this.location = "Castlepoint Lighthouse"
    this.liked = false;
  }

  toggleLike() {
    this.liked = !this.liked;
  }

}
