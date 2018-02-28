import { Observable } from 'rxjs/Observable';
import { ZonesProvider } from './../../../providers/zones/zones';
import { LoadingController } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartPaymentMethodPage } from '../cart-payment-method/cart-payment-method';
import { CartsProvider } from '../../../providers/carts/carts';
import { AccountsProvider } from '../../../providers/accounts/accounts';
import 'rxjs/add/observable/forkJoin'
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the CartPaymentInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-payment-info',
  templateUrl: 'cart-payment-info.html',
})
export class CartPaymentInfoPage {

  payment_infoForm: FormGroup;
  info = {
    
  };

  zones = [];

  personalInfo = 3;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public cartsService: CartsProvider, 
    public accountsProvider: AccountsProvider, 
    public zonesProvider: ZonesProvider,
    public formBuilder: FormBuilder) {

      this.payment_infoForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(7)])],
        password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(20), Validators.minLength(4) ])],
        firstname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)] )],
        lastname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)])],
        phone: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
        address: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(3)])],
        city: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(2)])],
        area: ['', Validators.compose([Validators.required])]
      });

      this.zonesProvider.getZones().subscribe((data) => {
        this.zones = data['zones'];
      }, (e) => {

      });
      this.info = accountsProvider.getUserInfo() || {lastname: '', firstname: '', email: '', telephone: '', user_address: {address_1: '', city: '' }};
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad payment info');
  }

  onPaymentMethod() {
    let loading = this.loadingCtrl.create({
      content: 'Đang tải...'
    });

    loading.present();

    Observable.forkJoin([
      this.cartsService.setPersonalInfo(this.info),
      this.cartsService.setAddress(this.info),
      this.cartsService.setPaymentAddress(this.info),
      this.cartsService.SetShippingAddress(this.info)
    ]).subscribe((response) => {
      loading.dismiss();
      // alert('Success :)) '+ JSON.stringify(response));
      this.navCtrl.push(CartPaymentMethodPage, {info: this.info});
    });
  
    loading.dismiss();
    // this.navCtrl.push(CartPaymentMethodPage);
  }

}
