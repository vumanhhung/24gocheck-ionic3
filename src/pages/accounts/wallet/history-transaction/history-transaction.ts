import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../../../providers/accounts/accounts';
import { HistoryTransactionDetailPage } from './history-transaction-detail/history-transaction-detail';

/**
 * Generated class for the HistoryTransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-transaction',
  templateUrl: 'history-transaction.html',
})
export class HistoryTransactionPage {
  historyTransactionDetailPage: any; 
  historyTransaction=[];
  customer_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountService: AccountsProvider) {
    this.customer_id = accountService.getUserInfo()['customer_id'];
    this.accountService.getPointTransactionHistory(this.customer_id).subscribe(data => {
      this.historyTransaction = data['history'] || [];
      console.log(JSON.stringify(data));
    }, error => {

    })
    this.historyTransactionDetailPage = HistoryTransactionDetailPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryTransactionPage');
  }

}
