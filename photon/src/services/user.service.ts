import { AngularFireAuth } from "angularfire2/auth";
import { User } from "./../app/models/user.interface";
import { AuthService } from "./auth.service";
import { AngularFirestore } from "angularfire2/firestore";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  private name: string;
  private username: string;
  private biography: string;

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {}

  getName(): string {
    this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        this.name = user.name;
      });
    console.log(this.name);
    return this.name;
  }

  getUser() {
    return this.firestore.collection("users").doc(this.auth.getUID());
  }

  getUsername(): string {
    this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        this.username = user.username;
      });
    console.log(this.username);
    return this.username;
  }

  getBiography(): string {
    this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        this.biography = user.biography;
      });
    console.log(this.biography);
    return this.biography;
  }
}
