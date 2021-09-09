import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { CommunityCardSkeletonComponent } from './community-card-skeleton/community-card-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FillPipe } from '../@core/pipes/fill-pipe';
import { DnStarRatingBarComponent } from './dn-star-rating-bar/dn-star-rating-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SocialShareComponent } from './modalpopups/social-share/social-share.component';
import { CommingSoonComponent } from './modalpopups/comming-soon/comming-soon.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProductDetailsSkeletonComponent } from './product-details-skeleton/product-details-skeleton.component';
import { PostComponent } from './post/post.component'
import { CommunityDetailsSkeletonComponent } from './community-details-skeleton/community-details-skeleton.component'
import { CoreModule } from '../@core/core.module';
// import { LocationSearchComponent } from './modalpopups/location-search/location-search.component';
import { OtherProfileSkeletonComponent } from './other-profile-skeleton/other-profile-skeleton.component';
@NgModule({
  declarations: [FooterComponent, CommunityCardSkeletonComponent, FillPipe, DnStarRatingBarComponent, MobileFooterComponent, SocialShareComponent, CommingSoonComponent, ProductDetailsSkeletonComponent, CommunityDetailsSkeletonComponent, PostComponent, OtherProfileSkeletonComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxSkeletonLoaderModule,
    MatButtonModule,
    MatIconModule,
    BsDropdownModule,
    MatDialogModule,
    ClipboardModule,
    PopoverModule,
    CoreModule
  ],
  entryComponents: [SocialShareComponent, CommingSoonComponent],
  exports: [FooterComponent, CommunityCardSkeletonComponent, DnStarRatingBarComponent, MobileFooterComponent, SocialShareComponent, CommingSoonComponent, ProductDetailsSkeletonComponent, CommunityDetailsSkeletonComponent, PostComponent, OtherProfileSkeletonComponent]
})
export class SharedModule { }
