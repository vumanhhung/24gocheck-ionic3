import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPaymentMethodPage } from './cart-payment-method';

@NgModule({
  declarations: [
    CartPaymentMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPaymentMethodPage),
  ],
})
export class CartPaymentMethodPageModule {}
