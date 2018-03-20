import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../../providers/products/products';
import { AccountsProvider } from '../../../../providers/accounts/accounts';
/**
 * Generated class for the UserProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product-list',
  templateUrl: 'user-product-list.html',
})
export class UserProductListPage {

  shopProducts = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private accountService: AccountsProvider,
    private productService: ProductsProvider,) {
    
      let user_id = this.accountService.getUserInfo()['user_id'];
    // hiển thị thông tin gian hàng
    productService.getProductListByShopId(user_id, 1)
      .subscribe(data => {
        this.shopProducts = data['products'];
        console.log("product" + JSON.stringify(data));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProductListPage');
  }

}
