import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-control',
  templateUrl: './layout-control.component.html',
  styleUrls: ['./layout-control.component.scss']
})
export class LayoutControlComponent implements OnInit {

  root = document.documentElement;
  style;

  // Container Size Height Variables
  defaultBannerHeight = 0; // [px]
  minimumBannerHeight = 40; // [px]
  maximumBannerHeight = 40; // [px]
  bannerHeight;

  // Container Size Width Variables
  defaultMenuWidth = 70; // [px]
  minimumMenuWidth = 70; // [px]
  maximumMenuWidth = 70; // [px]
  menuWidth

  defaultSubMenuWidth = 260; // [px]
  minimumSubMenuWidth = 0; // [px]
  maximumSubMenuWidth = 260; // [px]
  subMenuWidth

  defaultActionMenuWidth = 0; // [px]
  minimumActionMenuWidth = 0; // [px]
  maximumActionMenuWidth = 70; // [px]
  actionMenuWidth

  // Limit Variables
  windowWidth;
  leftContentContainerLimit;
  rightContentContainerLimit;

  // Component Open Booleans
  subMenuOpen = true;
  editPaneOpen = false;
  actionMenuOpen = false;

  constructor() {
    window.addEventListener("resize", this.onWindowResize);
  }

  ngOnInit(): void {
    this.setDefaultContainerSizes();
    this.setAllContainerProperties();
    this.onWindowResize();
  }

  
  setDefaultContainerSizes() {
    // Heights

    // Widths
    this.menuWidth = this.defaultMenuWidth;
    this.subMenuWidth = this.defaultSubMenuWidth
    this.actionMenuWidth = this.defaultActionMenuWidth;
  }

  setAllContainerProperties() {
    this.setMenuProperties();
    this.setSubMenuProperties();
    this.setHeaderProperties();
    this.setContentPaneProperties();
  }

  onWindowResize() {
    console.log("window resize");
    this.windowWidth = window.innerWidth;
    this.setContentContainerLimits();
    this.setContentContainerProperties();
  }

  // Individual Container Property Setters

  setMenuProperties() {
    this.root.style.setProperty('--menu-width', this.menuWidth + 'px');
  }

  setSubMenuProperties() {
    this.root.style.setProperty('--sub-menu-width', this.subMenuWidth + 'px');
  }

  setContentContainerLimits() {
    this.leftContentContainerLimit = this.menuWidth + this.subMenuWidth;
    this.rightContentContainerLimit = this.windowWidth - this.actionMenuWidth;
    console.log(this.rightContentContainerLimit);
  }

  setContentContainerProperties() {
    this.root.style.setProperty('--left-content-container-limit', this.leftContentContainerLimit + 'px');
    this.root.style.setProperty('--right-content-container-limit', this.rightContentContainerLimit + 'px');
  }

  setLeftContentContainerLimit() {
    this.root.style.setProperty('--left-content-container-limit', this.leftContentContainerLimit + 'px');
  }

  setRightContentContainerLimit() {
    this.root.style.setProperty('--right-content-container-limit', this.rightContentContainerLimit + 'px');
  }

  setHeaderProperties() {

  }

  setContentPaneProperties() {

  }
}
