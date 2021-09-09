import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating-bar',
  templateUrl: './dn-star-rating-bar.component.html',
  styleUrls: ['./dn-star-rating-bar.component.scss']
})
export class DnStarRatingBarComponent implements OnInit {

  @Input() dnRating = 0;
  @Input() starCount = 5;
  @Input() starColor: string;

  @Output()
  ratingUpdated = new EventEmitter();
  ratingArr = [];
  constructor() { }

  ngOnInit(): void {
    this.starColor = 'gold'
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  showIcon(index: number): string {
    if (this.dnRating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  onClick(rating): boolean {
    this.ratingUpdated.emit(rating);
    return false;
  }
}
