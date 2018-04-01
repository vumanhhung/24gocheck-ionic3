import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartsProvider {

  constructor(private storage: Storage, public http: HttpClient) {
    console.log('Hello CartsProvider Provider');
  }

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
    }
  }


  updateCartProductNumber() {
    this.getCartProducts().subscribe(data => {
      // alert('Products cart number ' + data['products'].length);
      localStorage.setItem('cart_count', data['products'].length);
    });
  }

  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param product_id (Number) id của sản phẩm
   * @param quantity (Number) số lượng sản phẩm
   */
  addToCart(product_id, quantity) {
    let option = {};
    let requestBody = 'product_id='+ product_id +'&quantity='+ quantity +'&option='+ option;

    return this.http.post('http://24gocheck.com/index.php?route=api2/cart/add', requestBody, this.config);
  }


  /**
   * Hiển thị sản phẩm trong giỏ hàng
   */
  getCartProducts() {
    let requestBody = '';

    return this.http.post('http://24gocheck.com/index.php?route=api2/cart/products', requestBody, this.config);
  }

  /**
   * xóa sản phẩm trong giỏ hàng
   * @param cart_id (Number) id của giỏ hàng
   */
  removeCartItem(cart_id) {
    let requestBody = 'key='+cart_id;

    return this.http.post('http://24gocheck.com/index.php?route=api2/cart/remove', requestBody, this.config);
  }


  /**
   * lưu thông tin khách hàng
   * @param personal_info (Object)
   * personal_info properties:
   *  customer_id (number) id của tài khoản người dùng
   *  firstname (string) tên khách hàng
   *  lastname (string) họ khách hàng
   *  email (string) email khách hàng
   *  telephone (number) số điện thoại
   *  customer_group_id (number) nhóm khách hàng
   */
  setPersonalInfo(personal_info) {
    let requestBody = 'customer_id='+ personal_info.customer_id +
      '&firstname='+ personal_info.firstname +
      '&lastname=' + personal_info.lastname + 
      '&email=' + personal_info.email + 
      '&telephone=' + personal_info.telephone +
      '&customer_group_id=' + personal_info.customer_group_id;
    // alert('request body in set personal '+ requestBody);
    return this.http.post('http://24gocheck.com/index.php?route=api2/customer', requestBody, this.config);
  }


  /**
   * lưu địa chỉ khách hàng
   */
  setAddress(info) {
    let requestBody = 'customer_id='+ info.customer_id +
    '&firstname='+ info.firstname +
    '&lastname=' + info.lastname + 
    '&company=' + info.company + 
    '&address_1=' + info.address_1 +
    '&address_2=' + info.address_2 +
    '&city=' + info.city +
    '&address_id=' + info.address_id +
    '&postcode=' + info.postcode +
    '&country_id=' + info.country_id +
    '&zone_id=' + info.zone_id +
    '&customer_group_id= 1'

    return this.http.post('http://24gocheck.com/index.php?route=api2/address/save', requestBody, this.config);
  }


  /**
   * lưu shipping address
   */
  SetShippingAddress(info) {
    let requestBody =
      'firstname='+ info.firstname +
      '&lastname=' + info.lastname + 
      '&company=' + info.company + 
      '&address_1=' + info.address_1 +
      '&address_2=' + info.address_2 +
      '&city=' + info.city +
      '&country_id=' + info.country_id +
      '&zone_id=' + info.zone_id;

    return this.http.post('http://24gocheck.com/index.php?route=api2/shipping/address', requestBody, this.config);
  }


  /**
   * lưu payment address
   */
  setPaymentAddress(info) {
    let requestBody =
      'firstname='+ info.firstname +
      '&lastname=' + info.lastname + 
      '&company=' + info.company + 
      '&address_1=' + info.address_1 +
      '&address_2=' + info.address_2 +
      '&city=' + info.city +
      '&country_id=' + info.country_id +
      '&zone_id=' + info.zone_id;

    return this.http.post('http://24gocheck.com/index.php?route=api2/payment/address', requestBody, this.config);
  }


  /**
   * lưu shipping method
   */
  saveShippingMethod() {
    let requestBody = '';

    return this.http.post('http://24gocheck.com/index.php?route=api2/shipping/method', requestBody, this.config);
  }


  /**
   * lưu payment method
   */
  savePaymentMethod(payments) {
    let requestBody = 'payment_method='+payments.payment_method;

    return this.http.post('http://24gocheck.com/index.php?route=api2/payment/method', requestBody, this.config);
  }


  /**
   * update số lượng sản phẩm trong giỏ hàng
   */
  updateCartItemQuantity(id, quantity) {
    let requestBody = 'key='+id+'&quantity='+quantity;

    return this.http.post('http://24gocheck.com/index.php?route=api2/cart/edit', requestBody, this.config);
  }


  /**
   * lấy ra tất cả Payment method
   */
  getPaymentMethods() {
    let requestBody = '';

    return this.http.post('http://24gocheck.com/index.php?route=api2/payment/methods', requestBody, this.config);
  }


  /**
   * lấy ra tất cả shipping method
   */
  getShippingMethods() {
    let requestBody = '';

    return this.http.post('http://24gocheck.com/index.php?route=api2/shipping/methods', requestBody, this.config);
  }


  /**
   * lưu order vào database
   */
  addOrder(paymentAndShipping) {
    let requestBody = 'payment_method='+paymentAndShipping.payment_method +'&comment=123';

    return this.http.post('http://24gocheck.com/index.php?route=api2/order/add', requestBody, this.config);
  }

}
