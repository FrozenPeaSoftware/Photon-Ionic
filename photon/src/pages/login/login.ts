import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';
import { RegisterPage } from "../register/register";
import { TabsPage } from "../tabs/tabs";

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public fb: FormBuilder,
    public loadingScreenProvider: LoadingScreenProvider
  ) {
    this.loginForm = fb.group({
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      )
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  loginTest() {
    this.navCtrl.push(TabsPage);
  }

  login() {
    this.loadingScreenProvider.show("Logging in...");
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth
      .loginWithEmail(credentials)
      .then(
        () => {
          this.navCtrl.setRoot(TabsPage);
          this.loadingScreenProvider.dismiss();
        },
        error => {
          this.loadingScreenProvider.dismiss();
          this.loginError = error.message;
        }
      );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
}
