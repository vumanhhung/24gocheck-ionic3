import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  noti: string = "event";
  userNotifications = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public notification: NotificationsProvider, public viewCtrl: ViewController) {
    
    console.log(this.userNotifications);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.userNotifications = this.notification.getUserNotifications();
  }

  // notiClick() {
  //   console.log('CLicked noti');
  //   this.notification.addUserNotification('Aomine from here', 'add_transaction');
  //   this.userNotifications = this.notification.getUserNotifications();
  // }
  
  removeNotification(item) {
    let index = this.userNotifications.indexOf(item);
    this.userNotifications.splice(index, 1);
    this.notification.setUserNofification(this.userNotifications);
  }

  goToTransactionPage() {
    alert('Transaction page');
  }

  goToOrderPage() {
    alert('Order page');
  }

}
