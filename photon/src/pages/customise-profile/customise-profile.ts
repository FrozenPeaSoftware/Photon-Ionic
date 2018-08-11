import { TabsPage } from './../tabs/tabs';
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

/**
 * Generated class for the CustomiseProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-customise-profile",
  templateUrl: "customise-profile.html"
})
export class CustomiseProfilePage {
  customiseForm: FormGroup;
  customiseError: string;

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
    name: [{ type: "required", message: "Name is required" }]
  };

  constructor(public auth: AuthService, private firestore: AngularFirestore, private fb: FormBuilder, private navCtl: NavController) {
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
      )
    });
  }

  saveProfile() {
    let data = this.customiseForm.value;

    console.log(this.auth.getUID());
    const docRef = this.firestore.doc("users/" + this.auth.getUID());
    docRef
      .set({
        name: data.name,
        username: data.username,
      })
      .then(function() {
        console.log("Success");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });

    this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CustomiseProfilePage");
  }
}