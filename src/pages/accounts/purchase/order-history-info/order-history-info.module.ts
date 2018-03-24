import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryInfoPage } from './order-history-info';

@NgModule({
  declarations: [
    OrderHistoryInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryInfoPage),
  ],
})
export class OrderHistoryInfoPageModule {}
