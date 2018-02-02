import { TranslateService } from '@ngx-translate/core';
import { TestPage } from './../test/test';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilesPage } from './profiles/profiles';
import { ProductManagementPage } from './product-management/product-management';
import { FeedbackPage } from './feedback/feedback';
import { FavoritesPage } from './favorites/favorites';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { HomePage } from '../home/home';

/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  profilePage: any;
  productManagementPage: any;
  feedbackPage: any;
  favoritesPage: any;
  lang: string = "vi";
  testPage: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public accountsService: AccountsProvider,public translate : TranslateService) {
    this.profilePage = ProfilesPage;
    this.productManagementPage = ProductManagementPage;
    this.feedbackPage = FeedbackPage;
    this.favoritesPage = FavoritesPage;
    this.lang = translate.currentLang;
    this.testPage = TestPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  onUserLogout() {
    this.accountsService.userLogout();
    this.navCtrl.parent.select(0);
  }

  onChange(e){
    this.translate.use(e);
  }
}
