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


  /**
   * tạo tin nhắn
   * @param message (string) nội dung tin nhắn
   */
  addUserNotification(message, type) {
    let today = new Date();
    

    this.userNotifications.unshift({
      message: message,
      type: type,
      time: today
    });

    this.storage.set('user_notifications', this.userNotifications);
    console.log('Added '+ JSON.stringify(this.userNotifications));
  }


  /**
   * hiển thị danh sách tin nhắn
   */
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

  getNotificationCount() {
    return this.userNotifications.length;
  }

  setUserNofification(user_notifications) {
    this.storage.set('user_notifications', user_notifications);
  }


  sendFCMNotification(content) {

    let body = {
      "notification":{
        "title":content['title'],
        "body": content['body'],
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"icon"
      },
      "data":{
        "type": content['type'],
        "message": content['message'],
      },
        "to":"/topics/" + content['topics'] ,
        "priority":"high",
        "restricted_package_name":""
    }


    var config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AIzaSyA809s8XMHkh0OMDWaGJ3ecCAdGbAr0T1A'
      }
    }

    this.http.post("https://fcm.googleapis.com/fcm/send",body, config)
      .subscribe();

  }

}
