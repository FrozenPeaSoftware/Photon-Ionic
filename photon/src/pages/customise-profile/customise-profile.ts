import { LoadingScreenProvider } from './../../providers/loading-screen/loading-screen';
import { ImagePicker } from "@ionic-native/image-picker";
import { UserService } from "./../../services/user.service";
import { User } from "../../app/models/user.interface";
import { UUID } from "angular2-uuid";
import { AngularFireAuth } from "angularfire2/auth";
import { TabsPage } from "./../tabs/tabs";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Base64 } from "@ionic-native/base64";
import { Crop } from "@ionic-native/crop";
import { Platform } from "ionic-angular";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { storage } from "firebase";

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
    biography: "",
    profilePicture: ""
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
    public camera: Camera,
    public platform: Platform,
    public base64: Base64,
    public crop: Crop,
    public sanitizer: DomSanitizer,
    public loadingScreenProvider: LoadingScreenProvider
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
  }

  getUser() {
    this.firestore
      .collection("users")
      .doc(this.auth.getUID())
      .valueChanges()
      .subscribe((user: User) => {
        if (user !== undefined) {
          this.user = user;
        }
        if (this.user.profilePicture !== null) {
          this.imageSource = this.user.profilePicture;
        }
      });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY 
    };

    this.camera.getPicture(options).then(
      imageURI => {
        if (this.platform.is("android") && !imageURI.startsWith("file://")) {
          imageURI = "file://" + imageURI;
        }

        this.cropImage(imageURI).then(image => {
          this.base64.encodeFile(image).then(
            (base64Image: string) => {
              let safeImageURL = this.sanitizer.bypassSecurityTrustUrl(
                base64Image
              );
              this.uploadImage(safeImageURL, base64Image);
            },
            error => {
              console.error("Error encoding image to base64.", error);
            }
          );
        });
      },
      error => {
        console.error("Error getting image", error);
      }
    );
  }

  cropImage(imageURI): Promise<any> {
    return this.crop
      .crop(imageURI, {
        quality: 100,
        targetWidth: Number(this.platform.width),
        targetHeight: Number(this.platform.width)
      })
      .then(
        croppedImage => {
          console.log("Cropped image: " + croppedImage);
          return croppedImage;
        },
        error => console.error("Error cropping image.", error)
      );
  }

  uploadImage(imageURL: SafeUrl, base64Image: string) {
    //this.loadingScreenProvider.show('Uploading photo...');

    let context = this;

    const userID = this.auth.getUID();
    const photoID = UUID.UUID();

    const storageLocation = storage().ref(
      "users/" + userID + "/photos/" + photoID + ".jpg"
    );
    storageLocation.putString(base64Image, "data_url").then(data => {
      storageLocation.getDownloadURL().then(url => {
        this.imageSource = String(url);
      });
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
        biography: data.biography,
        profilePicture: this.imageSource
      })
      .then(function() {
        console.log("Success");
      })
      .catch(function(error) {
        console.log("Error: " + error);
      });

    this.navCtrl.push(TabsPage);
  }
    //this.loadingScreenProvider.show('Loading Photo...'); 

}
