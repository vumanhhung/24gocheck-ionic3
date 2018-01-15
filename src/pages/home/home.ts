import { ShopPage } from './../shops/shop/shop';
import { ShopsProvider } from './../../providers/shops/shops';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CategoriesProvider } from '../../providers/categories/categories';
import {CategoryPage} from "../categories/category/category";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shopList = [];
  currentPage = 0;
  categoryList = [];
  shika = SearchPage;
  shopDetailsPage = ShopPage;
  categoryPage = CategoryPage;

  constructor(public navCtrl: NavController, private shopService: ShopsProvider, private categoryService: CategoriesProvider) {
    shopService.getShopList(this.currentPage)
      .subscribe(data => {
        console.log('my data: ', data);
        this.shopList = data['shops'];
      });

      this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
          console.log('Cate list is ', this.categoryList);
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.items.push( this.items.length );
      // }

      this.currentPage +=10;
      this.shopService.getShopList(this.currentPage)
        .subscribe(data => {
          console.log('my data: ', data);
          this.shopList = this.shopList.concat(data['shops']) ;
        })

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }




}
