import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { AccountsPage } from '../accounts/accounts';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  searchRoot = SearchPage;
  // notificationRoot = NotiPage;
  // cartRoot = CartPage;
  accountRoot = AccountsPage;

  constructor() {

  }
}
