

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavMenuList, SideNavObj } from '../sideMenu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() isCollapsed: boolean = false;
    sideMenuList: SideNavObj[] = SideNavMenuList;
    openMap: { [key: string]: boolean } = {};
    currentLanguage: string = 'en';

    constructor(private router: Router) {}

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
}