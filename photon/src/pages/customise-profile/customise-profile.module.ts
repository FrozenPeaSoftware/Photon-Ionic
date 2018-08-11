import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CustomiseProfilePage } from "./customise-profile";
import { AngularFirestoreModule } from "angularfire2/firestore";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { AuthService } from "./../../services/auth.service";

@NgModule({
  declarations: [CustomiseProfilePage],
  imports: [IonicPageModule.forChild(CustomiseProfilePage)]
})
export class CustomiseProfilePageModule {
  
  constructor(public auth: AuthService, private firestore: AngularFirestore) {}

  saveProfile() {
    console.log(this.auth.getUID());
    const docRef = this.firestore.doc("users/" + this.auth.getUID());
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
