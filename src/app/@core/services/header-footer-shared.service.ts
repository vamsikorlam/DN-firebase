import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderFooterSharedService {

  private headerFooterControlsSubject = new Subject<{showHeader: boolean, showFooter: boolean}>();

  constructor() { }

  setHeaderFooterControl(showHeader:boolean, showFooter: boolean) {
    this.headerFooterControlsSubject.next({showHeader, showFooter})
  }

  getHeaderFooterSharedObservable() {
    return this.headerFooterControlsSubject.asObservable()
  }
}
