import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductsProvider, public http: HttpClient,
    public alertCtrl: AlertController) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    
  }

  wishList() {
    
    this.getWishlist().subscribe(data => {
      console.log(JSON.stringify(data));
      alert(JSON.stringify(data));
    })
  }


  getWishlist() {
    var data1 = '';
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    return this.http.post('http://24gocheck.com/index.php?route=api2/wishlist', data1, config);
  }
}
