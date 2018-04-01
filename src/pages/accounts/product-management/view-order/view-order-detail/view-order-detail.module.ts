import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewOrderDetailPage } from './view-order-detail';

@NgModule({
  declarations: [
    ViewOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewOrderDetailPage),
  ],
})
export class ViewOrderDetailPageModule {}
