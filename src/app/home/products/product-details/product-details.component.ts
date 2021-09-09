import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { ProductsService } from 'src/app/@core/services/products.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HeaderFooterSharedService } from 'src/app/@core/services/header-footer-shared.service';
// import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
// import { MatDialog } from '@angular/material/dialog';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { SideNavService } from 'src/app/header/side-nav/side-nav.service';
import { ConstantsEnum } from 'src/app/@core/structs/constants.enum';
import { SocialShareComponent } from 'src/app/shared/modalpopups/social-share/social-share.component';
import { DataService } from '../../../@core/services/data.service';
import { Path } from 'src/app/@core/structs';
import { LocationServiceService } from 'src/app/@core/services/location-service.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss', '../../home.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  isMobile = false
  productId: number;
  product: any;
  isGood = false;
  imgList = []
  rating = 3;
  starCount = 2;
  isLiked = false
  contactSellerButtonClicked = 0;
  placeOrderButtonClicked = 0;
  user = null
  isLoading = true;
  userDetailsisLoading = true;
  similarProducts = [];
  similarProductsNotFound = '';
  spinnerColor = "#869658";
  lat: number;
  lng: number;

  open = 0;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 3,
    "dots": false,
    "infinite": false,

    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 767,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 550,
        "settings": {
          "slidesToShow": 1.5,
          "slidesToScroll": 1
        }
      }
    ]
  };

  // mobileSlideConfig = {
  //   "slidesToShow": 2,
  //   "slidesToScroll": 1,
  //   "dots": false,
  //   "infinite": false
  // }

  /*starColor = StarRatingColor.primary;*/
  availabilityDays = [{ text: 'MON', id: 'M', isAvailable: false }, { text: 'TUE', id: 'T', isAvailable: false }, { text: 'WED', id: 'W', isAvailable: false }, { text: 'THU', id: 'Th', isAvailable: false }, { text: 'FRI', id: 'F', isAvailable: false }, { text: 'SAT', id: 'Sa', isAvailable: false }, { text: 'SUN', id: 'S', isAvailable: false }]
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private headerFooterSharedService: HeaderFooterSharedService,
    private dialog: MatDialog,
    private sidenavService: SideNavService,
    private dataService: DataService,
    private locationService: LocationServiceService) {
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.headerFooterSharedService.setHeaderFooterControl(true, false);
        } else {
          this.isMobile = false;
        }
      });

    this.authService.user$.subscribe(user => { this.user = user; console.log("this user", this.user) });
    this.userDetailsisLoading = true;
    this.productId = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productsService.getProductDetails(this.productId).subscribe(res => {
      console.log(res);
      this.product = res.product_details
      this.isLiked = this.product.Is_Liked
      if (this.product.product.Product_Type == 1) {
        this.isGood = true
      }
      this.fillAvailabilityDays()
      this.imgList = this.product.product.Images_List
      console.log("this is product obj ", this.product)
      console.log("this is product obj LIKED", this.isLiked);
      this.userDetailsisLoading = false;
      this.locationService.getCurrentLocationCoordinates().subscribe((result: { lat: number, lng: number }) => {
        if (result) {
          this.lat = result.lat;
          this.lng = result.lng
        }
        else {
          this.lat = undefined;
          this.lng = undefined;
        }
        this.isLoading = true;
        this.getSimilarProducts();

      })
    })

    this.sidenavService.hideMobileFooterProductDetail$.subscribe((value: any) => {

      if (!value) {
        this.placeOrderButtonClicked = 0;
        this.contactSellerButtonClicked = 0;
      }

    })
  }

  ngAfterViewInit() {
  }

  getSimilarProducts(): void {
    this.productsService.getSimilarProducts(this.productId, this.lat, this.lng).subscribe(res => {
      console.log(res);
      if (res.api_status == '400') {

        this.similarProductsNotFound = "No products found, please try with another location"
      }
      else {
        this.similarProductsNotFound = '';
        this.similarProducts = res.product_details.products;


      }
      this.isLoading = false
    })
  }


  fillAvailabilityDays() {
    let availableDaysArr = this.product.product.Days.split(',')
    this.availabilityDays.forEach(day => {
      if (availableDaysArr.includes(day.id)) {
        day.isAvailable = true
      }
    })
    return true
  }

  customParseInt(val) {
    return parseInt(val)
  }


  onRatingChanged(event): void {
    console.log(event)
  }

  likeProduct() {
    if (this.user) {
      this.productsService.likeProduct(this.productId).subscribe(res => {

        console.log("liked value 1", this.isLiked, res)
        this.isLiked = !this.isLiked
        console.log("liked value 2", this.isLiked)
      })
    }
    else {
      this.openModal()
    }
  }

  openModal(): void {
    this.authService.loginPopUpOpen();
  }

  contactSellerClicked() {
    if (this.user) {
      this.placeOrderButtonClicked = 0
      if (this.contactSellerButtonClicked == 1) {
        this.contactSellerButtonClicked = 0
      }
      else {
        this.contactSellerButtonClicked = 1
      }
    }
    else {
      this.openModal()
    }
  }

  placeOrderClicked() {
    if (this.user) {
      this.contactSellerButtonClicked = 0
      if (this.placeOrderButtonClicked == 1) {
        this.placeOrderButtonClicked = 0
      }
      else {
        this.placeOrderButtonClicked = 1
      }
    }
    else {
      this.openModal()
    }
  }

  sliderClick(prodId) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['product/product-details', prodId]);
    });
    // this.router.navigate(['product/product-details', prodId])
  }

  slickInit(e) {
    console.log('slick initialized');
    if (this.similarProducts.length > 0) {
      var product = this.similarProducts[e.slick.currentSlide];
      // if (product) {
      //   this.sliderClick(product);
      // }
    }
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  getSmallString(s: string) {
    if (s.length > 50) {
      return s.substring(0, 50) + "..."
    }
    else {
      return s
    }
  }

  otherProfile() {
    console.log("hello");
    console.log(this.product.User_Id);
    this.router.navigate(['product/other-profile'], { queryParams: { userId: this.product.User_Id } });
  }

  navigateToCommunitySearch(searchWord): void {
    console.log(searchWord);
    this.router.navigate([`${Path.Product}/${Path.ProductSearch}`], { queryParams: { searchWord: searchWord } })
  }

  afterChange(e) {
    console.log('afterChange');
    if (this.similarProducts.length > 0) {
      var product = this.similarProducts[e.currentSlide];
      // if (product) {
      //   this.sliderClick(product);
      // }
    }
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  openDialogComingsoon() {
    console.log('called');
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  socialShareOpen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.maxWidth = '100vw'
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    this.dialog.open(SocialShareComponent, dialogConfig);
  }

  getDefaultImage() {
    return ConstantsEnum.DEFAULT_IMAGE;
  }

  close() {
    this.placeOrderButtonClicked = 0;
  }

  routeToProductList(term): void {
    if (term && term.length > 0) {
      // this pushes the input value into the service's Observable.
      this.dataService.searchTerm.next(term);
      this.router.navigate(['product/product-search'], { queryParams: { searchWord: term } })
    }
  }
  ngOnDestroy(): void {
  }
}
