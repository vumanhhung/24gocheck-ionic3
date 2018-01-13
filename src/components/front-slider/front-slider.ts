import { Component } from '@angular/core';

/**
 * Generated class for the FrontSliderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'front-slider',
  templateUrl: 'front-slider.html'
})
export class FrontSliderComponent {

  imageArray: any = [];

  constructor() {
    this.imageArray = [
      {'image':'../../assets/imgs/GUCCI-eyewear-banner1.jpg'},
      {'image':'../../assets/imgs/hm-philippines-10142013.jpg'},
      {'image':'../../assets/imgs/Zara-Banner.jpg'}
    ]
  }

}
