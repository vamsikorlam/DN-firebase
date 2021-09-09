import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Path } from 'src/app/@core/structs/path.enum';
import { SideNavService } from 'src/app/header/side-nav/side-nav.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from '../modalpopups/comming-soon/comming-soon.component';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss']
})
export class MobileFooterComponent implements OnInit {


  open = false;
  constructor(private sidenavService: SideNavService,
    private authService: AuthService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.sidenavService.hideMobileFooter$.subscribe((value: any) => { this.open = value })
  }

  navigateToCommunities(): void {
    if (this.authService.checkUser()) {
      this.router.navigateByUrl(`/${Path.Community}`);
    } else {
      this.openModal();
    }
  }

  openModal(): void {
    this.authService.loginPopUpOpen();
  }


  openControl(): Boolean {
    // console.log('called', this.open);

    if (this.open) {
      this.open = false
      return this.open
    }
    this.open = true;
    // console.log(this.open)
    return this.open;
  }
  closeControl(): Boolean {
    this.open = false;
    return this.open;
  }
  openDialogComingsoon() {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

}
