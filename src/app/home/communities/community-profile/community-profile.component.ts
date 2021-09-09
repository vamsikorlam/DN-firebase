import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'src/app/@core/services/communities.service';
import { ConstantsEnum } from 'src/app/@core/structs/constants.enum';
@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.scss']
})
export class CommunityProfileComponent implements OnInit {
  id: Number;
  community: any;
  defaultImage: String;
  constructor(private route: ActivatedRoute, private Router: Router, private communityService: CommunitiesService) { }

  ngOnInit(): void {

    this.defaultImage = ConstantsEnum.DEFAULT_IMAGE
    // this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.id);
    var UrlSplitArray;
    let id;
    UrlSplitArray = this.Router.url.split('/');
    // console.log(UrlSplitArray[3]);
    id = parseInt(UrlSplitArray[3])
    this.communityService.getCommunityProfile(id).subscribe((communityProfile) => {
      this.community = communityProfile.group_data;
      console.log(this.community)
    });
  }

}
