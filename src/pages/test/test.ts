import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  currentPage: number;
  searchQuery: string = '';
  items: any[];
  searchingName: string;
  flagEnd: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductsProvider) {

    this.currentPage = 1;
    this.items = [];
    this.searchingName = '';
    this.flagEnd = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    
  }


  getItems(ev: any) {

    this.currentPage = 1;
    this.flagEnd = false;

    let val = ev.target.value;

    if(val === '' || val === null) {
      this.items= [];
    } else {
      this.productService.searchProductByName(val, 1).subscribe(data => {
        this.items = data['products'];
      });
    }
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    
    if(this.flagEnd === false) {
      setTimeout(() => {
        this.currentPage ++;
        this.productService.searchProductByName(this.searchingName,this.currentPage)
          .subscribe(data => {
            console.log('searching name: ', this.searchingName);
            console.log('data product is: ', data['products']);
            if(data['products'].length > 0) {
              this.items = this.items.concat(data['products']) ;
            } else {
              this.flagEnd = true;
            }
          })
  
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }
}
