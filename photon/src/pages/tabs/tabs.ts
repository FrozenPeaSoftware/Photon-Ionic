<<<<<<< HEAD
import { PhotoPage } from './../photo/photo';
import { OptionsPage } from './../options/options';
import { PhotoOptionsPage } from './../photo-options/photo-options';
import { UploadPhotoPage } from './../upload-photo/upload-photo';
=======
import { OptionsPage } from '../options/options';
import { PhotoOptionsPage } from '../photo-options/photo-options';
import { UploadPhotoPage } from '../upload-photo/upload-photo';
>>>>>>> f8da274afe90f829eebab5f8d145d93f8a7fe855
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPhotoPage;
  tab2Root = PhotoOptionsPage;
  tab3Root = PhotoPage;
  tab4Root = OptionsPage;

  constructor() {

  }
}
