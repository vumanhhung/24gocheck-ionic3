import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  nationobj;
  nations = [];
  nationarr = [];
  zoneobj;
  zonearr = [];
  errmsg = 'hi';
  registerInfo = '';
  response;


  registerform : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: HttpClient, public viewCtrl : ViewController, public modalCtrl: ModalController) {
    this.getnation().subscribe(data => {
      this.nationobj = data;
      this.nations = this.nationobj.countries;
      for(let i of this.nations) {
        this.nationarr.push(i);
      }
    })
    this.registerform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(7)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(20), Validators.minLength(4) ])],
      repassword: ['', Validators.compose([Validators.required])],
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)] )],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
      address: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(3)])],
      city: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(128), Validators.minLength(2)])],
      zipcode: ['', Validators.compose([Validators.required])],
      nation: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dangky(){
    if(this.registerform.get('city').hasError('pattern')){
      this.errmsg = 'Please enter valid city';
    }
    if(this.registerform.get('city').hasError('minlength')){
      this.errmsg = 'Too short city name, at least 2 character';
    }
    if(this.registerform.get('city').hasError('maxlength')){
      this.errmsg = 'Too long city name';
    }
    if(this.registerform.get('address').hasError('pattern')){
      this.errmsg = 'Please enter valid address';
    }
    if(this.registerform.get('address').hasError('minlength')){
      this.errmsg = 'Too short address, at least 3 character';
    }
    if(this.registerform.get('address').hasError('maxlength')){
      this.errmsg = 'Too long address';
    }
    if(this.registerform.get('phone').hasError('maxlength')){
      this.errmsg = 'Too long phone';
    }
    if(this.registerform.get('phone').hasError('minlength')){
      this.errmsg = 'Too short phone';
    }
    if(this.registerform.get('lastname').hasError('pattern')){
      this.errmsg = 'Please enter valid lastname';
    }
    if(this.registerform.get('lastname').hasError('maxlength')){
      this.errmsg = 'Too long last name';
    }
    if(this.registerform.get('firstname').hasError('pattern')){
      this.errmsg = 'Please enter valid firstname';
    }
    if(this.registerform.get('firstname').hasError('maxlength')){
      this.errmsg = 'Too long first name';
    }
    if(this.registerform.value.password != this.registerform.value.repassword){
      this.errmsg = 'Password doesnt match' ;
    }
    if(this.registerform.get('password').hasError('pattern')){
      this.errmsg = 'Please enter valid password';
    }
    if(this.registerform.get('password').hasError('minlength')){
      this.errmsg = 'Password too weak';
    }
    if(this.registerform.get('password').hasError('maxlength')){
      this.errmsg = 'Password too long';
    }
    if(this.registerform.get('email').hasError('email')){
      this.errmsg = 'Please enter valid email';
    }
    if(this.registerform.get('email').hasError('minlength')){
      this.errmsg = 'email too short';
    }
    if(this.registerform.get('email').hasError('maxlength')){
      this.errmsg = 'email too long';
    }

    if(this.registerform.valid && this.registerform.value.password == this.registerform.value.repassword){
      this.registerInfo = 'firstname=' + this.registerform.value.firstname + '&lastname=' + this.registerform.value.lastname + '&email='
      +  this.registerform.value.email + '&password=' + this.registerform.value.password + '&confirm=' + this.registerform.value.password
      + '&telephone=' +  this.registerform.value.phone + '&address_1=' + this.registerform.value.address + '&address_2=' + ' '
      + '&city=' + this.registerform.value.city + '&postcode=' + this.registerform.value.zipcode + '&country_id='
      + this.registerform.value.nation + '&zone_id=' + this.registerform.value.area + '&customer_group_id=' + '1';

      this.registerRequest(this.registerInfo).subscribe(data => {
        this.response = data;
        if(this.response.customer_info != null){
          alert('Successfully register');
          localStorage.setItem('user',this.response.customer_info);
          localStorage.setItem('user_id',this.response.customer_info.user_id);
          localStorage.setItem('user_email',this.response.customer_info.email);
          localStorage.setItem('user_firstname',this.response.customer_info.firstname);
          localStorage.setItem('user_lastname',this.response.customer_info.lastname);
          localStorage.setItem('phone',this.response.customer_info.telephone);
          localStorage.setItem('address_1',this.response.address_1);
          localStorage.setItem('address_2',this.response.address_2);
          localStorage.setItem('customer_id',this.response.customer_info.customer_id);
          this.navCtrl.popAll();
        }
        else{
          alert('Email has already taken!');
        }
        // console.log(data);

      }, err => {
        this.response = err;
        console.log(err);
      })
      // console.log('fine');

    }
    else {
      alert(this.errmsg);
    }
  }



  fullfill(){
    if(this.registerform.get('email').hasError('required')||
       this.registerform.get('password').hasError('required')||
       this.registerform.get('firstname').hasError('required')||
       this.registerform.get('lastname').hasError('required')||
       this.registerform.get('phone').hasError('required')||
       this.registerform.get('address').hasError('required')||
       this.registerform.get('city').hasError('required')||
       this.registerform.get('zipcode').hasError('required')){
      return false;
    }
    else {
      return true;
    }
  }

  getnation(){
    return this.http.get('http://24gocheck.com/index.php?route=api2/address');
  }

  getarea(areaid){
    var data1 = 'country_id=' + areaid;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/address/getZones', data1, config);
  }

  getallzone(){
    this.zonearr = null;
    this.getarea(this.registerform.value.nation).subscribe(data => {
      this.zoneobj = data;
      this.zonearr = this.zoneobj.zones;
      return this.zonearr;
    })
  }

  registerRequest(information){
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_register', information, config)
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
