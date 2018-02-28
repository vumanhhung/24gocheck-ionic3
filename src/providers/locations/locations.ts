import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocationsProvider {

  data: any;

  constructor(public http: HttpClient) {
  }

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      let body = 'latitude=' + 21.01186015979696 + '&longitude=' + 105.7113341;

      this.http.post('http://24gocheck.com/index.php?route=api2/user_list', body, this.config)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
      });
    });

  }

}
