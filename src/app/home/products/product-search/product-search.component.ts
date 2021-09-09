import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/@core/services/products.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Options, ChangeContext } from '@angular-slider/ngx-slider';
import { HeaderFooterSharedService } from 'src/app/@core/services/header-footer-shared.service';
import { MatDialog } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { reArrangeTheSortingOrder, reArrangeTheSortingOrderWithArray, scrollToTop } from '../../../utils/utils';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LocalStorageService } from '../../../@core/utils/local-storage.service';
import { LocationServiceService } from 'src/app/@core/services/location-service.service';
import { DataService } from '../../../@core/services/data.service';

type productFilter = {
  lat?: number, lng?: number, pageNo?: number,
  limit?: number, milesSelected?: string[],
  order?: string, orderdir?: 'asc' | 'desc', keyword?: string,
  category_id?: number, price_min?: number, price_max?: number,
  skillsSelected?: string[], goodsSelected?: string[],
  searchLocation?: string
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss', './product-search-mobile.component.scss']
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  isMobile = false
  searchWord = ''
  searchCategoryId = null
  milesSelected: number = null
  products = []
  productCategories = []
  productCategoriesCopy = [];
  skillCategories = []
  skillCategoriesCopy = [];
  checkedproductCategories = []
  checkedskillCategories: string[] = []
  lat = 17.4358528
  lng = 78.44003839999999
  priceValue = 1
  miles: number[] = [10, 20, 30, 40]; // list of miles
  minPrice = 0;
  maxPrice = 9999;
  sliderOptions: Options = {
    floor: this.minPrice,
    ceil: this.maxPrice,
    step: 10,
    getTickColor: (value: number) => {
      return '#eaeaea';
    },
    getPointerColor: (value: number) => {
      return '#eaeaea';
    },
    getSelectionBarColor: (minValue: number, maxValue: number) => {
      return '#869658'
    },
    translate: (value: number): string => {
      return ``;
    }
  }
  productsLoaded = false;
  totalProducts = 0; // total no of products matching the filter
  expandSkillsFilterSection = false;
  expandGoodsFilterSection = false;
  pageNo = 1;
  itemsLength = 36;
  categories = [];
  orderdir: 'asc' | 'desc' = 'desc';

  // subscription variabled
  queryParamsMapSubscription: Subscription = null;
  showMobileFilterScreen = false
  coordinatesSubscription: Subscription = null;
  headerLat: number = null;
  headerLng: number = null;
  filterLat: number = null;
  filterLng: number = null;
  isOnInit = false;
  searchLocation = '';
  searchTermSubscription;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private headerFooterSharedService: HeaderFooterSharedService,
    private localStorage: LocalStorageService,
    private locationService: LocationServiceService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.isOnInit = true;
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.headerFooterSharedService.setHeaderFooterControl(true, false);
          this.itemsLength = 35;

        } else {
          this.isMobile = false;
          this.itemsLength = 36;
        }

      });
    if (this.route.snapshot.queryParams.searchWord) {
      this.searchWord = this.route.snapshot.queryParams.searchWord
    }
    if (this.route.snapshot.queryParams.categoryId) {
      this.searchCategoryId = this.route.snapshot.queryParams.searchCategoryId
    }
    this.initPreviousFilter();
    this.subscribeToCoordinates();
    this.subscribeToQueryParams();
    this.subscribeHeaderSearchTerm();
    this.productService.getProductCategories('').subscribe(res => {
      console.log('productservice')
      this.productCategories = res.categories;
      this.productCategoriesCopy = this.productCategories.slice();
      this.productCategories = reArrangeTheSortingOrder(this.productCategories, 'category_id', this.searchCategoryId);
    })
    this.productService.getSkillsCategories('categories').subscribe(res => {
      console.log('skill')
      this.skillCategories = res.categories
      this.skillCategoriesCopy = this.skillCategories.slice();
      this.skillCategories = reArrangeTheSortingOrder(this.skillCategories, 'category_id', this.searchCategoryId);
    })
    this.searchProducts();
    this.isOnInit = false;
  }

  initPreviousFilter(): void {
    console.log('initfilter')
    const filter = this.dataService.getProductFilter();
    if (filter) {
      this.lat = filter.lat;
      this.lng = filter.lng;
      this.orderdir = filter.orderdir;
      this.minPrice = filter.price_min;
      this.maxPrice = filter.price_max;
      this.milesSelected = filter.milesSelected ? Number(filter.milesSelected[0]) : 40;
      this.checkedskillCategories = filter.skillsSelected ? filter.skillsSelected : [];
      this.checkedproductCategories = filter.goodsSelected ? filter.goodsSelected : [];
      this.searchLocation = filter.searchLocation;
      if (this.checkedproductCategories && this.checkedproductCategories.length > 0)
        this.productCategories = reArrangeTheSortingOrderWithArray(this.productCategories, 'category_id', this.checkedproductCategories);
      if (this.checkedskillCategories && this.checkedskillCategories.length > 0)
        this.skillCategories = reArrangeTheSortingOrderWithArray(this.skillCategories, 'category_id', this.checkedskillCategories);
    }
  }
  subscribeHeaderSearchTerm(): void {
    this.searchTermSubscription = this.dataService.searchTerm.subscribe((newValue: string) => {
      if (newValue) {
        this.searchWord = newValue || '';
        this.searchProducts();
      }
    })
  }
  subscribeToQueryParams(): void {

    this.queryParamsMapSubscription = this.route.queryParamMap.subscribe(paramsAsMap => {
      // add all the things sent from the query params here
      console.log('queryparams')
      this.searchWord = paramsAsMap.get('searchWord');
      console.log("line 131 ", this.searchWord)
      this.searchCategoryId = paramsAsMap.get('categoryId');
      this.checkedproductCategories = [];
      if (this.searchCategoryId) {
        this.checkedproductCategories.push(paramsAsMap.get('categoryId'));
        this.productCategories = reArrangeTheSortingOrder(this.productCategories, 'category_id', paramsAsMap.get('categoryId'));
      }
      this.pageNo = 1;
      if (!this.isOnInit)
        this.searchProducts();
    })
  }

  subscribeToCoordinates(): void {

    this.coordinatesSubscription = this.locationService.getCurrentLocationCoordinates().subscribe(res => {
      console.log('subscribetocoordinate')
      if (res) {
        this.headerLat = res.lat;
        this.headerLng = res.lng;
        if (this.filterLat && this.filterLng) {
          this.lat = this.filterLat;
          this.lng = this.filterLng;
        } else {
          this.lat = res.lat;
          this.lng = res.lng;
          if (!this.isOnInit)
            this.searchProducts()
        }
      }
    })
  }

  resetFilter(): void {
    this.pageNo = 1;
    this.maxPrice = 9999;
    this.minPrice = 0;
    this.searchCategoryId = null;
    this.milesSelected = null;
    this.checkedproductCategories = [];
    this.checkedskillCategories = [];
    this.searchProducts();
  }

  applyFilter(): void {
    this.pageNo = 1;
    this.searchProducts();
  }

  showMoreSkills(show: boolean): void {
    this.expandSkillsFilterSection = show;
  }

  showMoreGoods(show: boolean): void {
    this.expandGoodsFilterSection = show;
  }

  showAllSkills(ob: MatCheckboxChange): void {
    if (ob.checked) {
      this.checkedskillCategories = this.productCategories.map(item => item.category_id);
    } else {
      if (this.checkedskillCategories?.length === this.productCategories?.length) {
        this.checkedskillCategories = [];
      }
    }
  }

  searchProducts(): void {
    console.log('searchproduct')
    console.log(this.searchWord)
    const filter: productFilter = {
      pageNo: this.pageNo,
      orderdir: this.orderdir,
      order: 'time',
      limit: this.itemsLength,
    };



    // keyword search
    if (this.searchWord) {
      filter.keyword = this.searchWord;
    }

    // category filter
    /*if (this.searchCategoryId) {
      filter.category_id = this.searchCategoryId;
    }*/

    // miles filter
    // const miles = Object.keys(this.milesSelected).filter(mile => this.milesSelected[mile]);
    if (this.milesSelected) {
      filter.milesSelected = [this.milesSelected.toString()];
    }

    // price filters
    filter.price_min = this.minPrice;
    filter.price_max = this.maxPrice;

    // skill & goods filters
    if (this.checkedskillCategories?.length > 0) {
      filter.skillsSelected = this.checkedskillCategories;
    }

    if (this.checkedproductCategories?.length > 0) {
      filter.goodsSelected = this.checkedproductCategories;
    }
    if (this.lat)
      filter.lat = this.lat;
    if (this.lng)
      filter.lng = this.lng;
    this.productsLoaded = false;
    this.products = [];
    scrollToTop();
    this.totalProducts = 0;
    filter.searchLocation = this.searchLocation;
    this.dataService.setProductFilter(filter);
    this.productService.searchProducts(filter).subscribe(res => {
      this.productsLoaded = true;
      if (res?.api_status === 200 && res?.products) {
        if (res.products.length > 0) {// first time loading
          this.totalProducts = res.products[0].totalRecords;
        }
        this.products = res.products;
      } else {
        this.products = [];
      }
    })
  }

  applySkill(ob: MatCheckboxChange, catId: string): void {
    if (ob.checked) {
      this.checkedskillCategories.push(catId)
      this.skillCategories = reArrangeTheSortingOrder(this.skillCategories, 'category_id', catId);
    } else {
      this.skillCategories = this.skillCategoriesCopy.slice();
      this.checkedskillCategories.forEach((value, index) => {
        if (value === catId) this.checkedskillCategories.splice(index, 1);
      });
    }
    this.searchProducts();
  }

  sortOrderChanged(order): void {
    this.orderdir = order;
    // we should add logic on existing products array for sorting, no need to call API again
  }

  skillButtonClicked(catId: string): void {
    if (!this.checkedskillCategories.includes(catId)) {
      this.checkedskillCategories.push(catId)
    } else {
      this.checkedskillCategories.forEach((value, index) => {
        if (value === catId) this.checkedskillCategories.splice(index, 1);
      });
    }
    this.searchProducts();
  }

  goodsButtonClicked(catId: string): void {
    if (!this.checkedproductCategories.includes(catId)) {
      this.checkedproductCategories.push(catId)
    } else {
      this.checkedproductCategories.forEach((value, index) => {
        if (value === catId) this.checkedproductCategories.splice(index, 1);
      });
    }
    this.searchProducts();
  }


  showAllGoods(ob: MatCheckboxChange): void {
    if (ob.checked) {
      this.checkedproductCategories = this.skillCategories.map(item => item.category_id);
    } else {
      if (this.checkedproductCategories?.length === this.skillCategories?.length) {
        this.checkedproductCategories = [];
      }
    }
    this.searchProducts();
  }

  applyGood(ob: MatCheckboxChange, catId: string): void {
    if (ob.checked) {
      this.checkedproductCategories.push(catId)
      this.productCategories = reArrangeTheSortingOrder(this.productCategories, 'category_id', catId);
    } else {
      this.productCategories = this.productCategoriesCopy.slice();
      this.checkedproductCategories.forEach((value, index) => {
        if (value === catId) this.checkedproductCategories.splice(index, 1);
      });
    }
    this.searchProducts();
  }

  openProductDetailsPage(productId: string): void {
    this.router.navigate(['product/product-details', productId])
  }

  onPriceChange(event: MatSliderChange): void {
    this.priceValue = event.value
    this.searchProducts();
  }

  onUserChange(changeContext: ChangeContext): void {
    console.log(changeContext.value);
    console.log(changeContext.highValue);
  }

  milesButtonClicked(val): void {
    this.milesSelected = val
    this.searchProducts();
  }

  getPage(page: number): void {
    this.pageNo = page;
    this.searchProducts();
  }

  ngOnDestroy(): void {
    if (this.queryParamsMapSubscription) {
      this.queryParamsMapSubscription.unsubscribe();
    }
    if (this.coordinatesSubscription) {
      this.coordinatesSubscription.unsubscribe();
    }
    if (this.searchTermSubscription)
      this.searchTermSubscription.unsubscribe();
    this.headerFooterSharedService.setHeaderFooterControl(true, true)
  }

  setShowMobileFilterScreen(val): void {
    this.headerFooterSharedService.setHeaderFooterControl(!val, !val)
    this.showMobileFilterScreen = val
  }

  openDialogComingsoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }
  public handleAddressChange(address: Address): void {
    // setting address from API to local variable
    if (address?.geometry?.location) {
      this.lat = address.geometry.location.lat();
      this.lng = address.geometry.location.lng();
      this.filterLat = this.lat;
      this.filterLng = this.lng;
      this.searchLocation = address.formatted_address;
    } else {
      this.filterLat = null;
      this.filterLng = null;
      this.lat = this.headerLat;
      this.lng = this.headerLng;
      this.searchLocation = '';
    }
    this.searchProducts();
  }
}
