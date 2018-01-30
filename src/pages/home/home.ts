import { ShopPage } from './../shops/shop/shop';
import { ShopsProvider } from './../../providers/shops/shops';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoriesProvider } from '../../providers/categories/categories';
import {CategoryPage} from "../categories/category/category";
import { AccountsProvider } from '../../providers/accounts/accounts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shopList = [];
  currentPage = 0;
  categoryList = [];
  shopDetailsPage = ShopPage;
  categoryPage = CategoryPage;

  constructor(
              public navCtrl: NavController,
              private shopService: ShopsProvider,
              private categoryService: CategoriesProvider,
            public accountsService: AccountsProvider) {
    shopService.getShopList(this.currentPage)
      .subscribe(data => {
        this.shopList = data['shops'];
      });

      this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
        });



  }

  ionViewDidLoad() {
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.items.push( this.items.length );
      // }

      this.currentPage +=10;
      this.shopService.getShopList(this.currentPage)
        .subscribe(data => {
          this.shopList = this.shopList.concat(data['shops']) ;
        })
      infiniteScroll.complete();
    }, 500);
  }

}
