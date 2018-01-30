import { ProductPage } from './../../products/product/product';
import { ProductsProvider } from './../../../providers/products/products';
import { ShopsProvider } from './../../../providers/shops/shops';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  shopDetails = {};
  productId;
  product = {};
  shopProducts = [];
  productDetailsPage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private shopService: ShopsProvider,
    private productService: ProductsProvider,
    public geolocation: Geolocation,) {

      this.productDetailsPage = ProductPage;

      this.shopDetails = this.navParams.data;

      this.productService.getProductListByShopId(this.shopDetails['user_id'], 1)
        .subscribe(data => {
          this.shopProducts = data['products'];
          console.log("product" + data);
        });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

    let pos = new google.maps.LatLng(this.shopDetails['latitude'], this.shopDetails['longitude']);

    let mapOptions = {
      center: pos,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#c9b2a6'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#dcd2be'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ae9e90'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#93817c'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#a5b076'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#447530'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#fdfcf8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#f8c967'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#e9bc62'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#e98d58'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ebe3cd'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#b9d3c2'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#92998d'}]
        }
      ]
    }

    let image = {
      url: 'http://24gocheck.com/image/catalog/24gocheck%20Icons/bluemarker.png', // image is 512 x 512
      scaledSize: new google.maps.Size(36, 36)
    };

    let marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: pos,
      icon: image,
    });

    let content = 
        '<div><strong>' + 'Place: ' + (this.shopDetails['company'] ? this.shopDetails['company'] : this.shopDetails['fullname']) + '</strong><br>' +
        'Phone: ' + this.shopDetails['phone'] + '<br>' + 
        'Address: ' + this.shopDetails['address'] + '</div>';         

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);

  }

  
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }



}
