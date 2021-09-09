import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-profile-skeleton',
  templateUrl: './other-profile-skeleton.component.html',
  styleUrls: ['./other-profile-skeleton.component.scss']
})
export class OtherProfileSkeletonComponent implements OnInit {

  constructor() { }
  skLoaderCount = 4
  ngOnInit(): void {
  }

}
