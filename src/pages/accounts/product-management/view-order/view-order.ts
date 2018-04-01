import { ViewOrderDetailPage } from './view-order-detail/view-order-detail';
import { AccountsProvider } from './../../../../providers/accounts/accounts';
import { ShopsProvider } from './../../../../providers/shops/shops';
import { OrdersProvider } from './../../../../providers/orders/orders';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.html',
})
export class ViewOrderPage {
  shopOrderList = [];
  user_info: any;
  user_id: any;
  viewOrderDetail: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopOrderService: OrdersProvider, 
    public accountService: AccountsProvider) {
    // this.viewOrderDetail = ViewOrderDetailPage;
    this.user_info = accountService.getUserInfo();
    this.user_id = this.user_info['user_id'];
    this.shopOrderService.getShopOrder(this.user_id).subscribe(data => {
      this.shopOrderList = data['shop_order'];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewOrderPage');
  }

}
