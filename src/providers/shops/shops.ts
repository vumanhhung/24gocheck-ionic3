import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ShopsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopsProvider {

  constructor(public http: HttpClient) {}

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }


  getShopList(start: number) {
    const limit = 10;
    console.log('all shops are here' + start);
    let requestBody = 'limit=' + limit + '&start=' + start;
    return this.http.post('http://24gocheck.com/index.php?route=api2/shops',requestBody, this.config);
  }


  getShopDetails(shop: any, start: number) {
    const limit = 10;
    let shop_id = shop.user_id;
    let requestBody = 'search=&limit=' + limit + '&start=' + start + '&user_id=' + shop_id + '&order=DESC';
    return this.http.post('http://24gocheck.com/index.php?route=api2/shops',requestBody, this.config);
  }

  getUserLists(lat: number, long: number) {
    let requestBody = 'latitude='+ lat + '&longitude=' + long;
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_list', requestBody, this.config);
  }


}
