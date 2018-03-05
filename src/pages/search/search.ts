import { ShopPage } from './../shops/shop/shop';
import { CategoriesPage } from './../categories/categories';
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
import { TranslateService } from '@ngx-translate/core';
import { ZonesProvider } from '../../providers/zones/zones';



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
  categoryListMap = [];
  searchQuery: string = '';
  items: any[];
  searchingName: string;
  flagEnd: boolean;
  productDetail: any;
  shopDetail: any;
  place: string;
  phone: string;
  cate: string;
  map_locate: string;
  allZone: any;  
  shopsByZoneId = [];
  categoryPage: CategoriesPage;

  currentCategoryPage: number;
  currentCityPage: number;
  flagCategoryEnd: boolean;
  flagCityEnd: boolean;
  zoneId: number;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public productService: ProductsProvider,
    public shopService: ShopsProvider,
    public categoryService: CategoriesProvider,
    public platform: Platform,
    public locationProvider: LocationsProvider,
    public translate : TranslateService,
    public zonesProvider: ZonesProvider
    )
   {

    this.searchBy = 'near';
    this.currentPage = 1;
    this.items = [];
    this.searchingName = '';
    this.flagEnd = false;
    this.productDetail = ProductPage;
    this.shopDetail = ShopPage;
    this.categoryId = 1;
    this.place = translate.instant("shop_name");
    this.phone = translate.instant("phone");
    this.cate = translate.instant("category");
    this.map_locate = translate.instant("locate");
    this.currentCategoryPage = 1;
    this.flagCategoryEnd = false;
    this.flagCityEnd = false;
    this.zoneId = -1;

    this.categoryService.getCategoryList()
        .subscribe(data => {
          this.categoryList = data['categories'] || [];
          console.log(data);
        });

    this.locationProvider.load()
        .then(data => {
          this.categoryListMap = data['users'] || [];
          console.log(data);
        });

    this.zonesProvider.getZones().subscribe(data => {
      this.allZone = data['zones'];
    })

  }

  ionViewDidLoad() {
    setTimeout(()=> {
      this.loadMap();
    },1000);
  }

  loadMap(){

    //Get current position
    this.geolocation.getCurrentPosition().then((position) => {

      let pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: pos,
        zoom: 13,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,
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

      let content = '"<b>Vị trí của tôi</b>"';

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addInfoWindow(marker, content);
      marker.setMap(this.map);
      this.nearBy();

      let centerControlDiv = document.createElement('div');
      let centerControl = this.centerControlFunction(centerControlDiv, this.map, pos);

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
    }, (err) => {
      console.log(err);
    });

  }

  locate() {
    this.loadMap();
  }




  nearBy(){
    let locationsLoaded = this.locationProvider.load();

    locationsLoaded.then(data => {
      let locations = this.users = data['users'];

      let image = {
        url: 'http://24gocheck.com/image/catalog/24gocheck%20Icons/greenmarker.png',
        scaledSize: new google.maps.Size(40, 40)
      };

      for (let i = 0; i < locations.length; i++) {

        let position = new google.maps.LatLng(parseFloat(locations[i]['latitude']), parseFloat(locations[i]['longitude']));

        let marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: position,
          icon: image,
          map: this.map,
        });

        let content = '<div><strong>' + this.place + ': ' + (locations[i]['company'] ? locations[i]['company'] : locations[i]['fullname']) + '</strong><br>' +
        this.phone + ': ' + locations[i]['phone'] + '<br>' +
        this.cate + ': ' + locations[i]['category_name'] + '</div>';

        this.addInfoWindow(marker, content);
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



  /**
   * hiển thị danh sách sản phẩm theo category_id
   */
  searchByCategory(categoryId: number) {
    this.flagCategoryEnd = false;
    this.currentCategoryPage = 1;
    console.log(categoryId);
    this.productService.getProductsByCategoryId(categoryId, 1).subscribe(data => {
      this.productByCategoryId = data['products'];
    });
  }

  /**
   * hiển thị danh sách sản phẩm theo zone_id
   * zone_id: id của thành phố
   */
  searchByZone(zone_id: number) {
    this.flagCityEnd = false;
    this.currentCityPage = 1;
    console.log('ZOne is: '+ zone_id);
    this.shopService.getShopListByZoneId(zone_id, 1).subscribe(data => {
      this.shopsByZoneId = data['shops'];
    });
  }

  /**
   * hàm chạy khi người dùng thay đổi input (aka gõ chữ)
   */
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

  /**
   * (chỉ dành cho search theo tên)
   * khi người dùng kéo xuống đáy app
   * load thêm 10 sản phẩm nữa 
   */
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
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }





  centerControlFunction(controlDiv, map, pos) {

    // Set CSS for the control border.
    let controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.style.position = 'absolute';
    controlUI.style.top = '11px';
    controlUI.style.left = '11px';
    controlUI.style.width = '50px';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    let controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '22px';

    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '5px';
    controlText.style.color = 'darkgray';
    controlText.innerHTML = this.map_locate;
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        map.setCenter(pos);
    });

  }

  /**
   * (chỉ dành cho search category)
   * khi người dùng kéo xuống đáy app
   * load thêm 10 sản phẩm nữa 
   */
  doInfiniteCategory(infiniteScroll) {
    if(this.flagCategoryEnd === false) {
      setTimeout(() => {
        this.currentCategoryPage++;
        this.productService.getProductsByCategoryId(this.categoryId,this.currentCategoryPage)
          .subscribe(data => {
            if(data['products'].length > 0) {
              this.productByCategoryId = this.productByCategoryId.concat(data['products']) ;
            } else {
              this.flagCategoryEnd = true;
            }
          })
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

  /**
   * (chỉ dành cho search zone_id)
   * khi người dùng kéo xuống đáy app
   * load thêm 10 gian hàng (aka user) nữa 
   */
  doInfiniteCity(infiniteScroll) {
    if(this.flagCityEnd === false) {
      setTimeout(() => {
        this.currentCityPage += 10;
        this.shopService.getShopListByZoneId(this.zoneId,this.currentCityPage)
          .subscribe(data => {
            if(data['shops'].length > 0) {
              this.shopsByZoneId = this.shopsByZoneId.concat(data['shops']) ;
            } else {
              this.flagCityEnd = true;
            }
          })
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }


}
