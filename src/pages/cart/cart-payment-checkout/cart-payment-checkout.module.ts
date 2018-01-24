import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPaymentCheckoutPage } from './cart-payment-checkout';

@NgModule({
  declarations: [
    CartPaymentCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPaymentCheckoutPage),
  ],
})
export class CartPaymentCheckoutPageModule {}
