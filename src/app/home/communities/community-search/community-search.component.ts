import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '../../../@core/structs';
import { CommunitiesService } from '../../../@core/services/communities.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { StorageItem } from '../../../@core/utils';
import { LocalStorageService } from '../../../@core/utils/local-storage.service';
import { scrollToTop } from '../../../utils/utils';
import { DataService } from '../../../@core/services/data.service';
import { CommunityFilter } from '../../../@core/guards/type.guard';
import { LocationServiceService } from '../../../@core/services/location-service.service';
import { SideNavService } from '../../../header/side-nav/side-nav.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
@Component({
  selector: 'app-community-search',
  templateUrl: './community-search.component.html',
  styleUrls: ['./community-search.component.scss']
})
export class CommunitySearchComponent implements OnInit, OnDestroy {
  isMobile = false
  communities: any[] = [];
  itemsLength = 20;
  totalProducts = 0;
  communitiesLoaded = false;
  acceptGlobalLocation = true;
  isOnInit = false;
  filter: CommunityFilter = {
    lat: null,
    lng: null,
    search: '',
    pageNo: 1,
    orderdir: 'desc',
    limit: 20,
    type: ''
  };
  searchLocation = '';
  searchTermSubscription;
  constructor(private router: Router, private communitiesService: CommunitiesService,
    private localStorage: LocalStorageService, private dataService: DataService,
    private route: ActivatedRoute, private locationService: LocationServiceService,
    private sideNavService: SideNavService, public breakpointObserver: BreakpointObserver, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        if (this.isMobile) {
          console.log('inside')
          this.filter.limit = 20;
        }
        else {
          this.filter.limit = 21;
        }
      });
    this.sideNavService.showAndHideCommunity(true);
    this.isOnInit = true;
    const location = this.localStorage.loadInfo(StorageItem.CURRENT_LOCATION);
    if (location) {
      this.filter.lat = location.lat;
      this.filter.lng = location.lng;
    }
    if (this.route.snapshot.queryParams.searchWord) {
      this.filter.search = this.route.snapshot.queryParams.searchWord || ''
    }
    const existingFilters = this.dataService.getCommunityFilter();
    if (existingFilters) {
      this.filter = existingFilters;
      this.searchLocation = existingFilters.searchLocation;
      this.acceptGlobalLocation = false;
    }
    this.subscribeToCoordinates();
    this.subscribeHeaderSearchTerm();
    this.searchCommunities(this.filter);
    this.isOnInit = false;

  }
  subscribeHeaderSearchTerm(): void {
    this.searchTermSubscription = this.dataService.searchTerm.subscribe((newValue: string) => {
      if (newValue) {
        this.filter.search = newValue || '';
        if (!this.isOnInit)
          this.searchCommunities(this.filter);
      }
    })
  }
  subscribeToCoordinates(): void {
    this.locationService.getCurrentLocationCoordinates().subscribe(res => {
      if (res && this.acceptGlobalLocation) {
        this.filter.lat = res.lat;
        this.filter.lng = res.lng;
        this.searchLocation = '';
      }
    })
  }

  defaultFilter(): CommunityFilter {
    return {
      lat: this.filter.lat,
      lng: this.filter.lng,
      search: '',
      pageNo: 1,
      orderdir: 'desc',
      limit: 20,
      type: ''
      /*order: 'time',
      milesSelected: 5,
      communityType: 'MY_COMMUNITY'*/
    }
  }

  /*milesButtonClicked(val): void {
    this.filter.milesSelected = val
  }*/
  sortOrderChanged(order): void {
    this.filter.orderdir = order;
  }
  /*communityTypeChanged(communityType): void {
    this.filter.communityType = communityType;
  }*/
  applyFilter(): void {
    this.filter.pageNo = 1;
    this.totalProducts = 0;
    this.searchCommunities(this.filter);
  }

  private searchCommunities(filter: CommunityFilter): void {
    this.communitiesLoaded = false;
    this.communities = [];
    scrollToTop();
    filter.searchLocation = this.searchLocation;
    this.dataService.setCommunityFilter(filter);
    this.communitiesService.searchOnAllCommunities(filter).subscribe((response) => {
      this.communitiesLoaded = true;
      this.communities = response.groups || [];
      if (this.communities && this.communities.length > 0)
        this.totalProducts = this.communities[0].totalRecords || 0;
    },
      (err) => { console.log(err) });
  }

  resetFilter(): void {
    this.totalProducts = 0;
    this.filter = this.defaultFilter();
    this.searchCommunities(this.filter);
  }
  openCommunityDetailsPage(communityId: string, community: any): void {

    if (!this.filter.type) {
      this.router.navigate([Path.Community + '/' + Path.CommunityDetail, communityId])
    }
    else {
      this.openDialogComingSoon();
    }


  }
  onPageChanged(page: number): void {
    this.filter.pageNo = page;
    this.searchCommunities(this.filter);
  }
  communityTypeChange(communityType): void {
    this.filter.type = communityType;
    this.filter.pageNo = 1;
    this.searchCommunities(this.filter);
  }
  public handleAddressChange(address: Address): void {
    // setting address from API to local variable
    this.filter.lat = address.geometry.location.lat();
    this.filter.lng = address.geometry.location.lng();
    this.searchLocation = address.formatted_address;
  }

  openDialogComingSoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  ngOnDestroy(): void {
    if (this.searchTermSubscription)
      this.searchTermSubscription.unsubscribe();
    this.sideNavService.showAndHideCommunity(false);
  }
}
