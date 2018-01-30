import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraOptions, Camera} from "@ionic-native/camera";
import { FileUploadOptions, FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import { LoadingController} from "ionic-angular";
import { ToastController} from "ionic-angular";
import { HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActionSheetController} from "ionic-angular";
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

  mydata : any;
  addproductform : FormGroup;
  area_arr = [];
  areaobj : any;
  imageURI:any;
  categogry_arr = [];
  catetgoryobj : any;
  filename:any;

  constructor(public navCtrl: NavController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public http: HttpClient,
              public formBuilder: FormBuilder,
              public actionSheetCtrl: ActionSheetController
              ) {
                this.addproductform = this.formBuilder.group({
                  product_name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(254)])],
                  product_price: ['', Validators.compose([Validators.required])],
                  product_quantity: ['', Validators.compose([Validators.required])],
                  product_weight: ['', Validators.compose([Validators.required])],
                  product_description: ['', Validators.compose([Validators.required])],
                  product_metatitle: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(254)])],
                  product_model: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(63)])],
                  product_area: ['', Validators.compose([Validators.required])],
                  product_category: ['', Validators.compose([Validators.required])]
            
                });
                this.allarea();
                this.allcategory();
              }

              addpro(){
                if(this.addproductform.get('product_model').hasError('minlength')){
                  alert('Product model too short, 3 character at least');
                }
                if(this.addproductform.get('product_model').hasError('maxlength')){
                  alert('Product model too long, maximum 64 character');
                }
                if(this.addproductform.get('product_metatitle').hasError('minlength')){
                  alert('Product meta title too short, 3 character at least');
                }
                if(this.addproductform.get('product_metatitle').hasError('maxlength')){
                  alert('Product meta title too long, maximum 255 character');
                }
                if(this.addproductform.get('product_name').hasError('minlength')){
                  alert('Product name too short, 3 character at least');
                }
                if(this.addproductform.get('product_name').hasError('maxlength')){
                  alert('Product name too long, maximum 255 character');
                }
                if(localStorage.getItem('localimg') == null){
                  alert('Please upload a picture');
                }
                if (this.addproductform.valid && localStorage.getItem('localimg') != null)
                {
                this.uploadproduct();
                }
              }
            
            
              uploadproduct() {
                let loader = this.loadingCtrl.create({
                  content: "Uploading..."
                });
                loader.present();
                const fileTransfer: FileTransferObject = this.transfer.create();
                var da = Date.now();
            
                let options: FileUploadOptions = {
                  fileKey: 'file',
                  fileName: da + '.jpg',
                  chunkedMode: false,
                  mimeType: "image/jpeg",
                  params: {userid : 307},
                  httpMethod: 'POST'
                }
            
                fileTransfer.upload(this.imageURI, 'http://24gocheck.com/index.php?route=api2/upload', options)
                  .then((data) => {
                    loader.dismiss();
                    this.mydata = data;
                    var myfilename = JSON.parse(this.mydata.response);
                    this.addproduct(this.addproductform.value.product_name, this.addproductform.value.product_price,
                      this.addproductform.value.product_quantity, this.addproductform.value.product_weight, this.addproductform.value.product_description,
                      this.addproductform.value.product_metatitle, this.addproductform.value.product_model, this.addproductform.value.product_area,
                      this.addproductform.value.product_category, myfilename.filename).subscribe(data => {
                        alert('successfully add product' );
                        localStorage.setItem('localimg', null);
                        this.navCtrl.push(AddProductPage);
                        this.imageURI = null;
                    }, error => {
                    })
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
            
              addproduct(product_name, product_price, product_quantity, product_weight, product_description, product_metatitle, product_model, product_category, product_zone, product_image){
                var data1 = 'product_name=' + product_name + '&product_price=' + product_price + '&product_quantity=' + product_quantity
                            + '&product_weight=' + product_weight + '&product_description=' + product_description + '&product_meta_title=' + product_metatitle
                            + '&product_model=' + product_model + '&image=' + product_image + '&product_category=' + product_category + '&zone_id=' + product_zone
                            +  '&status=' + 1 + '&user_id=' + localStorage.getItem('user_id') + '&location=' + localStorage.getItem('address');
                var config = {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
                }
                return this.http.post('http://24gocheck.com/index.php?route=api2/product_create', data1, config);
              }
            
              getarea(){
                var data1 = 'country_id=' + 230;
                var config = {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
                }
                return this.http.post('http://24gocheck.com/index.php?route=api2/address/getZones', data1, config);
              }
            
              allarea(){
            
                this.getarea().subscribe(data => {
                  this.areaobj = data;
                  this.area_arr = this.areaobj.zones;
            
                })
              }
            
              getcategory(){
                return this.http.get('http://24gocheck.com/index.php?route=api2/category/all');
              }
            
              allcategory(){
                this.getcategory().subscribe(data => {
                  this.catetgoryobj = data;
                  this.categogry_arr = this.catetgoryobj.categories;
                })
              }
            
              alertSheetPictureOptions(){
                const myoptions: CameraOptions = {
                  quality: 100,
                  destinationType: this.camera.DestinationType.FILE_URI,
                  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                  targetWidth: 300,
                  targetHeight: 300,
                  encodingType: this.camera.EncodingType.JPEG,
                  correctOrientation: true,
                  allowEdit: true
            
                }
            
                const myoptions2: CameraOptions = {
                  quality: 100,
                  destinationType: this.camera.DestinationType.FILE_URI,
                  sourceType: this.camera.PictureSourceType.CAMERA,
                  targetWidth: 300,
                  targetHeight: 300,
                  encodingType: this.camera.EncodingType.JPEG,
                  correctOrientation: true,
                  allowEdit: true
                }
            
            
                var options;
                let actionSheet = this.actionSheetCtrl.create({
                  title: 'Add picture with',
                  buttons: [
                    {
                      text: 'Camera Roll',
                      icon: 'camera',
                      handler: () => {
                        options = myoptions2;
                        this.camera.getPicture(options)
                          .then((imageData) => {
                            this.imageURI = imageData;
                            localStorage.setItem('localimg', 'yes');
                          }, (err) => {
                          });
                      }
                    },{
                      text: 'Gallery',
                      icon: 'images',
                      handler: () => {
                        options = myoptions;
                        this.camera.getPicture(options)
                          .then((imageData) => {
            
                            this.imageURI = imageData;
                            localStorage.setItem('localimg', 'yes');
                          }, (err) => {
                          });
                      }
                    },{
                      text: 'Cancel',
                      role: 'cancel',
                      icon: 'undo',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    }
                  ]
                });
                actionSheet.present();
              }
            
              filled(){
                if(this.addproductform.get('product_name').hasError('required') ||
                  this.addproductform.get('product_metatitle').hasError('required') ||
                  this.addproductform.get('product_price').hasError('required') ||
                  this.addproductform.get('product_quantity').hasError('required') ||
                  this.addproductform.get('product_weight').hasError('required') ||
                  this.addproductform.get('product_description').hasError('required') ||
                  this.addproductform.get('product_area').hasError('required') ||
                  this.addproductform.get('product_category').hasError('required') ||
                  this.addproductform.get('product_model').hasError('required')){
                  return false;
                }
                else {
                  return true;
                }
              }

}
