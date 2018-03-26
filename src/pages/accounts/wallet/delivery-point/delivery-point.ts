import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../../../providers/accounts/accounts';

/**
 * Generated class for the DeliveryPointPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery-point',
  templateUrl: 'delivery-point.html',
})
export class DeliveryPointPage {

  receiverAccount: string;
  receiverId: number;
  receiverName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public accountService: AccountsProvider) {
    this.receiverAccount = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveryPointPage');
  }

  checkAccountExist(ev: any) {

    let val = ev.target.value;

    if(val === '' || val === null) {
      this.receiverId = null;
      this.receiverName = '';
    } else {
      this.accountService.getReceiverInfo(val).subscribe(data => {
        this.receiverId = data['receiver_id'];

        if(this.receiverId) {
          this.receiverName = `${data['lastname']} ${data['firstname']}`;          
        } else {
          this.receiverName = `Tài khoản hưởng không tồn tại`;
        }


        console.log(`Receiver_id is ${this.receiverId} and Name is ${this.receiverName}`);
      });
    }
  }

}
