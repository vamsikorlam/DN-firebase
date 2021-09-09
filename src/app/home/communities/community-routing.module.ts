import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './community.component';
import { CommunityDetailComponent } from './community-detail/community-detail.component';
import { CommunityProfileComponent } from './community-profile/community-profile.component';
import { Path } from 'src/app/@core/structs/path.enum'
import { CommunityChatComponent } from './community-chat/community-chat.component';
import { CommunityMemebersComponent } from './community-memebers/community-memebers.component';
import { CommunityMarketPlaceComponent } from './community-market-place/community-market-place.component';
import { CommunitySettingsComponent } from './community-settings/community-settings.component';
import { CommunitySearchComponent } from './community-search/community-search.component';
const routes: Routes = [

    {
        path: '',
        component: CommunityComponent,

    },
    {
      path: Path.CommunitySearch,
      component: CommunitySearchComponent
    },
    {
        path: `${Path.CommunityDetail}/:id`,
        component: CommunityDetailComponent,

        children: [
            {
                path: '', redirectTo: Path.CommunityProfile
            },
            {
                path: Path.CommunityProfile, component: CommunityProfileComponent
            },
            {
                path: Path.CommunityChat, component: CommunityChatComponent
            },
            {
                path: Path.CommunityMarketPlace, component: CommunityMarketPlaceComponent
            },
            {
                path: Path.CommunityMembers, component: CommunityMemebersComponent
            },
            {
                path: Path.CommunitySettings, component: CommunitySettingsComponent
            }
        ]

    }

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommunityRoutingModule { }
