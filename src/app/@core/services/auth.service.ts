import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, of, throwError, Subject } from 'rxjs';
import { switchMap, exhaustMap } from 'rxjs/operators';
import { Endpoints } from '../structs/endpoints.enum';
import { Router } from '@angular/router';
import { Path } from 'src/app/@core/structs/path.enum'
import { BaseService } from './base.service';
import { LocationServiceService } from './location-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  user$ = new BehaviorSubject(null);
  userObservable$ = this.user$.asObservable()
  location: any;
  // error$ = new BehaviorSubject(null);
  // sucess$ = new BehaviorSubject(null);
  openloginmodal$ = new Subject();
  constructor(private http: HttpClient, private route: Router, private locationService: LocationServiceService) {
    super(http)
  }


  //this function is used for both google and facebook login
  socialLogin(token, provider): Observable<any> {
    if (provider == "FACEBOOK") {
      let body;
      body = {
        'provider': 'facebook',
        'access_token': token
      }


      return this.post(Endpoints.SOCIAL_LOGIN, body).pipe(switchMap(user => {
        if (user.api_status == 200) {

          this.setUser(user);

          return of(user);
        }
        else {
          return throwError(user);
        }
      }))

    }
    else {
      console.log('inside google');
      let body;



      body = {
        'provider': "google",
        "google_key": token,
        "access_token": token
      }

      return this.post(Endpoints.SOCIAL_LOGIN, body).pipe(switchMap(user => {
        console.log(user)
        if (user.api_status == 200) {
          this.setUser(user);
          // localStorage.setItem('user', JSON.stringify(user));
          return of(user);
        }
        else {
          return throwError(user);
        }
      }))

    }

  }
  // used for getting lat and lng
  callLatLng(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  // used for signup user
  signUp(user): Observable<any> {
    // await this.callLatLng().then(data => { console.log(data); this.location = data }).catch(err => { this.location = { lng: '', lat: '' } });


    let body;
    body = {
      'email': user.email,
      'confirm_password': user.confirmpassword,
      'password': user.password,
      'username': user.username,
      'firstname': user.firstname,
      'lastname': user.lastname,
      'address': user.city + ", " + user.country,
      'avatar': user.image

    }

    return this.post(Endpoints.CREATE_ACCOUNT, body).pipe(exhaustMap((data: any) => {
      if (data.api_status == 220) {
        console.log(data);

        return of(data);
      }
      else {
        console.log(data);
        // throw new Error(data);
        return throwError(data);
      }
    }))


  }
  //used for signin user
  SignIn(logininfo) {


    let body;
    body = {
      "username": logininfo.username,
      'password': logininfo.password
    }

    return this.post(Endpoints.AUTHENTICATION, body).pipe(exhaustMap((user: any) => {
      if (user.api_status == 200) {

        this.setUser(user);

        return of(user);
      }
      else {
        // console.log(user);

        return throwError(user);
      }
    }))


  }

  //used for Loggingout user
  logOut(): void {

    localStorage.removeItem('user');
    this.user$.next(null);
    this.locationService.CurrentLocation$.next(null);
    localStorage.removeItem('currentLocation')
    this.route.navigateByUrl(`/${Path.Home}`)
  }

  //used for initalizing user
  setUser(user): void {
    localStorage.setItem("user", JSON.stringify(user));
    this.user$.next(user);
  }
  //used for checking weather user is logged in or not
  checkUser(): Boolean {
    return !!localStorage.getItem('user');
  }
  //used for initalizing the user when user returned back to application
  initalizeUser(): void {
    this.user$.next(JSON.parse(localStorage.getItem('user')));
  }

  //used for opening signin modal popup
  loginPopUpOpen(): void {
    this.openloginmodal$.next(true);
  }

  //used for closing signin modal popup

  loginPopUpClose(): void {
    this.openloginmodal$.next(false);
  }
}
