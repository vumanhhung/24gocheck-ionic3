import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPointPage } from './add-point/add-point';
import { DeliveryPointPage } from './delivery-point/delivery-point';
import { HistoryTransactionPage } from './history-transaction/history-transaction';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.addPointPage = AddPointPage;
    this.deliveryPointPage = DeliveryPointPage;
    this.historyTransactionPage = HistoryTransactionPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
