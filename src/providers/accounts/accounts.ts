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

  constructor(private storage: Storage, public http: HttpClient) {
    console.log('Hello AccountsProvider Provider');
    this.getUserInfo();
    this.initializeUserLoggedIn();
  }

  /**
   * lưu thông tin tài khoản
   */
  setUserInfo(user_info) {
    this.storage.set('user_info', user_info);
    this.user_info = user_info;
  }

  /**
   * lấy và trả về thông tin tài khoản
   */
  getUserInfo() {
    this.storage.get('user_info').then((data) => {
        this.user_info = data;
    })
    console.log('user information is: '+ JSON.stringify(this.user_info));
    return this.user_info;
  }

  /**
   * kiểm tra người dùng đăng nhập chưa
   */
  isUserLoggedIn() {
    return this.userLoggedIn;
  }

  /**
   * thay đổi trang thái đăng nhập của người dùng
   */
  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn = userLoggedIn;
  }

  /**
   * thiết lập thông tin người dùng
   */
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

  /**
   * kiểm tra người dùng có phải là chủ gian hàng(id là 11 hoặc 18) ko
   */
  isStallholder() {
    if (this.user_info['role'] == 11 || this.user_info['role'] == 18 ) {
      // console.log('Chu gian hang');
      return true;
    } else {
      // console.log('Khach');
      return false;
    }
    
  }

  /**
   * đăng xuất
   */
  userLogout() {
    this.userLoggedIn = false;
    this.storage.clear();
    this.logoutAPI().subscribe(data => {
      console.log('Loggedout');
    });
  }

  /**
   * đăng xuất api
   */
  logoutAPI() {
    var requestBody = '';
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_logout', requestBody, config);
  }

  getReceiverInfo(email) {
    var requestBody = `email=${email}`;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    return this.http.post('http://24gocheck.com/index.php?route=api2/account_exist', requestBody, config);
  }


  getPointTransactionHistory(account_id) {
    var requestBody = `account_id=${account_id}`;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    return this.http.post('http://24gocheck.com/index.php?route=api2/point_transaction', requestBody, config);
  }


  createTransaction(data) {
    var requestBody = `trader_id=${data['trader_id']}&receiver_id=${data['receiver_id']}&point=${data['point']}&comment=${data['comment']}&status=${data['status']}`;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    return this.http.post('http://24gocheck.com/index.php?route=api2/point_transaction/add', requestBody, config);
  }

  getPointTransactionDetail(transaction_id) {
    var requestBody = `transaction_id=${transaction_id}`;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    return this.http.post('http://24gocheck.com/index.php?route=api2/point_transaction/detail', requestBody, config);
  }



  getAccountPoint() {
    var requestBody = `customer_id=${this.user_info['customer_id']}`;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }

    return this.http.post('http://24gocheck.com/index.php?route=api2/customer/point', requestBody, config);
  }
}
