import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from './@core/services/auth.service';
import { HeaderFooterSharedService } from './@core/services/header-footer-shared.service';
import { SideNavService } from './header/side-nav/side-nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean = true;
  showFooter: boolean = true;
  headerFooterSubscription: Subscription = null;
  popOverCheck: boolean = false;
  showHideCommunitySearch: Boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private headerFooterSharedService: HeaderFooterSharedService,
    private sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
    if (this.authService.checkUser()) {
      this.authService.initalizeUser();
      this.runGlobalServices();
    }
    this.subscribeToHeaderFooterControls();
    this.sideNavService.showAndHideSearchCommunity$.pipe(delay(0)).subscribe((result) => {
      console.log(result);
      this.showHideCommunitySearch = result;
    })
  }



  private subscribeToHeaderFooterControls() {
    this.headerFooterSubscription = this.headerFooterSharedService.getHeaderFooterSharedObservable().pipe(delay(0)).subscribe((res) => {
      this.showFooter = res.showFooter;
      this.showHeader = res.showHeader;

    })
  }



  private runGlobalServices(): void {

    // console.log('running global')
    // this.communityService.getMyCommunities(1, 10).subscribe(community => { console.log(community) }, err => { console.log(err) });
    // this.communityService.getRecommendedCommunities('hyderabad').subscribe(recommended => { console.log(recommended) }, err => { console.log(err) });
    // Add global services here if any.
  }

  configWhenPopupOpen(event): void {
    console.log(event);
    event ? this.popOverCheck = true : this.popOverCheck = false;
    // this.popupOpen=true;

  }

  ngOnDestroy() {
    if (this.headerFooterSubscription) {
      this.headerFooterSubscription.unsubscribe()
    }
  }
}
