import { LoadingScreenProvider } from "./../../providers/loading-screen/loading-screen";
import { PhotoPage } from "./../photo/photo";
import { CustomiseProfilePage } from "./../customise-profile/customise-profile";
import { AngularFirestore, fromDocRef } from "angularfire2/firestore";
import { AuthService } from "./../../services/auth.service";
import { User } from "./../../app/models/user.interface";
import { Photo } from "./../../app/models/photo.interface";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
    biography: "",
    profilePicture: "",
    userID: ""
  };
  public source: string;
  public imageSource: string = "/assets/imgs/default.png";
  public postedPhotos: Photo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingScreenProvider: LoadingScreenProvider
  ) {
    this.loadingScreenProvider.show("Loading...");
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.user.name = user.name;
        this.user.username = user.username;
        this.user.biography = user.biography;
        this.user.userID = this.auth.getUID();
        if (user.profilePicture != null) {
          this.imageSource = user.profilePicture;
        }
      });
  }

  getPostedPhotos() {
    this.postedPhotos = [];
    this.firestore
      .collection("users")
      .doc(this.user.userID)
      .collection("photos")
      .snapshotChanges()
      .subscribe(photos => {
        photos.forEach(photoData => {
          const photo: Photo = {
            description: photoData.payload.doc.data().description,
            locationDescription: photoData.payload.doc.data()
              .locationDescription,
            coordinates: photoData.payload.doc.data().coordinates,
            timestamp: photoData.payload.doc.data().timestamp,
            url: photoData.payload.doc.data().url,
            id: photoData.payload.doc.id
          };
          this.postedPhotos[this.postedPhotos.length] = photo;
        });
        this.postedPhotos.sort(function(a, b) {
          return a.timestamp < b.timestamp ? 1 : -1;
        });
      });
  }

  editButtonClicked() {
    this.navCtrl.push(CustomiseProfilePage);
  }

  openPhoto(photoID: string) {
    this.navCtrl.push(PhotoPage, {
      userID: this.user.userID,
      photoID: photoID,
      source: "profile"
    });
  }

  ionViewWillEnter() {
    var tempUser = this.navParams.get("user");
    this.source = this.navParams.get("source");
    if (tempUser !== undefined) {
      this.user = tempUser;
      if (this.user.profilePicture != null) {
        this.imageSource = this.user.profilePicture;
      }
    } else {
      this.user.userID = this.auth.getUID();
      this.getUser();
    }
    this.postedPhotos = [];
    this.getPostedPhotos();
  }
}
