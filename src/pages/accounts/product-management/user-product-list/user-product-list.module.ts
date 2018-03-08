import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductListPage } from './user-product-list';

@NgModule({
  declarations: [
    UserProductListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductListPage),
  ],
})
export class UserProductListPageModule {}
