import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CartPage } from './../cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartsProvider } from '../../../providers/carts/carts';
import { HttpClient } from '@angular/common/http';

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
  payment_method: string

  shop_ids = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public cartsProvider: CartsProvider, 
    public http: HttpClient, public viewCtrl: ViewController, public cartService: CartsProvider, public loadingCtrl: LoadingController) {
      this.paymentAndShipping = this.navParams.get('paymentAndShipping');
      this.payment_method = (this.paymentAndShipping.payment_method === 'cod') ? 'Thanh toán khi nhận hàng' : 'Thanh toán bằng thẻ';
      this.info = this.navParams.get('info');

      this.cartsProvider.getCartProducts().subscribe(data => {
        this.cartProducts = data['products'];
        console.log('cart '+this.cartProducts);
        this.totals = data['totals'][0]['text'];

        for(let product of data['products']) {
          this.shop_ids.push(product['shop_id']);
        }
      });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * xác nhận => chuyển về trang cart
   */
  confirmOrder() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();


    this.cartsProvider.addOrder(this.paymentAndShipping).subscribe(data =>{
      
      for (let id of this.shop_ids){
        let body = {
          "notification":{
            "title":"Thông báo",
            "body":"Có người đặt sản phẩm chỗ bạn",
            "sound":"default",
            "click_action":"FCM_PLUGIN_ACTIVITY",
            "icon":"icon"
          },
          "data":{
            "type": 'confirm_order',
            "message": this.info['lastname'] + this.info['firstname'] + ' đã đặt mua sản phẩm cửa hàng của bạn'
          },
            "to":"/topics/shop_id_"+ id,
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

      this.cartService.updateCartProductNumber();


      loading.dismiss();
      alert('Tạo đơn hàng thành công');
    }, error => {
      loading.dismiss();
      
      alert('Tạo đơn hàng không thành công');
    });

    this.navCtrl.popAll();

  }
}
