import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {}

  back() {
    this.navCtrl.pop();
  }

  linkToGitHub() {
    window.open("https://github.com/FrozenPeaSoftware",'_system', 'location=yes');
  }

  email() {
    // TODO
  }

}
