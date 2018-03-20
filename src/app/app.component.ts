import { CartsProvider } from './../providers/carts/carts';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';
import { NotificationsProvider } from '../providers/notifications/notifications';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public translate: TranslateService, private fcm: FCM, private notification: NotificationsProvider, private cartService: CartsProvider) {
    translate.setDefaultLang('vi');
    translate.use("vi");
    platform.ready().then(() => {

      if(platform.is('cordova')){
        //Notifications
        fcm.subscribeToTopic('all');
        fcm.getToken().then(token=>{
            console.log(token);
            // alert('Token is '+ token);
        });
        fcm.onNotification().subscribe(data=>{
          // alert('Outside '+ JSON.stringify(data));
          if(data.wasTapped){
            console.log("Received in background");
            // alert('Data was tapped '+JSON.stringify(data));
          } else {
            console.log("Received in foreground");
            // alert('recieve in foreground '+ JSON.stringify(data));
            
          };

          
          this.notification.addUserNotification(data.message);
        });
        fcm.onTokenRefresh().subscribe(token=>{
          console.log(token);
          alert('Subscribe '+token);
        });
        //end notifications.
      }


      
      this.setProductCountFromCart();
      this.notification.getUserNotifications();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  // changeLanguage(langauge) {
  //   this.translate.use(langauge);
  // }



  setProductCountFromCart() {
    this.cartService.getCartProducts().subscribe(data => {
      // alert('Products cart number ' + data['products'].length);
      localStorage.setItem('cart_count', data['products'].length);
    });
  }

  
}

