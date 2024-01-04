// Angular import
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  // public props
  @Output() onNavCollapsedMob = new EventEmitter();
  @Output() onSubmenuCollapse = new EventEmitter();
  navCollapsedMob:any=false;
  windowWidth: number;
  public themeLayout!: string;

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    // this.navCollapsedMob = false;
  }

  // Life cycle events
  ngOnInit() {}

  // public method
  navCollapseMob() {

  
    if (this.windowWidth < 1025) {
     
      this.navCollapsedMob = !this.navCollapsedMob;
      console.log("collabseeee", this.navCollapsedMob, (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList);
      if (this.navCollapsedMob) {
        (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.remove('mob-open');
      } else {
        (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.add('mob-open');
      }
      console.log("collabseeee after", this.navCollapsedMob, (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement));
      // this.onNavCollapsedMob.emit();
    }
    else{
      
    }
  }
}
