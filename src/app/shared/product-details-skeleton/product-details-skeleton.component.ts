import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details-skeleton',
  templateUrl: './product-details-skeleton.component.html',
  styleUrls: ['./product-details-skeleton.component.scss']
})
export class ProductDetailsSkeletonComponent implements OnInit {

  @Input()
  skLoaderCount;
  containerWidth: string;

  constructor() {
  }

  ngOnInit(): void {
    this.skLoaderCount = this.skLoaderCount ? this.skLoaderCount : 6;
    this.containerWidth = (100 / this.skLoaderCount) + '%';
  }

}
