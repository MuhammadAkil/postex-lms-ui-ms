import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateMerchantComponent } from './create-merchant/create-merchant.component';
import { MerchantLogsComponent } from './merchant-logs/merchant-logs.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  { path: 'create', component: CreateMerchantComponent, data: { breadcrumb: 'Create Merchant' } },
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
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class MerchantModule { }
