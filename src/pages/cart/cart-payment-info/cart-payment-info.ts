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
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public cartsService: CartsProvider, 
    public accountsProvider: AccountsProvider, 
    public zonesProvider: ZonesProvider,
    public formBuilder: FormBuilder) {

      this.info = accountsProvider.getUserInfo() || {lastname: '', firstname: '', email: '', telephone: '', user_address: {address_1: '', address_2: '', city: '', zone_id: 3776}};

      //Validate các trường trong form
      this.payment_infoForm = this.formBuilder.group({
        email: [this.info['email'], Validators.compose([Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(7)])],
        firstname: [this.info['firstname'], Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)] )],
        lastname: [this.info['lastname'], Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)])],
        telephone: [this.info['telephone'], Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
        address_1: [this.info['user_address']['address_1'], Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(3)])],
        address_2: [this.info['user_address']['address_2'], Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(3)])],
        city: [this.info['user_address']['city'], Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(2)])],
        zone_id: [this.info['user_address']['zone_id'], Validators.compose([Validators.required])],
        customer_id: [this.info['customer_id']],
        company: [this.info['user_address']['company']],
        postcode: [this.info['user_address']['postcode']],
        country_id: [this.info['user_address']['country_id']],
        customer_group_id: [this.info['customer_group_id']],
      });

      this.zonesProvider.getZones().subscribe((data) => {
        this.zones = data['zones'];
      }, (e) => {

      });
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad payment info');
  }

  /**
   * kiểm tra xem form "payment_infoForm" có hợp lệ không
   * ko hợp lệ => báo lỗi
   * hợp lệ => chuyển sang trang CartPaymentMethod (hình thức thanh toán)
   */
  onPaymentMethod() {
    if(this.payment_infoForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Đang tải...'
      });
  
      loading.present();
  
      Observable.forkJoin([
        this.cartsService.setPersonalInfo(this.payment_infoForm.value),
        this.cartsService.setAddress(this.payment_infoForm.value),
        this.cartsService.setPaymentAddress(this.payment_infoForm.value),
        this.cartsService.SetShippingAddress(this.payment_infoForm.value)
      ]).subscribe((response) => {
        loading.dismiss();
        this.navCtrl.push(CartPaymentMethodPage, {info: this.payment_infoForm.value});
      });
    
      loading.dismiss();
    } else {
      let arr = [];
      let errmsg: string;
      arr[0] = {key: 'email', value: 'Email'};
      arr[1] = {key: 'firstname', value: 'Tên'};
      arr[2] = {key: 'lastname', value: 'Họ'};
      arr[3] = {key: 'telephone', value: 'Số điện thoại'};
      arr[4] = {key: 'address_1', value: 'Địa chỉ'};
      arr[5] = {key: 'city', value: 'Thành phố'};
      arr[6] = {key: 'zone_id', value: 'Khu vực'};

      for(let i = arr.length -1; i > 0; i--) {
        if(this.payment_infoForm.get(arr[i].key).hasError('pattern')){
          errmsg = arr[i].value + ' không hợp lệ';
        }
        if(this.payment_infoForm.get(arr[i].key).hasError('required')){
          errmsg = arr[i].value + ' không được để trống';
        }
        if(this.payment_infoForm.get(arr[i].key).hasError('maxlength')){
          errmsg = arr[i].value + ' quá dài';
        }
        if(this.payment_infoForm.get(arr[i].key).hasError('minlength')){
          errmsg = arr[i].value + ' quá ngắn';
        }
      }

      alert(errmsg);
    }
    
  }

}
