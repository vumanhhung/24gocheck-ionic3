import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryTransactionDetailPage } from './history-transaction-detail';

@NgModule({
  declarations: [
    HistoryTransactionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryTransactionDetailPage),
  ],
})
export class HistoryTransactionDetailPageModule {}
