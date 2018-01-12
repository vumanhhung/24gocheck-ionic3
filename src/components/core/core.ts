import { Component } from '@angular/core';

/**
 * Generated class for the CoreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'core',
  templateUrl: 'core.html'
})
export class CoreComponent {

  text: string;

  constructor() {
    console.log('Hello CoreComponent Component');
    this.text = 'Hello World';
  }

}
