import { ProfilePage } from './../profile/profile';
import { AuthService } from "./../../services/auth.service";
import { AngularFirestore } from "angularfire2/firestore";
import { User } from "./../../app/models/user.interface";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  users: User[] = [];
  resultUsers: User[] = [];
  input: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firestore: AngularFirestore,
    public auth: AuthService
  ) {}

  ionViewDidEnter() {
    console.log("ionViewDidLoad SearchPage");
    this.getUsers();
  }

  getUsers() {
    const loadedUsers = [];
    this.firestore
      .collection("users")
      .valueChanges()
      .subscribe(element => {
        element.forEach((userData: User) => {
          const user: User = {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            biography: userData.biography,
            profilePicture: userData.profilePicture
          };
          loadedUsers.push(user);
        });
      });
      this.users = loadedUsers;
      this.resultUsers = loadedUsers;
  }

  onInput($event) {
    this.resultUsers = [];
    this.resultUsers = this.users;

    // if the value is an empty string don't filter the items
    if (!this.input) {
      return;
    }

    this.resultUsers = this.resultUsers.filter(v => {
      if (v.name && this.input) {
        if (v.name.toLowerCase().indexOf(this.input.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(this.resultUsers.length);
  }

  clickedUser(user: User) {
    this.navCtrl.push(ProfilePage, {user: user});
  }
}
