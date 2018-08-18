import { ImagePicker } from "@ionic-native/image-picker";
import { UserService } from "./../../services/user.service";
import { User } from "../../app/models/user.interface";
import { UUID } from "angular2-uuid";
import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from "./../tabs/tabs";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestoreModule } from "angularfire2/firestore";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "./../../services/auth.service";
import { UsernameValidator } from "../../validators/username.validator";

@IonicPage()
@Component({
  selector: "page-customise-profile",
  templateUrl: "customise-profile.html"
})
export class CustomiseProfilePage {
  public customiseForm: FormGroup;
  public customiseError: string;
  public user: User = {
    name: "",
    username: "",
    email: "",
    biography: ""
  };
  public imageSource: string =
    "https://instagram.fakl1-2.fna.fbcdn.net/vp/36bedd66b5fa8b8f6bf81650823a72f0/5BFC9C56/t51.2885-19/s150x150/38096749_208075379863871_8613051600635691008_n.jpg";

  validation_messages = {
    username: [
      { type: "required", message: "Username is required" },
      {
        type: "minlength",
        message: "Username must be at least 5 characters long"
      },
      {
        type: "maxlength",
        message: "Username cannot be more than 25 characters long"
      },
      {
        type: "pattern",
        message:
          "Your username must contain only numbers, letters and -/_ characters"
      },
      { type: "validUsername", message: "Your username has already been taken" }
    ],
    name: [{ type: "required", message: "Name is required" }],
    biography: [
      {
        type: "maxlength",
        message: "Biography cannot be more than 50 characters long"
      }
    ]
  };

  constructor(
    public auth: AuthService,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private navCtrl: NavController,
    public imagePicker: ImagePicker
  ) {
    this.customiseForm = fb.group({
      name: new FormControl("", Validators.required),
      username: new FormControl(
        "",
        Validators.compose([
          UsernameValidator.validUsername,
          Validators.maxLength(25),
          Validators.minLength(5),
          //Validators.pattern("^(?=[A-Za-z0-9]+$"),
          Validators.required
        ])
      ),
      biography: new FormControl("", Validators.maxLength(50))
    });
    console.log("Customise profile uid: " + this.auth.getUID());
    this.getUser();
    this.getImage();
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        if (user !== undefined) { this.user = user; }
      });
  }

  getImage() {}

  openImagePicker() {
    if (!this.imagePicker.hasReadPermission()) {
      this.imagePicker.requestReadPermission();
      return;
    }
    /*
    this.imagePicker.getPictures(options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          console.log("Image URI: " + results[i]);
        }
      },
      err => {}
    );*/
  }

  saveProfile() {
    let data = this.customiseForm.value;

    console.log(this.auth.getUID());
    const docRef = this.firestore.doc("users/" + this.auth.getUID());
    docRef
      .set({
        name: data.name,
        username: data.username,
        biography: data.biography
      })
      .then(function() {
        console.log("Success");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });

    this.navCtrl.push(TabsPage);
  }
}
