import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersProvider } from '../../../../providers/orders/orders';

/**
 * Generated class for the OrderHistoryInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-history-info',
  templateUrl: 'order-history-info.html',
})
export class OrderHistoryInfoPage {
  order_id :any;
  productList = [];
  order_history_details: {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrdersProvider) {
    
      this.order_id = this.navParams.get('id');
      this.orderService.getOrderHistoryInfo(this.order_id).subscribe(data =>{
        this.order_history_details = data;
        // alert("product order list "+ JSON.stringify(this.order_history_details));
        this.productList = data['products'] || [];
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryInfoPage');
  }

}
