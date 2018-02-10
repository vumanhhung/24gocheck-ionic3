import { CartsProvider } from './../../../providers/carts/carts';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductsProvider,
    private cartService: CartsProvider) {
    
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

  public addToCart() {
    if(this.productDetails.hasOwnProperty('product_id')){
      this.cartService.addToCart(this.productDetails['product_id'], 1).subscribe(data => {
        console.log('Product has Id '+ this.productDetails['product_id']);
        alert('Đã thêm sản phẩm vào giỏ hàng');
      }, error => {
        alert('Lỗi không thêm được sản phẩm');
      });

    }else {
      alert('Không tìm thấy sản phẩm');
    }
  }

}
