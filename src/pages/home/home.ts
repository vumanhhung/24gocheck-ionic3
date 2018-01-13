import { ShopPage } from './../shops/shop/shop';
import { ShopsProvider } from './../../providers/shops/shops';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shopList = [];
  currentPage = 0;

  shika = SearchPage;
  shopDetailsPage = ShopPage;

  constructor(public navCtrl: NavController, private shopService: ShopsProvider) {
    shopService.getShopList(this.currentPage)
      .subscribe(data => {
        console.log('my data: ', data);
        this.shopList = data['shops'];
      })
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
