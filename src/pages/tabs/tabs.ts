import { NotificationsProvider } from './../../providers/notifications/notifications';
import { CartsProvider } from './../../providers/carts/carts';
import { NavController } from 'ionic-angular/navigation/nav-controller';
// import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { AccountsPage } from '../accounts/accounts';
import { NotificationsPage } from '../notifications/notifications';
import {MapPage} from "../map/map";
import { CartPage } from '../cart/cart';
import {LoginPage} from "../accounts/login/login";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AccountsProvider } from '../../providers/accounts/accounts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  searchRoot = SearchPage;
  notificationRoot = NotificationsPage;
  cartRoot = CartPage;
  // mapRoot = MapPage;
  accountRoot = AccountsPage;
  loginPage = LoginPage;

  constructor(public modalCtrl: ModalController, public accountsService: AccountsProvider, public navCtrl: NavController, public cart: CartsProvider, public notification: NotificationsProvider) {

  }

  loginModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

  goToCart() {
    console.log('Yeah clicked');
    let modal = this.modalCtrl.create(this.cartRoot);
    modal.present();
  }

  goToSearch() {
    let modal = this.modalCtrl.create(this.searchRoot);
    modal.present();
  }

  productCount() {
    let count = 0;
    // this.cart.getCartProducts().subscribe((data) => {
    //   if(data['products']) {
    //     count = data['products'].length();
    //   }
    // });
    return localStorage.getItem('cart_count');

    // return count;
  }

  notificationCount() {
    return this.notification.getNotificationCount();
  }

  goToNotification() {
    let modal = this.modalCtrl.create(this.notificationRoot);
    modal.present();
  }
}
