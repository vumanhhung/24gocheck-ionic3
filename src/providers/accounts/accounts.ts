import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountsProvider {

  private user_info = {};
  userLoggedIn: boolean;

  constructor(private storage: Storage) {
    console.log('Hello AccountsProvider Provider');
    this.getUserInfo();
    this.initializeUserLoggedIn();
  }

  setUserInfo(user_info) {
    this.storage.set('user_info', user_info);
    this.user_info = user_info;
  }

  getUserInfo() {
      this.storage.get('user_info').then((data) => {
          this.user_info = data;
      })
      console.log('user information is: '+ JSON.stringify(this.user_info));
      return this.user_info;
  }

  isUserLoggedIn() {
    // console.log('Is user logged in');
    return this.userLoggedIn;
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn = userLoggedIn;
  }

  initializeUserLoggedIn() {
    console.log('Init user login');
    this.storage.get('user_info').then((data) => {
      this.user_info = data;

      if(this.user_info === null) {
        this.userLoggedIn = false;
      } else {
        this.userLoggedIn = !(Object.keys(this.user_info).length === 0);
      }
    })
  }

  isStallholder() {
    let arr = [11, 18];
    if (this.user_info['role'] == 11 || this.user_info['role'] == 18 ) {
      // console.log('Chu gian hang');
      return true;
    } else {
      // console.log('Khach');
      return false;
    }
    
  }

  userLogout() {
    console.log('Logout');
    this.userLoggedIn = false;
    this.storage.clear();
  }

  myTest() {
    console.log('Testing');
  }
}
