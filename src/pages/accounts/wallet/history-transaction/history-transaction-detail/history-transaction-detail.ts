import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../../../../providers/accounts/accounts';

/**
 * Generated class for the HistoryTransactionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-transaction-detail',
  templateUrl: 'history-transaction-detail.html',
})
export class HistoryTransactionDetailPage {
  transaction_id: any;
  transactionDetail = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountService: AccountsProvider) {
    this.transaction_id = this.navParams.get('id');
    this.accountService.getPointTransactionDetail(this.transaction_id).subscribe(data => {
      this.transaction_id = data;
      alert("product order list "+ JSON.stringify(data));
      this.transactionDetail = data['detail'] || {};
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryTransactionDetailPage');
  }

}
