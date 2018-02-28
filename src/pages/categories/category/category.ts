import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { ProductPage } from './../../products/product/product';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  categoryDetails = {};
  productDetailsPage: any;
  categoryProducts = [];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public productsService: ProductsProvider) {

    this.categoryDetails = this.navParams.data;
    this.productDetailsPage = ProductPage;

    console.log('Category id is: '+this.categoryDetails['category_id']);
    this.productsService.getProductsByCategoryId(this.categoryDetails['category_id'], 1).subscribe(data => {
      console.log(JSON.stringify(data));
      this.categoryProducts = data['products'];
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }



}
