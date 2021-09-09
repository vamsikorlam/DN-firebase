import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityDetailComponent } from './community-detail/community-detail.component';
import { CommunityProfileComponent } from './community-profile/community-profile.component';
import { CommunityChatComponent } from './community-chat/community-chat.component';
import { CommunityMarketPlaceComponent } from './community-market-place/community-market-place.component';
import { CommunityMemebersComponent } from './community-memebers/community-memebers.component';
import { CommunitySettingsComponent } from './community-settings/community-settings.component';
import { SharedModule } from '../../shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatDialogModule } from '@angular/material/dialog';
import { CommunitySearchComponent } from './community-search/community-search.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CoreModule } from 'src/app/@core/core.module';
@NgModule({
  declarations: [CommunityComponent, CommunityDetailComponent, CommunityProfileComponent, CommunityChatComponent, CommunityMarketPlaceComponent, CommunityMemebersComponent, CommunitySettingsComponent, CommunitySearchComponent],
  exports: [
    CommunitySearchComponent
  ],
  imports: [
    MatDialogModule,
    BsDropdownModule,
    CommonModule,
    CommunityRoutingModule,
    SharedModule,
    LazyLoadImageModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatRadioModule,
    FormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    MatCardModule,
    GooglePlaceModule,
    MatSliderModule,
    SlickCarouselModule,
    CoreModule
  ]
})
export class CommunitiesModule {
}
