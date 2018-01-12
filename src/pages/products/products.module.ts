import { ProductListPageModule } from './product-list/product-list.module';
import { ProductsPage } from './products';
import { ProductPage } from './product/product';
import { ProductListPage } from './product-list/product-list';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ProductsPage
  ],
  imports: [
    ProductListPageModule,
    IonicPageModule.forChild(ProductsPage),
  ],
})
export class ProductsPageModule {}
