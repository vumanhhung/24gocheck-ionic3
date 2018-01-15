import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilesPage } from './profiles/profiles';
import { ProductManagementPage } from './product-management/product-management';
import { FeedbackPage } from './feedback/feedback';
import { FavoritesPage } from './favorites/favorites';

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

  profilePage = ProfilesPage;
  productManagementPage = ProductManagementPage;
  feedbackPage = FeedbackPage;
  favoritesPage = FavoritesPage;
  



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

}
