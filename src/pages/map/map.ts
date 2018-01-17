import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, Platform  } from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {LocationsProvider} from "../../providers/locations/locations";

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  data = [];
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController,
              public maps: GoogleMapsProvider,
              public platform: Platform,
              public locations: LocationsProvider) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap() {
    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
      let locationsLoaded = this.locations.load();

      locationsLoaded.then(data => {
        let lists = this.data = data['users'];
        console.log(lists);
        for(let location of lists) {
          this.maps.addMarker(location.latitude, location.longitude, "<b>" + location.company + "</b>");
        }
      })

    //   Promise.all([
    //     mapLoaded,
    //     locationsLoaded
    //   ]).then((result) => {
    //     let locations = result[1];
    //
    //     console.log("locations: " + locations);
    //
    //     for(let location of locations){
    //       console.log("fucking shit");
    //       this.maps.addMarker(location.latitude, location.longitude);
    //     }
    //   });
    //
    });
  }
}
