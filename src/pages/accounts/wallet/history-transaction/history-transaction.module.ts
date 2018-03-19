import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryTransactionPage } from './history-transaction';

@NgModule({
  declarations: [
    HistoryTransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryTransactionPage),
  ],
})
export class HistoryTransactionPageModule {}
