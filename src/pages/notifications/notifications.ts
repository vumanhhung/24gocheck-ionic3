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

  constructor(public navCtrl: NavController, public navParams: NavParams, public notification: NotificationsProvider) {
    this.userNotifications = notification.getUserNotifications();
    console.log(this.userNotifications);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  

}
