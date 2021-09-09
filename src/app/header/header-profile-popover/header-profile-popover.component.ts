import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Path } from 'src/app/@core/structs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header-profile-popover',
  templateUrl: './header-profile-popover.component.html',
  styleUrls: ['./header-profile-popover.component.scss']
})
export class HeaderProfilePopoverComponent implements OnInit, OnDestroy {
  @Output() closeProfiletab = new EventEmitter<any>();
  user: any;
  subscription: Subscription;
  constructor(private authService: AuthService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.subscription = this.authService.user$.subscribe((user => { this.user = user; }));
  }

  getProfileImage() {
    if (this.user) {
      return this.user.user_profile
    }
    return "assets/images/profile pic.png";
  }

  openMyCommunities() {
    this.router.navigate([Path.Community])
  }


  logOutUser() {
    this.authService.logOut();
  }

  openDialogComingsoon() {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  closeProfilePopOvertab(): void {
    this.closeProfiletab.emit();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }



}
