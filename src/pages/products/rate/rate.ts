import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {
  product_id: any;
  reviewForm: FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductsProvider,
    public formBuilder: FormBuilder) {
    this.product_id = navParams.get('product_id');
    
    //Validate các trường trong form
    this.reviewForm = this.formBuilder.group({
      fullname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]*'), Validators.maxLength(25)] )],
      comment: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s,]*'), Validators.maxLength(500), Validators.minLength(25)])],
    });
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }


  addReview(){
    this.productService.addReview(this.product_id,this.reviewForm.value.fullname,this.reviewForm.value.comment).subscribe(data => {
      alert(JSON.stringify(data));
    }, error => {

    })
  }
}
