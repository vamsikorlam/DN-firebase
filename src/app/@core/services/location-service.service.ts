import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoints } from 'src/app/@core/structs/endpoints.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  CurrentLocation$ = new BehaviorSubject(null);
  currentLocationCoordinates$ = new BehaviorSubject<{ lat: any, lng: any }>(null);

  constructor(private http: HttpClient) {
  }

  getLocationFromLatLng(latLng): void {
    latLng = latLng.lat + ',' + latLng.lng;
    const params = new HttpParams().set('latlng', latLng).set('key', environment.google_Api_key);
    this.http.get(Endpoints.GET_LAT_LNG, { params }).pipe(map((result: any) => {
      if (result && result.status === 'OK') {
        return {
          lat: result.results[0].geometry.location.lat,
          lng: result.results[0].geometry.location.lng,
          formatedAddress: result.results[0].formatted_address
        };
      } else {
        return {};
      }
    })).subscribe(formatedLocation => {
      localStorage.setItem('currentLocation', JSON.stringify(formatedLocation));
      this.CurrentLocation$.next(formatedLocation);
      this.currentLocationCoordinates$.next({ lat: formatedLocation.lat, lng: formatedLocation.lng });
    });
  }

  setCurrentLocationCoordinates(lat, lng, formatedAddress): void {
    localStorage.setItem('currentLocation', JSON.stringify({ formatedAddress, lat, lng }));
    this.currentLocationCoordinates$.next({ lat, lng });
  }

  getCurrentLocationCoordinates(): Observable<{ lat: number; lng: number }> {
    return this.currentLocationCoordinates$ as Observable<{ lat: number, lng: number }>;
  }

}
