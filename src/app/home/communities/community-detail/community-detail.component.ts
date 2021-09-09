import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'src/app/@core/services/communities.service';
import { SideNavService } from 'src/app/header/side-nav/side-nav.service';
import { ConstantsEnum } from '../../../@core/structs/constants.enum';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SocialShareComponent } from 'src/app/shared/modalpopups/social-share/social-share.component';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { Path } from '../../../@core/structs';
@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.scss']
})
export class CommunityDetailComponent implements OnInit, OnDestroy {
  community: any = undefined;
  id: number;
  defaultImage: string;
  constructor(private dialog: MatDialog, private communityService: CommunitiesService,
              private activatedRoute: ActivatedRoute, private sideNavService: SideNavService, private router: Router) {
  }

  ngOnInit(): void {
    this.defaultImage = ConstantsEnum.DEFAULT_IMAGE;
    this.sideNavService.showAndHideCommunity(true);
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);
    this.communityService.getCommunityProfile(this.id).subscribe((communityProfile) => {
      this.community = communityProfile.group_data;
    });

  }

  openDialogSocial(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = 'auto';
    dialogConfig.maxWidth = '100vw'
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    this.dialog.open(SocialShareComponent, dialogConfig);
  }
  openDialogComingSoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  ngOnDestroy(): void {
    this.sideNavService.showAndHideCommunity(false);
  }

  navigateCommunityHomePage(): void {
    this.router.navigate([Path.Community])
  }
}

