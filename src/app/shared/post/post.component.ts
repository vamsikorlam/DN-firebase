import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input()
  postUri;

  @Input()
  postId;

  @Input()
  postLikesCount;

  @Input()
  postName;

  @Input()
  postPrice;

  @Input()
  postLocation;

  @Input()
  postTimeText;

  @Input()
  postProductType;

  @Input()
  showLockIcon: boolean = true;

  @Input()
  showSettingsIcon: boolean = true;

  @Input()
  showLikeIcon: boolean = true;

  @Output()
  onPostCardClicked: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {

  }

  onClickFn(productId: string): void {
    this.onPostCardClicked.emit(productId)
  }


}
