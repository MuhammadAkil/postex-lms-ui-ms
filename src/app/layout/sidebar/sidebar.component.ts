import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SideNavMenuList, SideNavObj } from '../sideMenu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  sideMenuList: SideNavObj[] = SideNavMenuList;
  openMap: { [key: string]: boolean } = {};

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateOpenMap();
      }
    });
  }

  ngOnInit(): void {
    this.sideMenuList.forEach((menu) => {
      menu.subMenu?.forEach((option) => {
        this.openMap[option.moduleId?.toString() || option.title] = false;
      });
    });
  }

  openHandler(key: string): void {
    this.openMap[key] = !this.openMap[key];
  }

  routeChanger(option: SideNavObj): void {
    if (option.url) {
      this.router.navigate([option.url]);
    }
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, { paths: 'exact', queryParams: 'ignored', fragment: 'ignored', matrixParams: 'ignored' });
  }

  private updateOpenMap(): void {
    this.sideMenuList.forEach(child => {
      child.subMenu?.forEach(option => {
        if (option.subMenu?.some(sub => this.isActive(sub.url))) {
          this.openMap[option.moduleId?.toString() || option.title] = true;
        } else if (!option.subMenu?.length && this.isActive(option.url)) {
          this.openMap[option.moduleId?.toString() || option.title] = false; 
        }
      });
    });
  }
}