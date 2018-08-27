import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';
import { PhotoPage } from "./../photo/photo";
import { OptionsPage } from "./../options/options";
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
  public userID: string = "";
  public user: User = {
    name: "",
    username: "",
    email: "",
    biography: "",
    profilePicture: ""
  };
  public imageSource: string =
    "https://instagram.fakl1-2.fna.fbcdn.net/vp/36bedd66b5fa8b8f6bf81650823a72f0/5BFC9C56/t51.2885-19/s150x150/38096749_208075379863871_8613051600635691008_n.jpg";
  public postedPhotos: Photo[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private firestore: AngularFirestore,
    public loadingScreenProvider: LoadingScreenProvider
  ) {
    this.loadingScreenProvider.show('Loading...');        
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.user = user;
        if (user.profilePicture !== null) {
          this.imageSource = user.profilePicture;
        }
      });
  }

  getPostedPhotos() {
    this.postedPhotos = [];
    console.log("Length of posted photos: " + this.postedPhotos.length);
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .collection("photos")
      .snapshotChanges()
      .subscribe(photos => {
        photos.forEach((photoData) => {
          const photo: Photo = {
            description: photoData.payload.doc.data().description,
            locationDescription: photoData.payload.doc.data().locationDescription,
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


      //this.postedPhotos.reverse();      
  }

  optionsButtonClicked() {
    this.navCtrl.push(OptionsPage);
  }

  openPhoto(userID: string, photoID: string) {
    this.navCtrl.push(PhotoPage, {
      userID: userID,
      photoID: photoID,
      source: "profile"
    });
  }

  ionViewWillEnter() {
    this.postedPhotos = [];
    this.getPostedPhotos();  
  }	

  ionViewDidLoad() {
    this.getUser();
    this.userID = this.auth.getUID();
  }
}
