import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Path } from 'src/app/@core/structs';
import { ProductsService } from 'src/app/@core/services/products.service'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router'
import { LocationServiceService } from 'src/app/@core/services/location-service.service';
import { HeaderFooterSharedService } from 'src/app/@core/services/header-footer-shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss', '../home.component.scss', './mapmobile.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  isLoading = true;
  isMobile = false
  path = Path;
  products = [];
  latitude: any;
  longitude: any;
  zoom = 10;
  recordsPerPage = 15;
  // Radius
  radius = 20000;
  radiusLat = 0;
  radiusLong = 0;

  openedWindow = 0;
  infoWindowOpened = null;
  previous_info_window = null;
  @ViewChild('slickModal')
  public slickModal: any;
  isSliderEvent = true;
  //Slide
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": false,
    "infinite": false,
    "responsive": [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 425,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      },
    ]
  };
  slideConfig2 = {
    "slidesToShow": 4,
    "slidesToScroll": 3,
    "dots": false,
    "infinite": false,
    "prevArrow": false,
    "nextArrow": false,
    "responsive": [

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      }
    ]
  };



  constructor(private productService: ProductsService,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private locationService: LocationServiceService,
    private headerFooterSharedService: HeaderFooterSharedService) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.headerFooterSharedService.setHeaderFooterControl(true, false);
        } else {
          this.headerFooterSharedService.setHeaderFooterControl(true, true);
        }
      });
    this.subscribeToLocation();
  }

  subscribeToLocation(): void {
    this.locationService.getCurrentLocationCoordinates().subscribe(res => {
      if (res) {
        this.latitude = res.lat
        this.longitude = res.lng
        this.bindProducts(1, false);
      }
    })
  }

  setLatLong(item) {
    this.latitude = Number(item.lat);
    this.longitude = Number(item.lng);
    this.zoom = 10;
    this.openWindow(item.id);
  }

  slickInit(e) {
    console.log('slick initialized');
    if (this.products.length > 0) {
      var product = this.products[e.slick.currentSlide];
      if (product) {
        this.setLatLong(product);
      }
    }
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
    if (this.products.length > 0 && this.isSliderEvent) {
      var product = this.products[e.currentSlide];
      if (product) {
        this.setLatLong(product);
      }
      var checkProducts = this.products[e.currentSlide + 1]
      if (!checkProducts) {
        var pageNo = ((e.currentSlide + 5) / this.recordsPerPage) + 1;
        this.bindProducts(pageNo);
      }
    }
    this.isSliderEvent = true;
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  bindProducts(pageNo, addToExist = true) {
    if (!addToExist) {
      this.isLoading = true;
    }
    this.productService.getProducts(this.latitude, this.longitude, pageNo, this.recordsPerPage).subscribe((response) => {
      console.log(response.products);
      if (response.products) {

        if (addToExist) {
          Array.prototype.push.apply(this.products, response.products);
        }
        else {
          this.products = response.products
          this.isLoading = false;
          // console.log(response);
          // console.log(this.isLoading, this.products);
          var product = this.products[0];
          if (product) {
            this.setLatLong(product);
          }
        }

      }
      else {
        console.log("else block")
        this.products = [];
        console.log(this.products.length)
        this.isLoading = false;
      }
    })
  }

  openWindow(id) {
    this.openedWindow = id;
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  selectMarker(id, infoWindow) {
    if (this.slickModal) {
      let index = this.products.findIndex(x => x.id === id);
      this.slickModal.slickGoTo(index);
      this.isSliderEvent = false;
    }
    this.openedWindow = id;
    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previous_info_window.close()
    }
    this.previous_info_window = infoWindow;
  }

  openProductDetailsPage(productId: string) {
    this.router.navigate(['product/product-details', productId])
  }
  ngOnDestroy(): void {
    this.headerFooterSharedService.setHeaderFooterControl(true, true);
  }
}