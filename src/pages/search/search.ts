import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ShopsProvider} from "../../providers/shops/shops";
import { ProductsProvider } from '../../providers/products/products';
import { CategoriesProvider } from '../../providers/categories/categories';
import {CategoryPage} from "../categories/category/category";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchBy: string;
  currentPage: number;
  catePage = 0;
  categoryList = [];
  searchQuery: string = '';
  items: any[];
  searchingName: string;
  flagEnd: boolean;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  user$ = [];

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
    public productService: ProductsProvider,public shopService: ShopsProvider, public categoryService: CategoriesProvider)
   {
    this.searchBy = 'near';
    this.currentPage = 1;
    this.items = [];
    this.searchingName = '';
    this.flagEnd = false;
    shopService.getUserLists(21.01362700000001, 105.80603339999993).subscribe(users => {
      this.user$ = users['users'];
    });    
    this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
        });
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(latLng, "<b>My Location</b>");

    }, (err) => {
      console.log(err);
    });

  }


  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  getItems(ev: any) {

    this.currentPage = 1;
    this.flagEnd = false;

    let val = ev.target.value;

    if(val === '' || val === null) {
      this.items= [];
    } else {
      this.productService.searchProductByName(val, 1).subscribe(data => {
        this.items = data['products'];
      });
    }
    
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    
    if(this.flagEnd === false) {
      setTimeout(() => {
        this.currentPage ++;
        this.productService.searchProductByName(this.searchingName,this.currentPage)
          .subscribe(data => {
            console.log('searching name: ', this.searchingName);
            console.log('data product is: ', data['products']);
            if(data['products'].length > 0) {
              this.items = this.items.concat(data['products']) ;
            } else {
              this.flagEnd = true;
            }
          })
  
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }
}
