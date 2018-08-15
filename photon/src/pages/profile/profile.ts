import { CustomiseProfilePage } from './../customise-profile/customise-profile';
import { AngularFirestore } from "angularfire2/firestore";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../app/models/user.interface";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public user: User = {
    name: "",
    username: "",
    email: "",
    biography: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {
    this.getUser();
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  optionsButtonClicked() {
    this.navCtrl.push(CustomiseProfilePage);
  }

  ionViewDidLoad() {
    this.getUser();
    console.log("ionViewDidLoad ProfilePage");
  }
}
