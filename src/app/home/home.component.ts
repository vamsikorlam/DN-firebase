import { Component, isDevMode, OnDestroy, OnInit } from '@angular/core';
import { Path } from '../@core/structs';
import { ProductsService } from '../@core/services/products.service';
import { CommunitiesService } from '../@core/services/communities.service';
import { AuthService } from '../@core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ConstantsEnum } from '../@core/structs/constants.enum';
import { AfterViewInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LocationServiceService } from '../@core/services/location-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CommingSoonComponent } from '../shared/modalpopups/comming-soon/comming-soon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  isMobile = false;
  productsLoading = false;
  communityLoading = false;
  path = Path;
  productCategories = [];
  products = [];
  communities = [];
  communitiesrecommended = [];
  lat = 0;
  long = 0;
  user = null;
  viewMoreClicked = false;
  userLoggedIn$: Observable<any> = null;
  userSubscription: Subscription = null;
  coordinatesSubscription: Subscription = null;
  myCommunitiesClicked = false
  defaultImage = ConstantsEnum.DEFAULT_IMAGE;
  isOnInit = false;
  constructor(private router: Router, private productService: ProductsService,
    private communitiesService: CommunitiesService,
    private authService: AuthService,
    public breakpointObserver: BreakpointObserver,
    private locationService: LocationServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isOnInit = true;
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
    this.getProductCategories();
    this.userLoggedIn$ = this.authService.userObservable$
    this.subscribeToUserLoginStatus()
    this.subscribeToCoordinates()
    this.initDataRequests();
    this.isOnInit = false;
  }

  ngAfterViewInit(): void { }

  initDataRequests(): void {
    // this.getProducts();
    if (this.user) {
      this.getMyCommunities();
    } else {
      this.getRecommendedCommunities();
    }
  }

  getProductCategories(): void {
    this.productService.getProductCategories('popularity').subscribe((response) => {
      this.productCategories = response.categories
      for (const prodCategory of this.productCategories) {
        prodCategory.image_path = `${Path.S3Path}${prodCategory.category_image_path}`
      }
    })
  }
  getProducts(): void {
    this.productsLoading = true;
    this.productService.getProducts(this.lat, this.long, 1, 8).subscribe((response) => {
      this.productsLoading = false;
      this.products = response.products;
    })
  }

  subscribeToUserLoginStatus(): void {
    this.userSubscription = this.userLoggedIn$.subscribe(user => {
      this.user = user
      if (user && !this.isOnInit) {
        this.getMyCommunities();
      }
    })
  }

  subscribeToCoordinates(): void {
    this.coordinatesSubscription = this.locationService.getCurrentLocationCoordinates().subscribe(res => {
      if (res) {
        this.lat = res.lat
        this.long = res.lng
        this.getProducts();
        // No need to check user session to get recommended communities.
        this.getRecommendedCommunities();
      }
    })
  }

  getMyCommunities(): void {
    this.myCommunitiesClicked = true
    this.communityLoading = true;
    this.communitiesService.getMyCommunities(1, 8).subscribe((response) => {
      this.communityLoading = false;
      this.communities = response.groups;
    },
      (err) => {
        if (isDevMode())
          console.log(err);
        this.communityLoading = false;
      })
  }

  getRecommendedCommunities(): void {
    this.communityLoading = true;
    this.communitiesService.getRecommendedCommunities(this.lat, this.long, 1, 8).subscribe((response) => {
      this.communityLoading = false;
      this.communitiesrecommended = response.recommended_groups
    },
      (err) => {
        if (isDevMode())
          console.log(err);
        this.communityLoading = false;
      })
  }

  getUserLocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position) {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.locationService.setCurrentLocationCoordinates(this.lat, this.long, '');
        this.getProducts();
      }
    },
      (err) => {
        if (isDevMode())
          console.log(err);
      }, { timeout: 10000 });
  }

  openModal(): void {
    this.authService.loginPopUpOpen();
  }

  navigateToCommunities(communityId: number): void {
    if (this.authService.checkUser()) {
      this.router.navigateByUrl(`/${Path.Community}/${Path.CommunityDetail}/${communityId}`);
    } else {
      this.openModal();
    }
  }

  openProductDetailsPage(productId: string): void {
    this.router.navigate(['product/product-details', productId])
  }

  onCategorySelection(categoryId): void {
    this.router.navigate(['product/product-search'], { queryParams: { categoryId } })
  }

  onClickViewAllProds(): void {
    this.router.navigate(['product/product-search'])
  }

  navigateToCommunity(): void {
    this.router.navigate(['/community'])
  }

  navigateToMapView(): void {
    this.router.navigate(['/map-view'])
  }
  openDialogComingsoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
    if (this.coordinatesSubscription) {
      this.coordinatesSubscription.unsubscribe()
    }
  }
}

