import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ShopsProvider} from "../../providers/shops/shops";
import { ProductsProvider } from '../../providers/products/products';
import { CategoriesProvider } from '../../providers/categories/categories';
import { CategoryPage } from "../categories/category/category";
import { ProductPage } from '../products/product/product';
import { ProfilesPage } from '../accounts/profiles/profiles';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { LocationsProvider } from '../../providers/locations/locations';


declare var google;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  users = [];
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  start = 'chicago, il';
  end = 'chicago, il';

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  categoryId: number;
  searchBy: string;
  currentPage: number;
  productByCategoryId = [];
  catePage = 0;
  categoryList = [];
  searchQuery: string = '';
  items: any[];
  searchingName: string;
  flagEnd: boolean;
  productDetail: any;

  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation,
    public productService: ProductsProvider,
    public shopService: ShopsProvider, 
    public categoryService: CategoriesProvider,
    public platform: Platform,
    public locationProvider: LocationsProvider,
    )
   {

    this.searchBy = 'near';
    this.currentPage = 1;
    this.items = [];
    this.searchingName = '';
    this.flagEnd = false;
    this.productDetail = ProductPage;
    this.categoryId = 1;

    this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
          console.log(data);
        });

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){

    //Get current position
    this.geolocation.getCurrentPosition().then((position) => {

      let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: pos,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      let marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: pos,
      });

      let content = "<b>Vị trí của tôi</b>";          

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addInfoWindow(marker, content);
      marker.setMap(this.map);
      this.directionsDisplay.setMap(this.map);

    }, (err) => {
      console.log(err);
    });

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  addMarker(){
    let locationsLoaded = this.locationProvider.load();
  
    locationsLoaded.then(data => {
      let locations = this.users = data['users'];

      console.log(locations);
      
      for (let i = 0; i < locations.length; i++) {  

        let position = new google.maps.LatLng(parseFloat(locations[i]['latitude']), parseFloat(locations[i]['longitude']));

        let marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: position,
          map: this.map,
        });

        this.addInfoWindow(marker, "<b>" + locations[i]['email'] || locations[i]['company'] + "</b>");
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


















  searchByCategory(categoryId: number) {
    console.log(categoryId);
    this.productService.getProductsByCategoryId(categoryId, 1).subscribe(data => {
      this.productByCategoryId = data['products'];
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
    
    if(this.flagEnd === false) {
      setTimeout(() => {
        this.currentPage ++;
        this.productService.searchProductByName(this.searchingName,this.currentPage)
          .subscribe(data => {
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
