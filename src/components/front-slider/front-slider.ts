import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }

  getBanners() {
    let requestBody = '';

    return this.http.post('http://24gocheck.com/index.php?route=api2/design/banners',requestBody, this.config);
  }

  constructor(private http: HttpClient) {
    
    this.getBanners().subscribe(data =>{
      console.log(data);
      this.imageArray = data['main_banners'];
    });


    // this.imageArray = [
    //   {'image':'../../assets/imgs/GUCCI-eyewear-banner1.jpg'},
    //   {'image':'../../assets/imgs/hm-philippines-10142013.jpg'},
    //   {'image':'../../assets/imgs/Zara-Banner.jpg'}
    // ]
  }

}
