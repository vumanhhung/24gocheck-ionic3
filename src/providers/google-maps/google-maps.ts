import { Injectable } from '@angular/core';
import {ConnectivityProvider} from "../connectivity/connectivity";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;



@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string = 'AIzaSyBABOvrABpLxkcQ5_aNIGSviMXOjakloeE';

  constructor(
    public connectivityService: ConnectivityProvider,
    public geolocation: Geolocation
  ) {}

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }


  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == "undefined" || typeof google.maps == "undefined") {
        console.log("Maps needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      }
      else {
        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
      }
      this.addConnectivityListeners();
    });

  }
  
  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.addMarker(position.coords.latitude, position.coords.longitude, "{{'map.locate'|translate}}");
        resolve(true);
      });
    });
  }


  addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      console.log("online");
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    }, false);

    document.addEventListener('offline', () => {
      console.log("offline");
      this.disableMap();
    }, false);

  }

  addMarker(lat: number, lng: number, content: string) {
    let position = new google.maps.LatLng(lat, lng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    this.addInfoWindow(marker, content);
    return marker;
  }

  // addMarker(lat: number, lng: number): void {
  //
  //   let latLng = new google.maps.LatLng(lat, lng);
  //
  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.DROP,
  //     position: latLng
  //   });
  //
  //   this.markers.push(marker);
  //
  // }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

}
