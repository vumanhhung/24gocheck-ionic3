import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component } from '@angular/core';
import { CartPaymentInfoPage } from './cart-payment-info/cart-payment-info';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CartsProvider } from '../../providers/carts/carts';
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
  // private currentNumber = 1;

  cartProducts = [];

  totals: number;
  private product_total: any;

  constructor(public navCtrl: NavController, public cartsProvider: CartsProvider, private viewCtrl: ViewController){
    
  }

  ionViewDidLoad() {
    this.viewCtrl.showBackButton(false);
    this.cartsProvider.getCartProducts().subscribe(data => {
      this.cartProducts = data['products'];
      console.log('cart '+this.cartProducts);
      this.totals = data['totals'][0]['text'];
    });
  }

  onPaymentInfo() {
    // if(this.cartProducts.length > 0 ){
    //   this.navCtrl.push(CartPaymentInfoPage);
    // } else {
    //   console.log('Cant');
    // }

    this.navCtrl.push(CartPaymentInfoPage);
  }

  private increment(cart_id, quantity){

    let currentNumber = parseInt(quantity) + 1;

    this.cartsProvider.updateCartItemQuantity(cart_id, currentNumber).subscribe((data) => {
      
    }, (e) => {

    });

    this.cartsProvider.getCartProducts().subscribe(data => {
      this.cartProducts = data['products'];
      console.log('cart '+this.cartProducts);
      this.totals = data['totals'][0]['text'];
    });
  }

  private decrement(cart_id, quantity){
    let currentNumber = parseInt(quantity) - 1;
    if(currentNumber < 1){
      this.cartsProvider.removeCartItem(cart_id).subscribe(data => {
        
      });
    }
    this.cartsProvider.updateCartItemQuantity(cart_id, currentNumber).subscribe((data) => {
      
    }, (e) => {

    });

    this.cartsProvider.getCartProducts().subscribe(data => {
      this.cartProducts = data['products'];
      console.log('cart '+this.cartProducts);
      this.totals = data['totals'][0]['text'];
    });

  }

  
}
