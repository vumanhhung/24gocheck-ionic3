import { AddProductPage } from './add-product/add-product';
import { CameraOptions } from '@ionic-native/camera';
import { FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the ProductManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-management',
  templateUrl: 'product-management.html',
})
export class ProductManagementPage {

  addProductPage: any;

  constructor() {
    this.addProductPage = AddProductPage;
  }
}
