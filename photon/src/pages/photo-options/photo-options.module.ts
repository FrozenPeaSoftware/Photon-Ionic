import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoOptionsPage } from './photo-options';

@NgModule({
  declarations: [
    PhotoOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoOptionsPage),
  ],
})
export class PhotoOptionsPageModule {}
