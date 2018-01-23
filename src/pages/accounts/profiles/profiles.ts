import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsProvider } from '../../../providers/accounts/accounts';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {
  editform : FormGroup;
  user_info: any;
  editInfo='';
  errmsg='';
  response;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: HttpClient, public accountsService: AccountsProvider) {
    this.user_info = accountsService.getUserInfo();


    this.editform = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)] )],
      lastname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(32)])],
      phone: ['', Validators.compose([Validators.required, Validators.maxLength(32), Validators.minLength(2)])],
      address_1: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(3)])],
      address_2: ['', Validators.compose([Validators.required, Validators.maxLength(128), Validators.minLength(3)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesPage');
  }


  fullfill() {
    if(this.editform.get('firstname').hasError('required')||
      this.editform.get('lastname').hasError('required')||
      this.editform.get('phone').hasError('required')||
      this.editform.get('address_1').hasError('required')||
      this.editform.get('address_2').hasError('required')){
      return false;
    }
    else {
      return true;
    }
  }

  editUser() {
    if(this.editform.get('address_1').hasError('pattern')){
      this.errmsg = 'Please enter valid address';
    }
    if(this.editform.get('address_1').hasError('minlength')){
      this.errmsg = 'Too short address, at least 3 character';
    }
    if(this.editform.get('address_1').hasError('maxlength')){
      this.errmsg = 'Too long address';
    }
    if(this.editform.get('address_2').hasError('pattern')){
      this.errmsg = 'Please enter valid address';
    }
    if(this.editform.get('address_2').hasError('minlength')){
      this.errmsg = 'Too short address, at least 3 character';
    }
    if(this.editform.get('address_2').hasError('maxlength')){
      this.errmsg = 'Too long address';
    }
    if(this.editform.get('phone').hasError('maxlength')){
      this.errmsg = 'Too long phone';
    }
    if(this.editform.get('phone').hasError('minlength')){
      this.errmsg = 'Too short phone';
    }
    if(this.editform.get('lastname').hasError('pattern')){
      this.errmsg = 'Please enter valid lastname';
    }
    if(this.editform.get('lastname').hasError('maxlength')){
      this.errmsg = 'Too long last name';
    }
    if(this.editform.get('firstname').hasError('pattern')){
      this.errmsg = 'Please enter valid firstname';
    }
    if(this.editform.get('firstname').hasError('maxlength')){
      this.errmsg = 'Too long first name';
    }

    if(this.editform.valid){
      this.editInfo = 'firstname=' + this.editform.value.firstname + '&lastname=' + this.editform.value.lastname
        + '&telephone=' +  this.editform.value.phone + '&address_1=' + this.editform.value.address_1
        + '&address_2=' + this.editform.value.address_2 + '&role=' + localStorage.getItem('role')
        + '&customer_id=' + localStorage.getItem('customer_id');

      this.registerRequest(this.editInfo).subscribe(data => {
        this.response = data;
        alert('Successfully edited');
      }, err => {
        this.response = err;
        console.log(err);
      })
      console.log('fine');
    }
    else {
      alert(this.errmsg);
    }
  }

  registerRequest(information){
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_edit', information, config)
  }



}
