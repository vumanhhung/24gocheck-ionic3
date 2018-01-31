import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ZonesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ZonesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ZonesProvider Provider');
  }

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }

  getZones() {
    const VIETNAM = 230;
    let country_id = VIETNAM;

    let requestBody = 'country_id=' + country_id;

    return this.http.post('http://24gocheck.com/index.php?route=api2/address/getZones', requestBody, this.config);
  }
}
