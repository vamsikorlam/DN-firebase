import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  sideNavTrigger = new Subject();
  sideNavCloseTrigger$ = new Subject();
  showAndHideSearchCommunity$ = new BehaviorSubject(false);
  hideCommunityHeader$ = new BehaviorSubject(false)
  hideMobileFooter$ = new Subject();
  hideMobileFooterProductDetail$ = new Subject();

  constructor() { }

  triggerSideNav(): void {
    this.sideNavTrigger.next(true)
  }

  closeSideNav(): void {
    this.sideNavCloseTrigger$.next(true);
  }

  showAndHideCommunity(flag: any): void {
    this.showAndHideSearchCommunity$.next(flag);
  }

  showAndHideCommunityHeader(flag: any): void {
    this.hideCommunityHeader$.next(flag);
  }
  hideMobileFooter(): void {
    this.hideMobileFooter$.next(false);
  }
  hideMobileProductdetailFooter(): void {
    this.hideMobileFooterProductDetail$.next(false);
  }

}
