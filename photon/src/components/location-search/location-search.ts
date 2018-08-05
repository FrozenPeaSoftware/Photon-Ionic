import { Component } from '@angular/core';

/**
 * Generated class for the LocationSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'location-search',
  templateUrl: 'location-search.html'
})
export class LocationSearchComponent {

  text: string;

  constructor() {
    console.log('Hello LocationSearchComponent Component');
    this.text = 'Hello World';
  }

}
