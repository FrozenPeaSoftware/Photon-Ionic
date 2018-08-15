import { ProfilePage } from './../profile/profile';
import { PhotoPage } from './../photo/photo';
import { OptionsPage } from './../options/options';
import { PhotoOptionsPage } from './../photo-options/photo-options';
import { UploadPhotoPage } from './../upload-photo/upload-photo';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPhotoPage;
  tab2Root = PhotoOptionsPage;
  tab3Root = PhotoPage;
  tab4Root = OptionsPage;
  tab5Root = ProfilePage;
  constructor() {

  }
}
