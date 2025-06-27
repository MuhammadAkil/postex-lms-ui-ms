import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../gaurd/auth.guard';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { EyeOutline, EyeInvisibleOutline } from '@ant-design/icons-angular/icons';
import { MatMenuModule } from '@angular/material/menu';



const routes: Routes = [
  { path:"", component:LayoutComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
     { path: 'dashboard', component: DashboardComponent },
      { path: 'merchant', loadChildren: () => import('../modules/merchant-management/merchant.module').then(m => m.MerchantModule)},
      { path: 'role-management', loadChildren: () => import('../modules/role-management/role-management.module').then(m => m.RoleManagementModule)},
     ]
  },
]

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzMenuModule,
    NzLayoutModule,
    NzBadgeModule,
    NzIconModule,
    NzIconModule.forRoot([EyeOutline, EyeInvisibleOutline]),
    NzAvatarModule,
    NzInputModule,
    RouterModule.forChild(routes),
    NzDividerModule,
    NzRadioModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzMenuModule,
    MatMenuModule,
    

    
  ]
})
export class LayoutModule { }