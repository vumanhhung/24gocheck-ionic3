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

  constructor(public modalCtrl: ModalController, public accountsService: AccountsProvider) {

  }

  loginModal() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }

}
