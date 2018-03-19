import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Img ,ModalController,AlertController } from 'ionic-angular';
import { ProfilesPage } from './profiles/profiles';
import { ProductManagementPage } from './product-management/product-management';
import { FeedbackPage } from './feedback/feedback';
import { FavoritesPage } from './favorites/favorites';
import { AccountsProvider } from '../../providers/accounts/accounts';
import { HomePage } from '../home/home';
import { AboutUsPage } from './about-us/about-us';
import { WalletPage } from './wallet/wallet';
/**
 * Generated class for the AccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  profilePage: any;
  productManagementPage: any;
  feedbackPage: any;
  favoritesPage: any;
  walletPage: any;
  lang: string = "vi";


  constructor(public navCtrl: NavController, public navParams: NavParams, public accountsService: AccountsProvider,public translate : TranslateService,
    public alertCtrl: AlertController, public modalCtrl: ModalController) {
      this.profilePage = ProfilesPage;
      this.productManagementPage = ProductManagementPage;
      this.feedbackPage = FeedbackPage;
      this.favoritesPage = FavoritesPage;
      this.lang = translate.currentLang;
      this.walletPage = WalletPage;
      // this.testPage = TestPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  onUserLogout() {
    this.accountsService.userLogout();
    this.navCtrl.parent.select(0);
  }

  onChange(e){
    this.translate.use(e);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: `Về chúng tôi </br></br> 
      <div style="padding:10px;">
        <img src="http://24gocheck.com/image/catalog/24gocheck%20Icons/alvietjs%20logo.jpg">
      <div>
      `,
      
      subTitle: 'Gửi email cho chúng tôi để nhận thêm thông tin',
      buttons: ['OK'],
      message:'infoalvietjs@gmail.com',
      cssClass:'popup-account avv',
      
    });
    alert.present();
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(AboutUsPage);
    profileModal.present();
  }
}
