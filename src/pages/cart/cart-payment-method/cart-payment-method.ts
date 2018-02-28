import { LoadingController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartsProvider: CartsProvider,
    public loadingCtrl: LoadingController) {
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
    let loading = this.loadingCtrl.create({
      content: 'Đang tải...'
    });

    loading.present();
    this.cartsProvider.savePaymentMethod(this.paymentAndShipping).subscribe(data => {
      // alert(JSON.stringify(data, undefined, 2));
      loading.dismiss();
    }, e => {
      loading.dismiss();
    });

    // alert('Changed');
  }

  getPaymentMethods() {
    this.cartsProvider.getPaymentMethods().subscribe(data => {

    });
  }
}
