import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanManagementComponent } from './loan-management/loan-management.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const routes: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  // { path: 'create', component: CreateMerchantComponent, data: { breadcrumb: 'Create Merchant' } },
  // { path: 'edit/:merchantId', component: CreateMerchantComponent, data: { breadcrumb: 'Edit Merchant' } },
  // { path: "detail/:merchantId", component: ViewDetailComponent },
  { path: 'create-loan', component: LoanManagementComponent }
];

@NgModule({
  declarations: [
    LoanManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        FormsModule,
        NzBreadCrumbModule,
        NzAnchorModule,
        NzAnchorModule,
        ReactiveFormsModule,
        NzDatePickerModule,
        NzBreadCrumbModule,
        NzSelectModule,
        NzPaginationModule,
        MatMenuModule,
        NzButtonModule,
        NzCollapseModule,
        NzRadioModule,
        NzCheckboxModule
    
    
  ]
})
export class RoleManagementModule { }
