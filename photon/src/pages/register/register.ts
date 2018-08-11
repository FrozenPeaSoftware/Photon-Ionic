import { CustomiseProfilePage } from './../customise-profile/customise-profile';
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

import { AuthService } from "./../../services/auth.service";
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
    public auth: AuthService,
    public afAuth: AngularFireAuth
  ) {
    this.registerForm = fb.group(
      {
        email: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.email])
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
    let data = this.registerForm.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.register(credentials).then(() => {
      this.navCtrl.setRoot(CustomiseProfilePage);
    }, error => (this.registerError = error.message));
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
}
