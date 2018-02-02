import { ProductPage } from './../../products/product/product';
import { ProductsProvider } from './../../../providers/products/products';
import { ShopsProvider } from './../../../providers/shops/shops';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


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

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  shopDetails = {};
  productId;
  product = {};
  shopProducts = [];
  productDetailsPage: any;
  place: string;
  phone: string;
  cate: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopService: ShopsProvider,
    private productService: ProductsProvider,
    public geolocation: Geolocation,
    public translate: TranslateService,
    private launchNavigator: LaunchNavigator) {

    this.productDetailsPage = ProductPage;
    this.place = translate.instant("shop_name");
    this.phone = translate.instant("phone");
    this.cate = translate.instant("category");
    this.shopDetails = this.navParams.data;

    productService.getProductListByShopId(this.shopDetails['user_id'], 1)
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
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#c9b2a6' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#dcd2be' }]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ae9e90' }]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#93817c' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{ color: '#a5b076' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#447530' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#f5f1e6' }]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{ color: '#fdfcf8' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#f8c967' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#e9bc62' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{ color: '#e98d58' }]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#db8555' }]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#806b63' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8f7d77' }]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#ebe3cd' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{ color: '#dfd2ae' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#b9d3c2' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#92998d' }]
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


  navigate() {
    this.launchNavigator.navigate([this.shopDetails['latitude'], this.shopDetails['longitude']]);
  }


  calcRoute(start, end) {

    let request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };

    navigator.geolocation.getCurrentPosition(function (pos) {
      let mylatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let myitemlatlng = new google.maps.LatLng(this.shopDetails['latitude'], this.shopDetails['longitude']);
      this.calcRoute(mylatlng, myitemlatlng);
      this.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      this.launchnavigator.navigate([this.shopDetails['latitude'], this.shopDetails['longitude']], {
        start: [pos.coords.latitude, pos.coords.longitude]
      });
      // $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });

    this.directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        this.directionsDisplay.setMap(this.map);
      } else {
        alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
      }
    });
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
