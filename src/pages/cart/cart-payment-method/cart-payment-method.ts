import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPaymentCheckoutPage } from '../cart-payment-checkout/cart-payment-checkout';

/**
 * Generated class for the CartPaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-payment-method',
  templateUrl: 'cart-payment-method.html',
})
export class CartPaymentMethodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onMethodDone() {
    this.navCtrl.push(CartPaymentCheckoutPage);
  }
}
