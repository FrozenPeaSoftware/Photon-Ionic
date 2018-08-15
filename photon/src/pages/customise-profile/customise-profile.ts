import { UserService } from "./../../services/user.service";
import { User } from '../../app/models/user.interface';
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
  customiseForm: FormGroup;
  customiseError: string;
  name: string;
  username: string;
  biography: string;

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
        message: "Biography cannot be more than 100 characters long"
      }
    ]
  };

  constructor(
    public auth: AuthService,
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService
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
      biography: new FormControl("", Validators.maxLength(100))
    });
    this.name = this.getName();
    this.username = this.getUsername();
    this.biography = this.getBiography();
  }

  getName(): string {
    //console.log(this.userService.getName());
    //return this.userService.getName();
    this.firestore
      .collection('users')
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.name = user.name;
        console.log(this.name);
      });
    return this.name;
  }

  getUsername(): string {
    //console.log(this.userService.getUsername());
    //return this.userService.getUsername();
    this.firestore
      .collection('users')
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.username = user.username;
        console.log(this.username);
      });
    return this.username;
  }

  getBiography(): string {
    this.firestore
      .collection('users')
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.biography = user.biography;
        console.log(this.biography);
      });
    return this.biography;
    /* console.log(this.userService.getBiography());
    return this.userService.getBiography(); */
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

  ionViewDidLoad() {
    console.log("ionViewDidLoad CustomiseProfilePage");
  }
}
