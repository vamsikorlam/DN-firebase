import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Path } from 'src/app/@core/structs';
import { SideNavService } from './side-nav/side-nav.service';
import { AuthService } from '../@core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideoTutorialsComponent } from './video-tutorials/video-tutorials.component';
import { CommingSoonComponent } from '../shared/modalpopups/comming-soon/comming-soon.component';
import { AfterViewInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { HeaderSearchComponent } from './header-search/header-search.component';
import { DataService } from '../@core/services/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() setBodyHeightWhenPopOverisOpened = new EventEmitter<any>();
  path = Path;
  user: any;
  showHideCommunitySearch = false;
  hideBottomHeader: boolean;
  searchWord = '';
  communitySearchTerm = '';
  openHeader = 0;
  openProfile = 0;
  isMobile: boolean;
  headerSearch: HeaderSearchComponent = null;
  mobileMapViewClicked = false;
  isOpen = false;

  @ViewChild('headerSearch')
  set headerSearchComponent(content: HeaderSearchComponent) {
    this.headerSearch = content;
  }


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private sideNavService: SideNavService,
    public breakpointObserver: BreakpointObserver, private dataService: DataService) {
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event): void {
    if (this.isOpen)
      this.isOpen = false;
    console.log(this.isOpen)
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.openHeader === 1) {
          this.openHeader = 0;
          this.setBodyHeightWhenPopOverisOpened.emit(0);
        }
        if (this.openProfile === 1) {
          this.openProfile = 0;
          this.setBodyHeightWhenPopOverisOpened.emit(0);
        }
        if (event.url !== '/' + Path.Community + '/' + Path.CommunitySearch) {
          this.communitySearchTerm = '';
          this.dataService.searchTerm.next(this.communitySearchTerm);
        }
        if (event.url !== '/' + Path.Map) {
          this.mobileMapViewClicked = false
        }
        this.isOpen = false;
        this.sideNavService.closeSideNav();
        // console.log(this.isOpen);
      }
    });

    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    this.sideNavService.showAndHideSearchCommunity$.pipe(delay(0)).subscribe((value) => {
      console.log('show hide community initialised');
      this.showHideCommunitySearch = value;
      // console.log(this.showHideCommunitySearch);
    });
    this.sideNavService.hideCommunityHeader$.pipe(delay(0)).subscribe((value) => {
      this.hideBottomHeader = value;
    });
  }

  ngAfterViewInit(): void { }

  toggleRightSidenav(): void {
    console.log('Clicked');
    this.sideNavService.triggerSideNav();
  }

  onClickSignOut(): void {
    this.authService.logOut();
    this.router.navigate(['/', Path.SignIn]);
  }

  openModal(): void {
    this.authService.loginPopUpOpen();
  }

  getUserProfile(): string {
    if (this.user) {
      return this.user.user_profile;
    }
    return 'assets/images/profile pic.png';
  }

  getCurrentLocation(): void {
    this.mobileMapViewClicked = true;
    this.router.navigate([Path.Map]);
    this.authService.callLatLng().then(latLng => {
      console.log(latLng);
    }).catch((error) => {
      console.log(error);
    });
  }

  navigateToLandingPage(): void {
    this.mobileMapViewClicked = false;
    this.router.navigate([Path.Home]);
  }

  onSearchChange(term): void {
    if (term.toString().trim().length > 0) {
      this.router.navigate(['product/product-search'], { queryParams: { searchWord: term } });
    }
  }

  onCommunitySearchChange(term): void {
    if (this.communitySearchTerm && this.communitySearchTerm.trim().length > 0) {
      this.dataService.searchTerm.next(this.communitySearchTerm);
      this.router.navigate(['community/community-search'], {});
    } else {
      this.dataService.searchTerm.next(this.communitySearchTerm);
    }
  }

  logoClicked(): void {
    if (this.headerSearch)
      this.headerSearch.clearSearch();
  }

  openVideo(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'videocustomization';
    this.dialog.open(VideoTutorialsComponent, dialogConfig);
  }

  openDialogComingsoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  openHeaderSearch(): void {
    console.log('called');
    this.openHeader = 1;
    this.setBodyHeightWhenPopOverisOpened.emit(1);
  }

  closeCurrentLocation(): void {
    this.openHeader = 0;
    this.setBodyHeightWhenPopOverisOpened.emit(0);
  }

  openProfilepopover(): void {
    if (this.user) {
      this.openProfile = 1;
      this.setBodyHeightWhenPopOverisOpened.emit(1);
    } else {
      this.authService.loginPopUpOpen();
    }
  }

  closeProfiletab(): void {
    this.openProfile = 0;
    this.setBodyHeightWhenPopOverisOpened.emit(0);
  }
  openwebProfilepopover(): void {
    this.isOpen ? this.isOpen = false : this.isOpen = true;
    console.log(this.isOpen)
  }
  // closepopover(): void {
  //   console.log("called");
  //   console.log(this.isOpen);
  //   this.isOpen ? this.isOpen = false : this.isOpen = true;

  // }
  // change(): void {

  //   this.isOpen = false;
  //   console.log(this.isOpen);
  // }
}
