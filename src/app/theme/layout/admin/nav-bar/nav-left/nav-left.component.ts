// Angular import
import { Component, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {
  // public props
  @Output() onNavCollapsedMob = new EventEmitter();
  navCollapsedMob:any=false;
  headerStyle: string;
  menuClass: boolean;
  collapseStyle: string;
  windowWidth: number;

  // @ViewChild('navMenu', { static: false }) navMenuRef: ElementRef;

  // Constructor
  constructor() {
    // this.navCollapsedMob = false;
    this.headerStyle = '';
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  // public import
  navCollapse() {
    if (this.windowWidth < 1025) {
      this.navCollapsedMob = !this.navCollapsedMob;
      this.onNavCollapsedMob.emit();
      console.log("mobile open");
    }
  }


  // Add this method to close the mobile navigation when clicking outside
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   if (this.windowWidth < 1025 && this.navCollapsedMob ) {
  //     // const navMenuElement = document.getElementById('navMenu'); // Replace 'navMenu' with the actual ID of your navigation menu element

  //     // const hamburgerIcon = document.getElementById('hamburgerIcon'); // Replace 'hamburgerIcon' with the actual ID of your hamburger icon if needed

  //     // if (!navMenuElement?.contains(event.target as Node) && !hamburgerIcon?.contains(event.target as Node)) {
  //       this.navCollapsedMob = !this.navCollapsedMob;
  //   //}
  // }
  // }
}
