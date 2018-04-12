import { OrdersProvider } from './../../../../../providers/orders/orders';
import { AccountsProvider } from './../../../../../providers/accounts/accounts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-order-detail',
  templateUrl: 'view-order-detail.html',
})
export class ViewOrderDetailPage {
  shopOrderList = [];
  order_detail: {};
  order_id: any;
  user_info: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrdersProvider, public accountService: AccountsProvider) {

    this.user_info = this.accountService.getUserInfo();
    let user_id = this.user_info['user_id'];
    this.order_id = this.navParams.get('order_id');
    this.orderService.getShopOrderDetails(user_id, this.order_id).subscribe(data => {
      this.shopOrderList = data['shop_order_details'];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderDetailPage');
  }

}
