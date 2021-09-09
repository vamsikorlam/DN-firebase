import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from '../modalpopups/comming-soon/comming-soon.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  constructor(private dialog: MatDialog) { }
  currentYear: number = new Date().getFullYear();
  ngOnInit(): void { }

  openDialogComingsoon() {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }
}
