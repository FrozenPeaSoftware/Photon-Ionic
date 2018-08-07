import { RegisterPage } from "../register/register";
import { TabsPage } from "../tabs/tabs";

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public fb: FormBuilder
  ) {
    
    this.loginForm = fb.group({
			email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
			password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
		});
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  login() {
    this.navCtrl.push(TabsPage);
  }

  loginWithGoogle() {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
}
