import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {
  url: string
  constructor(private dialogRef: MatDialogRef<SocialShareComponent>) { }

  ngOnInit(): void {
    this.url = window.location.href;
    this.url = this.url.slice(7);
    this.url = "https://" + this.url;
    console.log(this.url)
  }

  socialShare(name) {


    switch (name) {
      case "Facebook":
        console.log(this.url);

        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(this.url),
          'facebook-share-dialog',
          'width=626,height=436');
        // 'https://www.facebook.com/sharer/sharer.php?' + encodeURIComponent(url) + '&t=' + encodeURIComponent(url)
        break;
      case "Twitter":
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(this.url));
        break;
      case "Messenger":
        window.open('fb-messenger://share?link=' + encodeURIComponent(this.url) + '&app_id=' + encodeURIComponent(2150569971849396));
        break;
      case "Pinterest":
        window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(this.url) + '&description=' + encodeURIComponent(document.title));
        break;
      case "Linkedin":
        window.open('http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(this.url) + '&title=' + encodeURIComponent(document.title));
        break;
      case "Whatapp":
        window.open('whatsapp://send?text=' + encodeURIComponent(this.url));
        break;
      case "Picture":
        window.open('');
        break;
    }

  }

  close() {
    this.dialogRef.close();
  }
}
