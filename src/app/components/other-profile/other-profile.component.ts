import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunitiesService } from 'src/app/@core/services/communities.service';
import { OtherProfileUserService } from 'src/app/@core/services/other-profile-user.service';
import { UserGoodsService } from 'src/app/@core/services/user-goods.service';
import { UserSkillsService } from 'src/app/@core/services/user-skills.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AfterViewInit, DoCheck } from '@angular/core';
import { Path } from "src/app/@core/structs/path.enum";

// import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit, AfterViewInit {

  // user;
  user_id: number;
  userData;
  skills = [];
  skillcount = 0;
  products = [];
  communities = [];
  screenwidth;
  slick = [];
  windowsize = [];
  skillsisLoading = false;
  productsisLoading = false;
  communitiesisLoading = false;
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": false,

    "responsive": [

      {
        "breakpoint": 2000,
        "settings": {
          "slidesToShow": 4,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 1440,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1

        }
      },

      {
        "breakpoint": 900,
        "settings": {

          "slidesToShow": 3,
          "slidesToScroll": 1

        }
      },

      {
        "breakpoint": 769,
        "settings": {
          "slidesToShow": 2.5,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 550,
        "settings": {
          "slidesToShow": 2.5,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 343,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      }
    ]
  };
  // @ViewChild('slickModal1') slickModal1: SlickCarouselComponent;
  // @ViewChild('slickModal2') slickModal2: SlickCarouselComponent;
  // @ViewChild('slickModal3') slickModal3: SlickCarouselComponent;
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.screenwidth = event.target.innerWidth;
  //   console.log(this.screenwidth);
  //   // this.getSlickConfig();
  // }

  constructor(
    private otherProfileUserService: OtherProfileUserService,
    private communitiesService: CommunitiesService,
    private userSkillsService: UserSkillsService,
    private userGoodsService: UserGoodsService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
    // public breakpointObserver: BreakpointObserver,
  ) { }



  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      console.log(params.params.userId);

      // User Data

      this.otherProfileUserService.getUserData(params.params.userId).subscribe(
        (response) => {
          console.log("user data: ", response);
          this.userData = response.user_data;
          console.log("my data ", this.userData);
        }
      )

      // communities
      this.communitiesisLoading = true;
      this.communitiesService.getUserCommunity(params.params.userId, 1, 10).subscribe(
        (response) => {
          console.log("communities: ", response);
          this.communities = response.groups;
          this.communitiesisLoading = false;
        }
      )

      // products
      this.productsisLoading = true;
      this.userGoodsService.getUserGoods(params.params.userId, 1, 10).subscribe(
        (response) => {
          this.products = response.products;
          console.log("products", response);
          this.productsisLoading = false
        }
      )

      //skills
      this.skillsisLoading = true;
      this.userSkillsService.getUserSkills(params.params.userId, 1, 10).subscribe(
        (response) => {
          console.log("skills ", response);
          this.skills = response.skills;
          this.skillsisLoading = false;
        }
      )

      // this.breakpointObserver
      //   .observe(['(max-width: 767px)'])
      //   .subscribe((state: BreakpointState) => {
      //     console.log(state);
      //   });


    });
    this.screenwidth = window.innerWidth;
    console.log(this.screenwidth);
    // this.currentScreenConfig = this.getSlickConfig();





  }

  ngAfterViewInit(): void {
    // this.slick.push(this.slickModal1);
    // this.slick.push(this.slickModal2);
    // this.slick.push(this.slickModal3)
  }

  openDialogComingsoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }


  productdetailroute(id): void {
    console.log(id);
    this.router.navigate(['product/product-details', id])

  }

  communityprofileroute(id): void {
    console.log(id);
    this.router.navigateByUrl(`/${Path.Community}/${Path.CommunityDetail}/${id}`);

  }

  // next(arg): void {

  //   // if(arg==1)
  //   // {
  //   //   this.skillcount=this.skillcount+1;
  //   // }
  //   this.checkNext(arg, this.slick[arg])
  //   this.slick[arg].slickNext();
  //   if (this.SkillPreviousButton) {
  //     this.checkprevious(arg);
  //   }

  // }

  // getSlickConfig() {
  //   console.log('called')
  //   let slickConfig;
  //   for (let i of this.slideConfig.responsive) {
  //     if (i.breakpoint >= this.screenwidth) {
  //       slickConfig = i;
  //       // console.log(slickConfig)
  //     }

  //   }
  //   return slickConfig
  // }
  // checkNext(arg, slick) {


  //   let length;


  //   arg == 0 ? length = this.skills.length : arg == 1 ? length = this.products.length : length = this.communities.length;


  //   console.log(this.currentScreenConfig, slick, length);
  //   (length - 1) - (slick.currentIndex) < this.currentScreenConfig.settings.slidesToShow ? this.previousAndNextbuttons[arg].nextButton = true : this.previousAndNextbuttons[arg].nextButton = false
  //   console.log(this.previousAndNextbuttons[arg].nextButton)

  // }

  // checkprevious(arg) {
  //   this.slick[arg].currentIndex == 0 ? this.previousAndNextbuttons[arg].previousButton = true : this.previousAndNextbuttons[arg].previousButton = false;
  // }
  // previous(arg): void {

  //   this.checkprevious(arg)
  //   if (this.previousAndNextbuttons[arg].nextButton) {
  //     this.checkNext(arg, this.slick[arg])
  //   }

  //   // console.log(this.slick[arg]);
  //   this.slick[arg].slickPrev();
  // }

  socialNavigate(url: string): void {
    if (url) {
      window.open(url, '_blank')
    }
    else {
      alert("User don't have Account")
    }
  }


  afterChange(e) {
    // console.log('afterChange');
    // if (this.similarProducts.length > 0) {
    //   var product = this.similarProducts[e.currentSlide];
    //   // if (product) {
    //   //   this.sliderClick(product);
    //   // }
    // }
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }

  slickInit(e) {

  }

  breakpoint(e) {

  }




}
