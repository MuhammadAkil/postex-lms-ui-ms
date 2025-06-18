import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
    isCollapsed: boolean = false;
    fullName: string = 'John Doe'; // Hardcoded for demo; replace with auth service
    logoUrl: string = ''; // Base64 image or URL; replace with actual data
    userType: string = 'Admin'; // Hardcoded for demo; replace with auth service
    breadcrumbs: { label: string, url: string }[] = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof ActivationEnd),
            map(() => this.buildBreadcrumbs(this.activatedRoute.root))
        ).subscribe(breadcrumbs => {
            this.breadcrumbs = breadcrumbs;
        });
    }

    buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: { label: string, url: string }[] = []): { label: string, url: string }[] {
        const children: ActivatedRoute[] = route.children;

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.snapshot.data['breadcrumb'] || child.snapshot.url[0]?.path || 'Unknown';
            if (label && child.outlet === 'primary') {
                breadcrumbs.push({ label, url: url || '/' });
            }

            return this.buildBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    logout(): void {
        console.log('User logged out');
    }
}