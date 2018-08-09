import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
})
export class PhotoPage {

  name: string;
  location: string;
  likes: Number;
  description: string;

  liked: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.name = "Leyton Blackler";
    this.location = "Red Rocks"
    this.likes = 462;
    this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac mi et elit pharetra lacinia et sed turpis. Fusce convallis enim eu nulla malesuada hendrerit. Phasellus pellentesque commodo est, eu dictum sem fermentum a. Etiam ornare varius scelerisque. Etiam consectetur odio ut sem auctor dapibus. Maecenas sit amet faucibus elit. Morbi in leo a risus facilisis facilisis a sagittis tortor.\n\nNam quis pharetra ipsum. Quisque condimentum metus at leo pellentesque hendrerit. Vestibulum dapibus volutpat sapien, malesuada suscipit erat tincidunt ut. Vivamus viverra neque hendrerit erat porta condimentum. Donec vel arcu iaculis, sagittis leo eget, blandit velit. Nullam sit amet vulputate nulla, condimentum mattis ligula. Etiam vel sollicitudin ex, ut maximus ante. Curabitur at odio sed sapien feugiat lacinia. Maecenas ultrices, lacus sit amet porta iaculis, ipsum dui rutrum ipsum, quis convallis nulla dolor eu erat. Ut lacus neque, maximus et libero ac, lacinia cursus augue. Sed elit augue, suscipit ac sapien ac, dictum tempor risus. Donec eu ornare ex, in condimentum odio. Aliquam augue justo, luctus quis quam at, tincidunt condimentum elit. Praesent posuere quam eu risus feugiat, vel dictum augue porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nDonec ornare hendrerit est vitae malesuada. Quisque convallis arcu tellus, ac iaculis erat lobortis in. Nam rhoncus purus odio, vitae elementum elit tincidunt in. Nulla facilisi. Suspendisse id justo facilisis, iaculis lectus a, tempor dolor. Ut odio ante, commodo vitae sagittis quis, bibendum vel tellus. Sed porta scelerisque dui, pretium tincidunt elit mollis at. Nam metus diam, consequat ut nisl non, dictum molestie sapien. In hac habitasse platea dictumst. Nulla aliquam, lacus id commodo interdum, justo ex interdum justo, sed accumsan massa sapien nec neque. Fusce luctus justo ac est maximus fringilla. Duis hendrerit neque odio, sit amet finibus justo bibendum sed."
    this.liked = false;
  }

  toggleLike() {
    this.liked = !this.liked;
  }

  showMap() {
    let mapModal = this.modalCtrl.create(MapPage, { userId: 8675309 });
    mapModal.present();
  }

}
