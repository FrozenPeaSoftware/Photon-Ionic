import { PhotoOptionsPage } from './../photo-options/photo-options';
import { UploadPhotoPage } from './../upload-photo/upload-photo';
import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPhotoPage;
  tab2Root = PhotoOptionsPage;
  tab3Root = ContactPage;
  tab4Root = HomePage;

  constructor() {

  }
}
