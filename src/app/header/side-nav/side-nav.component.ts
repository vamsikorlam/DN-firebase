import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { SideNavService } from './side-nav.service';
import { AuthService } from 'src/app/@core/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { Router } from '@angular/router';
import { Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @ViewChild('drawer') public drawer: MatSidenav
  booleanValueForToggle = false;
  mobileQuery: MediaQueryList;
  user: any;


  private _mobileQueryListener: () => void;

  constructor(
    private sideNavService: SideNavService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private dialog: MatDialog,
    private router: Router,

    private authService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 425.98px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log('indside sidnav')
    this.sideNavService.sideNavTrigger.subscribe(
      () => {
        console.log('working..!');
        this.booleanValueForToggle = false;
        this.changeToggleValue();
        this.openSidenav();
      });
    this.sideNavService.sideNavCloseTrigger$.subscribe(
      () => {
        this.changeToggleValueToNormal();
      }
    )
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // if (this.openHeader == 1) {
        //   this.openHeader = 0;
        // }
        // if (this.openProfile == 1) {
        //   this.openProfile = 0;
        // }
        this.booleanValueForToggle = false

      }
    })

    // this.user = this.
    this.authService.user$.subscribe(user => { console.log(user); this.user = user })
  }



  openSidenav(): void {
    console.log('click');
    this.drawer.toggle();
  }
  changeToggleValue(): void {
    if (this.booleanValueForToggle) {
      this.booleanValueForToggle = false;
    }
    else {
      this.booleanValueForToggle = true;
    }

  }
  changeToggleValueToNormal(): void {
    console.log('change value called')
    if (this.booleanValueForToggle) {
      this.drawer.close();
      setTimeout(() => { this.booleanValueForToggle = false }, 300)
    }
  }

  closeSideNav() {
    this.drawer.close();
  }

  getProfileImage() {
    if (this.user) {
      return this.user.user_profile;
    }
    return "../../../assets/Path 10673.svg"
  }

  openModal() {
    this.authService.loginPopUpOpen();
  }

  openDialogComingsoon() {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  logout(): void {
    this.authService.logOut();
  }


  // ../../../assets/Path 10673.svg
}
