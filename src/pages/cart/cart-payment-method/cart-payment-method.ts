import { FormBuilder, Validators } from '@angular/forms';
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
  payment_methodForm: any;
  
  paymentAndShipping: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartsProvider: CartsProvider,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {


      // this.paymentAndShipping = {payment_method: ''};
      this.getPaymentMethods();
      this.info = this.navParams.get('info');

      this.payment_methodForm = this.formBuilder.group({
        comment: ['', Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(7)])],
        payment_method: ['', Validators.compose([Validators.required] )],
      });

  }

  ionViewDidLoad() {
    
  }

  onMethodDone() {

    if(this.payment_methodForm.valid) {
      console.log(this.payment_methodForm);
      console.log(this.info);
      
      this.navCtrl.push(CartPaymentCheckoutPage,{info: this.info, paymentAndShipping: this.payment_methodForm.value});
    }else {
      let errmsg: string;
     

      if(this.payment_methodForm.get('payment_method').hasError('required')){
        errmsg = 'Hình thức thanh toán không được bỏ trống';
      }
      if(this.payment_methodForm.get('comment').hasError('maxlength')){
        errmsg = 'Ghi chú quá dài (giới hạn 100 kí tự)';
      }
      if(this.payment_methodForm.get('comment').hasError('minlength')){
        errmsg = 'Ghi chú quá ngắn (tối thiểu 7 kí tự)';
      }

      alert(errmsg);
    }
  }

  

  paymentMethodChanged() {
    let loading = this.loadingCtrl.create({
      content: 'Đang tải...'
    });

    loading.present();
    this.cartsProvider.savePaymentMethod(this.payment_methodForm.value).subscribe(data => {
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
