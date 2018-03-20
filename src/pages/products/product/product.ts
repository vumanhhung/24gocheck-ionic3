import { CartsProvider } from './../../../providers/carts/carts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ShopPage } from '../../shops/shop/shop';
import { ShopsProvider } from '../../../providers/shops/shops';

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
  shopDetailsPage: ShopPage;
  shopDetails = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductsProvider,
    private cartService: CartsProvider, private shopService: ShopsProvider) {
    
      //hiển thị sản phẩm theo id
      productService.getProductById(navParams.get('product_id'))
        .subscribe(data => {
          console.log('product data: ', data);
          this.productDetails = data;

          //hiển thị thông tin chủ gian hàng (aka user) theo id
          shopService.getShopDetails(data['separate_u_user_id'])
            .subscribe(data=>{
              this.shopDetails=data['shops'][0];
              console.log('fail',this.shopDetails);
            });

        });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log('The id of product is '+ this.navParams.get('product_id'));
  }

  /**
   * thêm sản phẩm vào giỏ hàng
   */
  public addToCart() {
    if(this.productDetails.hasOwnProperty('product_id')){
      this.cartService.addToCart(this.productDetails['product_id'], 1).subscribe(data => {
        this.cartService.getCartProducts().subscribe(data => {
          // alert('Products cart number ' + data['products'].length);
          localStorage.setItem('cart_count', data['products'].length);
        });
        console.log('Product has Id '+ this.productDetails['product_id']);
        alert('Đã thêm sản phẩm vào giỏ hàng');
      }, error => {
        alert('Lỗi không thêm được sản phẩm');
      });

    }else {
      alert('Không tìm thấy sản phẩm');
    }
  }

  /**
   * chuyển tới trang Shop (gian hàng)
   */
  public goToShop(){
    this.navCtrl.push(ShopPage,this.shopDetails);
  }
}
