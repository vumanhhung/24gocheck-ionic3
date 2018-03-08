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


  getShopDetails(user_id) {

    let requestBody ='user_id=' + user_id;
    return this.http.post('http://24gocheck.com/index.php?route=api2/shops',requestBody, this.config);
  }

  getUserLists(lat: number, long: number) {
    let requestBody = 'latitude='+ lat + '&longitude=' + long;
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_list', requestBody, this.config);
  }

  getShopListByZoneId(zone_id: number, start: number) {
    const limit = 10;
    console.log('all shops are here' + start);
    let requestBody = 'limit=' + limit + '&start=' + start + '&zone_id=' + zone_id;
    return this.http.post('http://24gocheck.com/index.php?route=api2/shops',requestBody, this.config);
  }


}
