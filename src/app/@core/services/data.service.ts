import { Injectable } from '@angular/core';
import { CommunityFilter, productFilter } from '../guards/type.guard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private communityFilter: CommunityFilter;
  private productFilter: productFilter;
  public searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  constructor() { }

  setCommunityFilter(filter: CommunityFilter): void {
    this.communityFilter = filter;
  }

  getCommunityFilter(): CommunityFilter {
    return this.communityFilter;
  }

  setProductFilter(filter: productFilter): void {
    this.productFilter = filter;
  }

  getProductFilter(): productFilter {
    return this.productFilter;
  }
}
