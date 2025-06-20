import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateMerchantComponent } from './create-merchant/create-merchant.component';
import { MerchantLogsComponent } from './merchant-logs/merchant-logs.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SharedModule } from '../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  { path: 'create', component: CreateMerchantComponent, data: { breadcrumb: 'Create Merchant' } },
  { path: 'edit', component: CreateMerchantComponent, data: { breadcrumb: 'Edit Merchant' } },
  { path: 'logs', component: MerchantLogsComponent, data: { breadcrumb: 'Merchant Logs' } }
];


@NgModule({
  declarations: [
    MerchantLogsComponent,
    CreateMerchantComponent,


  ],
 imports: [
    CommonModule,     
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    RouterModule,
    NzBreadCrumbModule,
    NzAnchorModule,
    NzAnchorModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzBreadCrumbModule,
    NzSelectModule,
    SharedModule,
    MatMenuModule,
    NzButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class MerchantModule { }
