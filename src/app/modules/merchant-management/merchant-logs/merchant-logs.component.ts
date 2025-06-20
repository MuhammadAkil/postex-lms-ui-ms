import { Component, OnInit } from '@angular/core';
import { FilterObject, GetSelectedFilters, ConstantFilterVariable } from 'src/app/constant/filters';
import { Pagination } from 'src/app/constant/interface/pagination.interface';
import { ListColumn } from 'src/app/constant/model/list-column.model';
import { SearchCriteria } from 'src/app/constant/model/searchCriteria.model';
import { MerchantDto } from 'src/app/models/merchant.interface';
import { CommonService } from 'src/app/services/common.service';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-merchant-logs',
  templateUrl: './merchant-logs.component.html',
  styleUrls: ['./merchant-logs.component.scss']
})


export class MerchantLogsComponent implements OnInit {
  listOfColumn: ListColumn[] = [
    { title: 'Sr #', property: 'serialNo', visible: true },
    { title: 'LMS ID', property: 'lmsId', visible: true },
    { title: 'Partner', property: 'partner', visible: true },
    { title: 'Partner Account ID', property: 'partnerAccountId', visible: true },
    { title: 'Merchant', property: 'merchant', visible: true },
    { title: 'Owner', property: 'owner', visible: true },
    { title: 'Type', property: 'type', visible: true },
    { title: 'Registration Date', property: 'registrationDate', visible: true },
    { title: 'Compliance Status', property: 'complianceStatus', visible: true },
    { title: 'Actions', property: 'action', visible: true },
  ] as ListColumn[];
  isLoading: boolean = false;
  searchCriteria = new SearchCriteria();
  pagination: Pagination = { page: 0, size: 25 };
  merchantDataList: Array<MerchantDto> = [];
  originalDataList:Array<MerchantDto>=[];
  filters: FilterObject[] = GetSelectedFilters([ ConstantFilterVariable.merchantName,ConstantFilterVariable.merchantCode])


  constructor(
    private merchantService: MerchantService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getMerchants();
  }


  getMerchants() {
   
    var filter = { ...this.searchCriteria };
      filter.page = this.pagination.page;
      filter.size = this.pagination.size;
      this.isLoading = true;
      this.merchantService.getAllMerchant(filter).subscribe(d => {
      if (d.statusCode?.toString().startsWith("20")) {
        this.merchantDataList = d.dist || [];
        this.pagination = d.pagination || this.pagination;
        this.isLoading = false;
        this.originalDataList = [...this.merchantDataList]

      }
    }, err => {
      this.isLoading = false;
    })
  }

  updateMerchantStatus(merchant: MerchantDto, merchantStatus : number) {
    const dialog = this.commonService.confirmation({ message: `Are you sure you want to change status of <b class="inline-block">${merchant.merchantName}</b> to <b>${merchant.merchantStatusId ? 'Inactive' : 'Active'}</b>`, title: "Status Change" });
    dialog?.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) {
        this.isLoading = true;
        this.merchantService.changeMerchantStatus(merchant.merchantId, merchantStatus).subscribe(d => {
          if (d.statusCode?.toString().startsWith("20")) {
            this.isLoading = false;
            this.getMerchants();
          }
        }, err => {
          this.isLoading = false;
          if (err?.status?.toString() == '500') {
            this.commonService.errorMessage({ title: err?.status?.toString() || 'Error', message: 'Oops, it seems like there was an unexpected error. Please try again later or refresh the page', });
          } else {
            this.commonService.errorMessage({ title: err?.status?.toString() || 'Error', message: err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message, });
          }
        });
      }
    });
  }

  paginationChange(event: Pagination) {
    this.pagination = event;
    this.getMerchants();
  }

  onFilterChange(value:any){
    if(!this.merchantDataList){
      return;
    }
    if(value){
      value = value.trim().toLowerCase();
      this.merchantDataList = this.originalDataList.filter((item: any) => {
        for (const prop in item) {
          if (item.hasOwnProperty(prop)) {
            const propValue = item[prop];
            if(propValue.toString().toLowerCase().includes(value.toString().toLowerCase())){
              return true;
            }
          }
        }
        return false;
      });
    }else{
      this.merchantDataList = [...this.originalDataList]
    }
  }
  applyFilter(event: any) {
    this.pagination.page = 0;
    this.searchCriteria = event;
    this.getMerchants()
  }
}