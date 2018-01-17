import { ProductPage } from './../../products/product/product';
import { ProductsProvider } from './../../../providers/products/products';
import { ShopsProvider } from './../../../providers/shops/shops';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shopDetails = {};
  shopProducts = [];
  productDetailsPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shopService: ShopsProvider,
    private productService: ProductsProvider) {

      this.productDetailsPage = ProductPage;

      this.shopDetails = this.navParams.data;

      productService.getProductListByShopId(this.shopDetails['user_id'], 1)
        .subscribe(data => {
          this.shopProducts = data['products'];
        })


    console.log('THe id is '+ JSON.stringify(this.shopDetails));
  }

  ionViewDidLoad() {
  }


}
