import { IonicStorageModule } from '@ionic/storage';
import { AddProductPage } from './../pages/accounts/product-management/add-product/add-product';
import { TestPage } from './../pages/test/test';
import { CartPage } from './../pages/cart/cart';
import { ProductManagementPage } from './../pages/accounts/product-management/product-management';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AccountsPage } from '../pages/accounts/accounts';
import { FeedbackPage } from '../pages/accounts/feedback/feedback';
import { ProfilesPage } from '../pages/accounts/profiles/profiles';
import { RegisterPage } from '../pages/accounts/register/register';
import { CategoriesPage } from '../pages/categories/categories';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ShopsProvider } from '../providers/shops/shops';
import { TestProvider } from '../providers/test/test';
import { FrontSliderComponent } from './../components/front-slider/front-slider';
import { FavoritesPage } from './../pages/accounts/favorites/favorites';
import { LoginPage } from './../pages/accounts/login/login';
import { CategoryPage } from './../pages/categories/category/category';
import { ProductListPage } from './../pages/products/product-list/product-list';
import { ProductPage } from './../pages/products/product/product';
import { ProductsPage } from './../pages/products/products';
import { ShopListPage } from './../pages/shops/shop-list/shop-list';
import { ShopPage } from './../pages/shops/shop/shop';
import { ShopsPage } from './../pages/shops/shops';
import { TabsPage } from './../pages/tabs/tabs';
import { MyApp } from './app.component';
import { ProductsProvider } from '../providers/products/products';
import { NotificationsPage } from '../pages/notifications/notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { CategoriesProvider } from '../providers/categories/categories';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { LocationsProvider } from '../providers/locations/locations';
import { CartPaymentInfoPage } from '../pages/cart/cart-payment-info/cart-payment-info';
import { CartPaymentMethodPage } from '../pages/cart/cart-payment-method/cart-payment-method';
import { MapPage } from "../pages/map/map";
import { FileUploadOptions, FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { CartPaymentCheckoutPage } from '../pages/cart/cart-payment-checkout/cart-payment-checkout';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { AccountsProvider } from '../providers/accounts/accounts';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ZonesProvider } from '../providers/zones/zones';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsPage,
    ProductListPage,
    ProductPage,
    ShopsPage,
    ShopPage,
    ShopListPage,
    AccountsPage,
    FavoritesPage,
    FeedbackPage,
    LoginPage,
    RegisterPage,
    ProfilesPage,
    CategoriesPage,
    CategoryPage,
    SearchPage,
    FrontSliderComponent,
    TabsPage,
    CartPage,
    NotificationsPage,
    ProductManagementPage,
    MapPage,
    TestPage,
    AddProductPage,
    CartPaymentInfoPage,
    CartPaymentMethodPage,
    CartPaymentCheckoutPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsPage,
    ProductListPage,
    ProductPage,
    ShopsPage,
    ShopPage,
    ShopListPage,
    AccountsPage,
    FavoritesPage,
    FeedbackPage,
    LoginPage,
    RegisterPage,
    ProfilesPage,
    CategoriesPage,
    CategoryPage,
    SearchPage,
    TabsPage,
    CartPage,
    NotificationsPage,
    ProductManagementPage,
    MapPage,
    TestPage,
    AddProductPage,
    CartPaymentInfoPage,
    CartPaymentMethodPage,
    CartPaymentCheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestProvider,
    ShopsProvider,
    Geolocation,
    Network,
    ProductsProvider,
    CategoriesProvider,
    ConnectivityProvider,
    GoogleMapsProvider,
    LocationsProvider,
    FileTransfer,
    FileTransferObject,
    Camera,
    NotificationsProvider,
    AccountsProvider,
    LaunchNavigator,
    ZonesProvider
  ]
})
export class AppModule {}

export function setTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/','.json');
}
