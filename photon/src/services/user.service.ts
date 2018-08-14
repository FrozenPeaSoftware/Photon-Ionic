import { AngularFireAuth } from "angularfire2/auth";
import { User } from "./../app/models/user.interface";
import { AuthService } from "./auth.service";
import { AngularFirestore } from "angularfire2/firestore";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  public name: string = "";
  public username: string = "";
  public biography: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private auth: AuthService
  ) {}

  getName() {
    this.firestore
      .collection('users')
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        this.name = user.name;
        console.log(this.name);
      });
    return this.name;
    /*
    return this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        this.name = user.name;
        //return user.name;
      });
    //console.log(this.name);
    //return this.name;
    */
  }

  getUser() {
    return this.firestore.collection('users').doc(this.auth.getUID());
  }

  getUsername(): string {
    this.firestore
    .collection('users')
    .doc(this.auth.getUID())
    .valueChanges()
    .subscribe((user: User) => {
      this.username = user.username;
      console.log(this.username);
    });
  return this.username;
      /*
    return this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        //this.username = user.username;
        return user.username;
      });
    //console.log(this.username);
    //return this.username;*/
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
    /* return this.getUser()
      .valueChanges()
      .subscribe((user: User) => {
        //this.biography = user.biography;
        return user.biography;
      }); */
    //console.log(this.biography);
    //return this.biography;
  }
}
