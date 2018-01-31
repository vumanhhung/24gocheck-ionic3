import { HomePage } from './../../home/home';
import { HttpClient } from '@angular/common/http/';
// import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage';
import { AccountsPage } from '../accounts';
import { AccountsProvider } from '../../../providers/accounts/accounts';
import { RegisterPage } from '../register/register';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginform: FormGroup;
  myprofile;

  userinfo = localStorage.getItem('user_firstname');


  constructor(public navCtrl: NavController, 
      private http: HttpClient, 
      public formBuilder: FormBuilder, 
      public navParams: NavParams, 
      public modal:ModalController, 
      public viewCtrl: ViewController, 
      public modalCtrl : ModalController,
      public storage: Storage,
    public accountsService: AccountsProvider ) {

    this.loginform = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50), Validators.minLength(7)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9]*')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if(this.loginform.get('username').hasError('email')){
      alert('Please enter valid email');
    } else {
      

      this.getUsers(this.loginform.value.username, this.loginform.value.password).subscribe(data => {
        // console.log(data);
        // alert(JSON.stringify(data));
        // this.storage.set('user_info', data['customer_info']);
        this.accountsService.setUserInfo(data['customer_info']);
        this.accountsService.setUserLoggedIn(true);
        this.closeModal();
      }, error => {
        alert("invalid username or password")
      }, () => {console.log('aa')
      })
      // this.navCtrl.parent.select(4);

      


    }
  }

  //check empty object
  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }


  logged(){
    if(this.isEmpty(localStorage.getItem('user'))){
      return false;
    }
    else {
      return true;
    }
  }

  getUsers(username, password) {
    var data1 = 'email=' + username + '&password=' + password;
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/user_login', data1, config);
  }


  closeModal() {
    this.viewCtrl.dismiss();
  }

  

  logout(){
    localStorage.clear();
  }

  filled(){
    if(this.loginform.get('username').hasError('required') || this.loginform.get('password').hasError('required')){
      return false;
    }
    else {
      return true;
    }
  }

  registerModal() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }
}
