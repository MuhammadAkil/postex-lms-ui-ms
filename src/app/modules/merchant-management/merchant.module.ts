import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateMerchantComponent } from './create-merchant/create-merchant.component';
import { MerchantLogsComponent } from './merchant-logs/merchant-logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreateMerchantComponent, data: { breadcrumb: 'Create Merchant' } },
  { path: 'logs', component: MerchantLogsComponent, data: { breadcrumb: 'Merchant Logs' } }
];


@NgModule({
  declarations: [],
 imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class MerchantModule { }
