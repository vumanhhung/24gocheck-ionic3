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

      //hiển thị danh sách gian hàng(aka user aka chủ gian hàng)
      shopService.getShopList(this.currentPage)
        .subscribe(data => {
          this.shopList = data['shops'];
        });

      //hiển thị danh sách danh mục (aka category)
      this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
        });
  }

  ionViewDidLoad() {
  }

  /**
   * khi người dùng kéo xuống đáy app
   * load thêm 10 gian hàng (aka user) nữa
   */
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.currentPage +=10;
      this.shopService.getShopList(this.currentPage)
        .subscribe(data => {
          this.shopList = this.shopList.concat(data['shops']) ;
        })
      infiniteScroll.complete();
    }, 300);
  }

}
