import { CategoryPage } from './../pages/categories/category/category';
import { LoginPage } from './../pages/accounts/login/login';
import { FavoritesPage } from './../pages/accounts/favorites/favorites';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ProductListPage } from './../pages/products/product-list/product-list';
import { ProductPage } from './../pages/products/product/product';
import { ProductsPage } from './../pages/products/products';
import { ShopListPage } from './../pages/shops/shop-list/shop-list';
import { ShopPage } from './../pages/shops/shop/shop';
import { ShopsPage } from './../pages/shops/shops';
import { MyApp } from './app.component';
import { AccountsPage } from '../pages/accounts/accounts';
import { FeedbackPage } from '../pages/accounts/feedback/feedback';
import { RegisterPage } from '../pages/accounts/register/register';
import { ProfilesPage } from '../pages/accounts/profiles/profiles';
import { CategoriesPage } from '../pages/categories/categories';
import { SearchPage } from '../pages/search/search';

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
    SearchPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
