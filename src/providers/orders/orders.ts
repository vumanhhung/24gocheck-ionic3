import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the OrdersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrdersProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrdersProvider Provider');
  }
  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }
  getOrderHistory(){
    let requestBody = '';
    return this.http.post('http://24gocheck.com/index.php?route=api2/order_history', requestBody, this.config);
  }

  getOrderHistoryInfo(order_id){
    let requestBody = 'order_id='+order_id;
    return this.http.post('http://24gocheck.com/index.php?route=api2/order_history/info', requestBody, this.config);
  }
}
