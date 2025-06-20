import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuPanel } from '@angular/material/menu';
import * as moment from 'moment';
import { take } from 'rxjs';
import { ConstantFilterVariable, FilterObject } from 'src/app/constant/filters';
import { BRANCH } from 'src/app/constant/interface/branch.interface';
import { DeliveryCity, MerchantCategory, MerchantLookup } from 'src/app/constant/interface/lookup.interface';
import { MerchantDto } from 'src/app/constant/interface/merchant.interface';
import { ResponseDTO } from 'src/app/constant/interface/responseDTO.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BranchService } from 'src/app/services/branch.service';
import { CommonService } from 'src/app/services/common.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss'],
  providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'filter-search-section' }
    }
  ],
})
export class FilterSearchComponent implements OnInit {
  @ViewChild('actionMenu') trigger: MatMenuPanel | null | any;
  merchantId: number;
  merchantCountryId!: number;
  @Output() onSubmitEvent = new EventEmitter<any>()
  @Input() filters: FilterObject[] = [];
  today = new Date();
  rangeDate = { FormData: '', today: '' };
  disabledDate = (current: Date): boolean => {return (current > this.today)};
  chips: { label: string, value: string }[] = []
  branchList: Array<BRANCH> = [];
  deliveryCityList: Array<DeliveryCity> = [];
  merchantsList:Array<MerchantDto>=[]
  constructor(
    private branchService: BranchService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private lookupService: LookupService,
  ) {
    this.merchantId = this.authService.getMerchantId();
    this.merchantCountryId = this.authService.getMerchantCountryId();
  }

  ngOnInit(): void {
    const customerTextField = this.filters.filter((e) => e.dafaultType == 'customer');
    const searchOrderField = this.filters.filter((e) => e.dafaultType == 'search');
    let newUpdatedFilterdArrray: any= [];
    newUpdatedFilterdArrray.unshift(
      {
        'customerField': customerTextField,
        'searchField': searchOrderField,
      }
    )
    this.filters?.map(e => {
      if (!newUpdatedFilterdArrray.includes(e)) {
        newUpdatedFilterdArrray.push(e)
      }
    });
    this.filters = [...newUpdatedFilterdArrray]
    this._FunctionCallRespectedAPIs();
  }
  _FunctionCallRespectedAPIs() {
    this.filters.forEach((d) => {
      switch (d.variable) {
        case ConstantFilterVariable.branchIds:
          this.getBranchList();
          break;
        case ConstantFilterVariable.deliveryCityIds:
          this.getDeliveryCities();
          break;
        case ConstantFilterVariable.merchantId:
          this.getMerchants();
          break;
      }
    })
  }
  getBranchList() {
    var params = {
      merchantId: this.merchantId,
      pagination: 'disable'
    }
    this.branchService.getBranches(params).pipe(take(1)).subscribe({
      next: (data: ResponseDTO<BRANCH[]>) => {
        if (data && data.statusCode?.toString().startsWith('20')) {
          this.branchList = data.dist || [];
          var branchListFilter = this.filters.find(e => e.variable == ConstantFilterVariable.branchIds);
          if (branchListFilter) {
            branchListFilter.options = this.branchList?.map((e) => {
              return { label: e?.branchName, value: e?.merchantBranchId }
            })
          }
        }
      },
      error: (err: any) => {
        if (err?.status?.toString() == "500") {
          this.commonService.errorMessage({
            message: "Oops, it seems like there was an unexpected error. Please try again later or refresh the page",
            title: err?.status?.toString() || "Error",
          })
        } else {
          this.commonService.errorMessage({
            message: err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message,
            title: err?.status?.toString() || "Error",
          })
        }
      }
    })
  }
  getDeliveryCities() {
    this.lookupService.getCityList(this.merchantCountryId).pipe(take(1)).subscribe({
      next: (data: ResponseDTO<DeliveryCity[]>) => {
        if (data && data.statusCode?.toString().startsWith('20')) {
          this.deliveryCityList = data.dist || [];
          var deliveryCityListFilter = this.filters.find(e => e.variable == ConstantFilterVariable.deliveryCityIds);
          if (deliveryCityListFilter) {
            deliveryCityListFilter.options = this.deliveryCityList.map((e) => {
              return { label: e?.cityName, value: e?.cityId }
            })
          }
        }
      },
      error: (err) => {
        if (err?.status?.toString() == "500") {
          this.commonService.errorMessage({
            message: "Oops, it seems like there was an unexpected error. Please try again later or refresh the page",
            title: err?.status?.toString() || "Error",
          })
        } else {
          this.commonService.errorMessage({
            message: err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message,
            title: err?.status?.toString() || "Error",
          })
        }
      }
    })
  }
  getMerchants() {
    this.lookupService.getMerchantList().pipe(take(1)).subscribe({
      next: (data: ResponseDTO<MerchantDto[]>) => {
        if (data && data.statusCode?.toString().startsWith('20')) {
          this.merchantsList = data.dist || [];
          var merchantsListFilter = this.filters.find(e => e.variable == ConstantFilterVariable.merchantId);
          if (merchantsListFilter) {
            merchantsListFilter.options = this.merchantsList.map((e) => {
              return { label: e?.merchantName, value: e?.merchantId }
            })
          }
        }
      },
      error: (err) => {
        if (err?.status?.toString() == "500") {
          this.commonService.errorMessage({
            message: "Oops, it seems like there was an unexpected error. Please try again later or refresh the page",
            title: err?.status?.toString() || "Error",
          })
        } else {
          this.commonService.errorMessage({
            message: err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message,
            title: err?.status?.toString() || "Error",
          })
        }
      }
    })
  }
  onDateChange(result: any, field: any): void {
    field.value = result;
  }
  onChipCancel(event: any, label: string) {
    const idx = this.filters.findIndex(e => e.label === label);
    if (idx > -1) {
      if (this.filters[idx].variable == ConstantFilterVariable.date) {
        this.filters[0].value = null;
        this.filters[1].value = null;
      } else {
        this.filters[idx].value = undefined;
      }
    }
    this.onSubmit();
  }
  clear() {
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
    this.chips = [];
    this.filters.forEach((field) => {
      field.value = undefined;
    });
    this.onSubmitEvent.emit({});
  }
  onSubmit() {
    this.chips = [];
    var obj: any = {}
    this.filters.forEach(field => {
      if (field.type == ConstantFilterVariable.date && field.value) {
        this.chips.push({ label: field.label || '', value: `${moment(field.value[0]).format('L')} - ${moment(field.value[1]).format('L')}` });
        obj['fromDate'] = moment(field.value[0]).format("yyyy-MM-DD");
        obj['toDate'] = moment(field.value[1]).format("yyyy-MM-DD");
      } else if (field.value) {
        obj[field.variable] = field.value.toString().trim();
        if (field.type == 'select') {
          const label = field.options?.find(e => e.value == field.value)?.label;
          this.chips.push({ label: field.label || '', value: label || field.value });
        } else {
          this.chips.push({ label: field.label || '', value: field.value });
        }
      }
    });
    this.onSubmitEvent.emit(obj);
    if (this.trigger) {
      this.trigger.close.emit(true);
    }
    console.log(this.filters)
  }
  customerSelectedInputField: FilterObject = {};
  orderSearchSelectedInputField: FilterObject = {};
  onInputFieldSelected(event: any) {
    switch (event.dafaultType) {
      case 'customer': {
        this.customerSelectedInputField = event;
        break;
      }
      case 'search': {
        this.orderSearchSelectedInputField = event;
      }
    }
  }
}
