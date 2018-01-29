import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocationsProvider {

  data: any;

  constructor(public http: HttpClient) {
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      this.http.post('http://24gocheck.com/index.php?route=api2/user_list', '', {})
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
      });
    });

  }

}
