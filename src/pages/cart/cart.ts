import { Component } from '@angular/core';
import { CartPaymentInfoPage } from './cart-payment-info/cart-payment-info';
import { NavController } from 'ionic-angular/navigation/nav-controller';
// import { NgModule } from '@angular/core';
// import { IonicPageModule } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage {
  private currentNumber = 1;
  constructor(public navCtrl: NavController){

  }

  onPaymentInfo() {
    this.navCtrl.push(CartPaymentInfoPage);
  }

  private increment(){
    this.currentNumber ++;
  }

  private decrement(){
    this.currentNumber --;
    if(this.currentNumber <= 0){
      this.currentNumber = 0;
    }
  }
}
