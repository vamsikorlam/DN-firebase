import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/@core/services/auth.service';
import { LocationServiceService } from 'src/app/@core/services/location-service.service';
import { LocalStorageService } from "src/app/@core/utils/local-storage.service";
import { Observable, Subscription } from "rxjs";
import { StorageItem } from "../../@core/utils";
import { SideNavService } from '../side-nav/side-nav.service';
import {DataService} from "../../@core/services/data.service";

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  searchWord = ''
  searchLocation: string;
  closeDrop = false;
  productSearchHistory = [];
  locationSearchHistory = [];
  Subscriptions: Subscription[] = [];
  @Output() closeHeaderSearch = new EventEmitter<any>();
  @ViewChild('dropdownLocation') dropDownLocation: ElementRef
  // subscription variable
  queryParamsMapSubscription: Subscription = null;

  currentLocation: string;
  constructor(private router: Router, private authService: AuthService,
              private locationServiceService: LocationServiceService, private elementRef: ElementRef,
              private localStorage: LocalStorageService, private route: ActivatedRoute,
              private sidenavService: SideNavService, private dataService: DataService) { }



  ngOnInit(): void {
    console.log('called');
    let subscription1;
    this.getLatLng();
    this.subscribeToLocalStorageChanges();
    this.productSearchHistory = this.localStorage.getSearchHistory(StorageItem.PRODUCT_SEARCH_HISTORY);
    this.locationSearchHistory = this.localStorage.getSearchHistory(StorageItem.LOCATION_SEARCH_HISTORY);
    subscription1 = this.locationServiceService.CurrentLocation$.subscribe((currentLocation) => {
      console.log(currentLocation)
      if (currentLocation) {
        this.currentLocation = currentLocation;
        const tempArr = currentLocation.formatedAddress.split(',')
        this.searchLocation = `${tempArr[tempArr.length - 3]}, ${tempArr[tempArr.length - 2]}, ${tempArr[tempArr.length - 1]}`
      }
    })
    this.Subscriptions.push(subscription1);

    this.subscribeToQueryParams();
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event): void {
    if (this.closeDrop) {
      this.closeDrop = false;
    }
    this.sidenavService.hideMobileFooter();
    this.sidenavService.hideMobileProductdetailFooter();
  }

  subscribeToQueryParams(): void {
    this.queryParamsMapSubscription = this.route.queryParamMap.subscribe(paramsAsMap => {
      // add all the things sent from the query params here
      if (paramsAsMap.get('searchWord')) {
        this.searchWord = paramsAsMap.get('searchWord');
      }
    })
    this.Subscriptions.push(this.queryParamsMapSubscription)
  }

  public handleAddressChange(address: any): void {
    // setting address from API to local variable
    this.searchLocation = address.formatedAddress;
    const input = {
      name: address.name,
      formatedAddress: address.formatted_address,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
    this.localStorage.setSearchHistory(StorageItem.LOCATION_SEARCH_HISTORY, input);
    this.locationServiceService.setCurrentLocationCoordinates(address.geometry.location.lat(), address.geometry.location.lng(), input.formatedAddress)
    this.searchLocation = input.formatedAddress
  }

  getLatLng(): void {
    this.authService.callLatLng().then((latLng) => {
      this.locationServiceService.getLocationFromLatLng(latLng);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSearchChange(term): void {
    if (term.toString().trim().length > 0) {
      // this pushes the input value into the service's Observable.
      this.dataService.searchTerm.next(term);
      this.searchWord = term;
      this.localStorage.setSearchHistory(StorageItem.PRODUCT_SEARCH_HISTORY, term);
      this.router.navigate(['product/product-search'], { queryParams: { searchWord: term } })
    }
  }
  hide(): boolean {
    this.closeDrop = !this.closeDrop;
    return this.closeDrop
  }
  close(): void {
    this.closeDrop = false;
  }

  setSearchLocation(location): void {
    this.searchLocation = location.name
    console.log("before settng lat long line 108", location);
    this.locationServiceService.setCurrentLocationCoordinates(location.lat, location.lng, this.searchLocation)
  }

  /**
   * clears searchWord
   */
  public clearSearch() {
    this.searchWord = '';
  }

  clearSearchHistory(): void {
    this.localStorage.clearSearchHistory(StorageItem.PRODUCT_SEARCH_HISTORY);
    this.productSearchHistory.length = 0
  }

  clearLocationSearchHistory(): void {
    this.localStorage.clearSearchHistory(StorageItem.LOCATION_SEARCH_HISTORY);
  }

  subscribeToLocalStorageChanges(): void {
    let subscription;
    subscription =
      this.localStorage._myData$.subscribe(stored => {
        if (stored) {
          if (stored.key === StorageItem.PRODUCT_SEARCH_HISTORY) {
            console.log(stored)
          }
          else if (stored.key === StorageItem.LOCATION_SEARCH_HISTORY)
            this.locationSearchHistory = this.localStorage.getSearchHistory(StorageItem.LOCATION_SEARCH_HISTORY)
          console.log("line 123", this.locationSearchHistory)
        }
      });
    this.Subscriptions.push(subscription);
  }

  checkLocationSearch(): boolean {
    if (this.locationSearchHistory) {
      return this.locationSearchHistory.length > 0;
    }
    return false
  }

  closeComponent(): void {
    this.closeHeaderSearch.emit(0);
  }

  ngOnDestroy(): void {
    // if (this.locationServiceService.CurrentLocation$) {
    //   this.locationServiceService.CurrentLocation$.unsubscribe();
    // }
    // if (this.localStorage._myData$) {
    //   this.localStorage._myData$.unsubscribe();
    // }
    this.Subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    // if (this.queryParamsMapSubscription) {
    //   this.queryParamsMapSubscription.unsubscribe();
    // }
  }
}
