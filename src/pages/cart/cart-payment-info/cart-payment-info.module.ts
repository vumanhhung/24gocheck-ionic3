import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPaymentInfoPage } from './cart-payment-info';

@NgModule({
  declarations: [
    CartPaymentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPaymentInfoPage),
  ],
})
export class CartPaymentInfoPageModule {}
