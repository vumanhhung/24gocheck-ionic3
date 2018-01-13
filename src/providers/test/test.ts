import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the TestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestProvider {

  films: Observable<any>;
  

  constructor(public http: HttpClient) {
    console.log('Hello TestProvider Provider');
  }


  getShops(start: number) {
    const limit = 10;
    
    console.log('all shops are here' + start);

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    let requestBody = 'limit=' + limit + '&start=' + start;


    return this.http.post('http://24gocheck.com/index.php?route=api2/shops',requestBody, config);
    // this.films
    // .subscribe(data => {
    //   console.log('my data: ', data.shops);
    // })
  }
}
