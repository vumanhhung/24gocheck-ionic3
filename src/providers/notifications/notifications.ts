import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  userNotifications = [];

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello NotificationsProvider Provider');
    this.userNotifications = [];
  }


  addUserNotification(message) {
    let today = new Date();
    

    this.userNotifications.unshift({
      message: message,
      time: today
    });
  }


  getUserNotifications() {
    this.storage.get('user_notifications').then((data) => {
      this.userNotifications = data || [];
    });

    // this.userNotifications.unshift({
    //   message: 'Shika is here',
    //   time: new Date()
    // });

    return this.userNotifications;
  }

}
