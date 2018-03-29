import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPointPage } from './add-point/add-point';
import { DeliveryPointPage } from './delivery-point/delivery-point';
import { HistoryTransactionPage } from './history-transaction/history-transaction';
import { AccountsProvider } from '../../../providers/accounts/accounts';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  addPointPage: any;
  deliveryPointPage: any;
  historyTransactionPage: any;
  customer_point: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountService: AccountsProvider) {
    this.addPointPage = AddPointPage;
    this.deliveryPointPage = DeliveryPointPage;
    this.historyTransactionPage = HistoryTransactionPage;

    this.customer_point = accountService.getUserInfo()['point'];

    // console.log('U info',accountService.getUserInfo());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
