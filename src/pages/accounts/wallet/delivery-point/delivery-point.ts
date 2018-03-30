import { NotificationsProvider } from './../../../../providers/notifications/notifications';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
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

  receiverId: number;
  receiverName: string;
  trader_id: number;
  point: number;
  comment: string;
  user_info: any;
  email: string;
  userFullName: string;
  transactionForm: FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public accountService: AccountsProvider, 
    public formBuilder: FormBuilder,
    public notification: NotificationsProvider) {

      this.user_info = this.accountService.getUserInfo();
      this.trader_id = this.user_info['customer_id'];
      this.email = this.user_info['email'];
      // alert('customer id is :' + this.trader_id);

      this.userFullName = this.user_info['lastname'] + ' ' +this.user_info['firstname'];


      this.transactionForm = this.formBuilder.group({
        point: [],
        comment: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(100)] )],
      });
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


  confirmTransfer() {

    let transaction = {
      trader_id: this.trader_id,
      receiver_id: this.receiverId,
      point: this.transactionForm.value.point,
      comment: this.transactionForm.value.comment
    };


    this.accountService.createTransaction(transaction).subscribe(data => {
      this.sendSuccessfullCreatedTransactionNotificationToTrader(transaction.trader_id, transaction.point);
      this.sendSuccessfullCreatedTransactionNotificationToReceiver(transaction.receiver_id, transaction.point);
      alert('Giao dịch thành công');
    }, error => {
      alert('Giao dịch không thành công');
    });

    // alert('Transaction is '+ JSON.stringify(transaction));
  }



  sendSuccessfullCreatedTransactionNotificationToTrader(trader_id, point) {
    let content ={};
    content['title'] = 'Chợ phổ thông';
    content['body'] = 'Giao dịch của bạn đã thành công';
    content['type'] = 'add_transaction';
    content['message'] = 'Bạn đã chuyển '+ point + 'điểm';
    content['topics'] = 'customer_id_'+ trader_id;

    this.notification.sendFCMNotification(content);
  }

  sendSuccessfullCreatedTransactionNotificationToReceiver(receiver_id, point) {
    let content ={};
    content['title'] = 'Chợ phổ thông';
    content['body'] = 'Bạn đã nhận được điểm từ ai đó';
    content['type'] = 'add_transaction';
    content['message'] = 'Bạn đã nhận '+ point + 'điểm';
    content['topics'] = 'customer_id_'+ receiver_id;

    this.notification.sendFCMNotification(content);
  }

}
