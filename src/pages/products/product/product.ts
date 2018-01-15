import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  productDetails = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductsProvider) {
    
    productService.getProductById(navParams.get('product_id'))
      .subscribe(data => {
        console.log('product data: ', data);
        this.productDetails = data;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log('The id of product is '+ this.navParams.get('product_id'));
  }

}
