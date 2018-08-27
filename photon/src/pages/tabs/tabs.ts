import { ProfilePage } from './../profile/profile';
import { OptionsPage } from './../options/options';
import { UploadPhotoPage } from './../upload-photo/upload-photo';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPhotoPage;
  tab2Root = SearchPage;
  tab3Root = ProfilePage;
  tab4Root = OptionsPage;
  constructor() {

  }
}
