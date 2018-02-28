import { CartPage } from './../cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartsProvider } from '../../../providers/carts/carts';

/**
 * Generated class for the CartPaymentCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-payment-checkout',
  templateUrl: 'cart-payment-checkout.html',
})
export class CartPaymentCheckoutPage {

  info: any;
  paymentAndShipping: any;
  cartProducts: any;
  totals: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartsProvider: CartsProvider) {
    this.paymentAndShipping = this.navParams.get('paymentAndShipping');

    this.info = this.navParams.get('info');

    this.cartsProvider.getCartProducts().subscribe(data => {
      this.cartProducts = data['products'];
      console.log('cart '+this.cartProducts);
      this.totals = data['totals'][0]['text'];
    });
  }

  confirmOrder() {
    // alert(this.paymentAndShipping.payment_method);
    this.cartsProvider.addOrder(this.paymentAndShipping).subscribe(data =>{
      // alert(JSON.stringify(data, undefined, 2));

      this.navCtrl.push(CartPage);
    });
  }
}
