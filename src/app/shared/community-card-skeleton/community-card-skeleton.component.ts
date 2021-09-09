import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-card-skeleton',
  templateUrl: './community-card-skeleton.component.html',
  styleUrls: ['./community-card-skeleton.component.scss']
})
export class CommunityCardSkeletonComponent implements OnInit {
  @Input()
  skLoaderCount;
  containerWidth: string;

  @Input()
  customClass: string

  constructor() {
  }

  ngOnInit(): void {
    this.customClass = this.customClass ? this.customClass : 'col-md-3' ? this.customClass : 'col-6';
    this.skLoaderCount = this.skLoaderCount ? this.skLoaderCount : 8;
    this.containerWidth = (100 / this.skLoaderCount) + '%';
  }

}
