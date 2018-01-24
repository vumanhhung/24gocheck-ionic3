// import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { AccountsPage } from '../accounts/accounts';
import { NotificationsPage } from '../notifications/notifications';
import {MapPage} from "../map/map";
import { CartPage } from '../cart/cart';
import {LoginPage} from "../accounts/login/login";

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
  constructor() {

  }


}
