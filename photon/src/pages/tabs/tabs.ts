import { OptionsPage } from '../options/options';
import { PhotoOptionsPage } from '../photo-options/photo-options';
import { UploadPhotoPage } from '../upload-photo/upload-photo';
import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPhotoPage;
  tab2Root = PhotoOptionsPage;
  tab3Root = ContactPage;
  tab4Root = OptionsPage;

  constructor() {

  }
}
