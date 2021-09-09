import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'app-video-tutorials',
  templateUrl: './video-tutorials.component.html',
  styleUrls: ['./video-tutorials.component.scss']
})
export class VideoTutorialsComponent implements OnInit {

  @ViewChild('iframe') iframe: ElementRef;
  playButtonAnimation: boolean = true;
  displayPauseButton: boolean = false;

  constructor(private renderer: Renderer2, private dialogRef: MatDialogRef<VideoTutorialsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {
    const src = this.iframe.nativeElement.getAttribute('src');
    this.renderer.setAttribute(this.iframe.nativeElement, 'src', src);
    if (!this.playButtonAnimation) {
      this.playButtonAnimation = true;
    }
    // this.iframe.nativeElement.play()
    // this.iframe.nativeElement.pause();
  }
  onPlay() {
    this.iframe.nativeElement.play();
    this.playButtonAnimation = false;
  }
  onPause() {
    this.iframe.nativeElement.pause();
    this.playButtonAnimation = true;
    this.displayPauseButton = false;
  }
  onHover() {
    console.log("hover enter")
    if (!this.playButtonAnimation && !this.displayPauseButton) {
      this.displayPauseButton = true;
      console.log(this.displayPauseButton)
    }

  }
  onHoverOutside() {
    this.displayPauseButton = false;
  }

  Close() {
    this.dialogRef.close();
  }


}
