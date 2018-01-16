import { CameraOptions } from '@ionic-native/camera';
import { FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  myfault : any;

  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              ) {}


  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'ionicfile.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: {userid : 307},
      httpMethod: 'POST'
    }

    fileTransfer.upload(this.imageURI, 'http://24gocheck.com/index.php?route=api2/upload', options)
      .then((data) => {
        console.log(data+" Uploaded Successfully");

        loader.dismiss();
        this.myfault = data;

        var str = JSON.stringify(this.myfault);



        alert(str);
      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(decodeURI(err));
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
