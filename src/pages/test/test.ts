import { LocalNotifications } from '@ionic-native/local-notifications';
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
  paymentmethod: any;
  abc: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductsProvider, public http: HttpClient,
    public alertCtrl: AlertController, private localNotifications: LocalNotifications) {

      

      
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    
  }



  

  test() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      data: { secret: 'key' }
    });
  }
}
