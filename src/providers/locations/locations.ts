import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LocationsProvider {

  data: any;

  constructor(public http: HttpClient) {
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.post('http://24gocheck.com/index.php?route=api2/user_list', '', {})
        .subscribe(data => {
          // this.data = this.applyHaversine(data);
          // this.data.sort((locationA, locationB) => {
          //   return locationA.distance - locationB.distance;
          // });
          this.data = data;
          resolve(this.data);
      });
    });

  }

  applyHaversine(locations) {

    let usersLocation = {
      lat: 21.01362700000001,
      lng: 105.80603339999993
    };

    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);
    });
    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }
}
