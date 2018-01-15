import { CartPage } from './../cart/cart';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { AccountsPage } from '../accounts/accounts';
import { NotificationsPage } from '../notifications/notifications';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  searchRoot = SearchPage;
  notificationRoot = NotificationsPage;
  cartRoot = CartPage;
  accountRoot = AccountsPage;

  constructor() {

  }
}
