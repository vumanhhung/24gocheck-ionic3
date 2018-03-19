import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryPointPage } from './delivery-point';

@NgModule({
  declarations: [
    DeliveryPointPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryPointPage),
  ],
})
export class DeliveryPointPageModule {}
