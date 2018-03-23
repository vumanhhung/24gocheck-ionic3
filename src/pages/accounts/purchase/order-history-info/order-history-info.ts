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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public orderService: OrdersProvider) {
    
      this.order_id = this.navParams.get('id');
      this.orderService.getOrderHistoryInfo(this.order_id).subscribe(data =>{
        this.productList = data['products'] || [];
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryInfoPage');
  }

}
