import { LoginPage } from "../login/login";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { AuthService } from "./../../services/auth.service";
import { UsernameValidator } from "../../validators/username.validator";
import { PasswordValidator } from "../../validators/password.validator";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerForm: FormGroup;
  registerError: string;

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
    email: [{ type: "required", message: "Email is required" }],
    password: [
      { type: "required", message: "Password is required" },
      {
        type: "minLength",
        message: "Password must be at least 6 characters long"
      },
      {
        type: "minLength",
        message: "Password must be at least 6 characters long"
      },
      { type: "areEqual", message: "Passwords do not match" }
    ]
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) {
    this.registerForm = fb.group(
      {
        name: new FormControl("", Validators.required),
        email: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.email])
        ),
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
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.required,
            //this is for the letters (both uppercase and lowercase) and numbers validation
            Validators.pattern(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
            )
          ])
        ),
        confirm_password: new FormControl("", Validators.required)
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      }
    );
  }

  registerAccount() {
    let success = false;
    let data = this.registerForm.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.register(credentials).then(() => {
      success = true;
      this.navCtrl.setRoot(LoginPage);
    }, error => (this.registerError = error.message));

    if (success) {
      //Put details in database
      const docRef = this.firestore.doc("users/" + this.auth.getUID);
      docRef
        .set({
          name: data.name,
          username: data.username,
          email: data.email
        })
        .then(function() {
          console.log("Success");
        })
        .catch(function(error) {
          console.log("Error: " + error);
        });
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
}
