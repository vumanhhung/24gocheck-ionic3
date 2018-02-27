import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPaymentCheckoutPage } from '../cart-payment-checkout/cart-payment-checkout';
import { CartsProvider } from '../../../providers/carts/carts';

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

  info: any;
  
  paymentAndShipping: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartsProvider: CartsProvider) {
    this.paymentAndShipping = {payment_method: ''};
    this.getPaymentMethods();
    this.info = this.navParams.get('info');
  }

  ionViewDidLoad() {
    
  }

  onMethodDone() {
    this.navCtrl.push(CartPaymentCheckoutPage,{info: this.info, paymentAndShipping: this.paymentAndShipping});
  }

  

  paymentMethodChanged() {

    this.cartsProvider.savePaymentMethod(this.paymentAndShipping).subscribe(data => {
      // alert(JSON.stringify(data, undefined, 2));
    });

    // alert('Changed');
  }

  getPaymentMethods() {
    this.cartsProvider.getPaymentMethods().subscribe(data => {

    });
  }
}
