import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommunitiesService } from 'src/app/@core/services/communities.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Path } from 'src/app/@core/structs/path.enum';
import { OnDestroy } from '@angular/core';
import { SideNavService } from 'src/app/header/side-nav/side-nav.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { ConstantsEnum } from '../../@core/structs/constants.enum';
import { HeaderFooterSharedService } from 'src/app/@core/services/header-footer-shared.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LocalStorageService } from "../../@core/utils/local-storage.service";
import { StorageItem } from "../../@core/utils";
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit, OnDestroy, AfterViewInit {

  currentData;
  buttonLeft = 'button-highlight';
  buttonRight = 'button-minimal';
  isLoading = false;
  innerWidth;
  isMobile: boolean;
  latitude: number;
  longitude: number;

  constructor(private communityService: CommunitiesService, private activatedRoute: ActivatedRoute, private router: Router, private headerService: SideNavService,
    private dialog: MatDialog, private headerFooterService: HeaderFooterSharedService,
    public breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    const location = this.localStorage.loadInfo(StorageItem.CURRENT_LOCATION);
    if (location) {
      this.latitude = location.lat;
      this.longitude = location.lng;
    }
    // console.log(this.activatedRoute.snapshot.queryParamMap.get('recommended'));
    if (this.activatedRoute.snapshot.queryParamMap.get('recommended'))
      this.swipeDataRecommend();

    this.getMyCommunities();
    this.headerService.showAndHideCommunity(true);
    this.innerWidth = window.innerWidth;
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
          this.headerService.showAndHideCommunityHeader(true);
          this.headerFooterService.setHeaderFooterControl(true, false)
        } else {
          this.isMobile = false;
          this.headerFooterService.setHeaderFooterControl(true, true)
        }
      });
  }

  ngAfterViewInit(): void {

  }

  getMyCommunities(): void {
    this.isLoading = true;
    this.communityService.getMyCommunities(1, ConstantsEnum.PAGE_LIMIT).subscribe((data) => {
      this.isLoading = false;
      this.currentData = data.groups;
    }, err => {
      console.log(err);
    });
  }

  getRecommendedCommunities(): void {
    this.isLoading = true;
    this.communityService.getRecommendedCommunities(this.latitude, this.longitude, 1, ConstantsEnum.PAGE_LIMIT).subscribe((data) => {
      this.isLoading = false;
      this.currentData = data.recommended_groups;
    }, err => {
      console.log(err);
    });
  }

  swipeDataCommunity(): void {
    this.buttonLeft = 'button-highlight';
    this.buttonRight = 'button-minimal';
    this.getMyCommunities();
  }

  swipeDataRecommend(): void {
    this.buttonLeft = 'button-minimal';
    this.buttonRight = 'button-highlight';
    this.getRecommendedCommunities();
  }

  navigateToCommunityDetail(communityId: number): void {
    this.router.navigateByUrl(`/${Path.Community}/${Path.CommunityDetail}/${communityId}`);
  }
  navigateToCommunitySearch(): void {
    this.router.navigateByUrl(`/${Path.Community}/${Path.CommunitySearch}`);
  }
  openDialogComingSoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  // closefilterpopover(): void {
  //   this.showHidePopOver = 0;
  // }
  // openfilterpopover(): void {

  //   this.showHidePopOver ? this.showHidePopOver = 0 : this.showHidePopOver = 1
  // }

  ngOnDestroy(): void {
    this.headerService.showAndHideCommunity(false);
    this.headerService.showAndHideCommunityHeader(false);
    this.headerFooterService.setHeaderFooterControl(true, true);
  }
}
