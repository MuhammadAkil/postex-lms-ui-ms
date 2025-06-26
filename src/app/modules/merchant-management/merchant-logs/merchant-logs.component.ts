import { Component, OnInit } from '@angular/core';
import { FilterObject, GetSelectedFilters, ConstantFilterVariable } from 'src/app/constant/filters';
import { MerchantFormDto } from 'src/app/constant/interface/merchant.interface';
import { Pagination } from 'src/app/constant/interface/pagination.interface';
import { ListColumn } from 'src/app/constant/model/list-column.model';
import { SearchCriteria } from 'src/app/constant/model/searchCriteria.model';
import { MerchantDto } from 'src/app/models/merchant.interface';
import { CommonService } from 'src/app/services/common.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { ViewRemarksComponent } from '../view-remarks/view-remarks.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-merchant-logs',
  templateUrl: './merchant-logs.component.html',
  styleUrls: ['./merchant-logs.component.scss']
})
export class MerchantLogsComponent implements OnInit {
  listOfColumn: ListColumn[] = [
    { title: 'Sr #', property: 'serialNo', visible: true },
    { title: 'LMS ID', property: 'lmsId', visible: true }, // Remove if not in API
    { title: 'Partner', property: 'partner', visible: true }, // Remove if not in API
    { title: 'Partner Account ID', property: 'partnerAccountId', visible: true },
    { title: 'Merchant', property: 'merchant', visible: true },
    { title: 'Owner', property: 'owner', visible: true },
    { title: 'Type', property: 'type', visible: true },
    { title: 'Registration Date', property: 'registrationDate', visible: true },
    { title: 'Compliance Status', property: 'complianceStatus', visible: true },
    { title: 'Actions', property: 'action', visible: true },
  ];
  isLoading = false;
  searchCriteria = new SearchCriteria();
  pagination: Pagination = { page: 0, size: 25, total: 0 };
  merchantDataList: any[] = [];
  originalDataList: any[] = [];
  filters: FilterObject[] = GetSelectedFilters([
    ConstantFilterVariable.merchantName,
    ConstantFilterVariable.merchantCode,
  ]);
  selectedStatus: string = 'All';

  constructor(
    private merchantService: MerchantService,
    private commonService: CommonService,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    const filter = { ...this.searchCriteria, page: this.pagination.page, size: this.pagination.size };
    this.isLoading = true;

    this.merchantService.getAllRequests(filter).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.statusCode?.toString().startsWith('20') && res.dist?.length) {
          this.originalDataList = res.dist.map((item: any) => ({
            requestId: item.requestId,
            lmsId: '-',
            partner: '-',
            partnerAccountId: item.basicInformation?.partnerAccountId || '-',
            merchant: item.basicInformation?.businessAddress || '-',
            owner: item.ownerDetails?.ownerFullName || '-',
            type: item.basicInformation?.businessType || '-',
            registrationDate: item.enteredAt ? item.enteredAt.split('T')[0] : '-',
            complianceStatus: item.status || '-',
            merchantStatusId: 1
          }));

          this.filterByStatus(this.selectedStatus);
          this.pagination = res.pagination || this.pagination;
        } else {
          this.originalDataList = [];
          this.merchantDataList = [];
          this.pagination.total = 0;
        }
      },
      error: () => {
        this.isLoading = false;
        this.commonService.errorMessage({
          title: 'Error',
          message: 'Failed to fetch request logs. Please try again later.',
        });
      },
    });
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    if (status === 'All') {
      this.merchantDataList = [...this.originalDataList];
    } else {
      this.merchantDataList = this.originalDataList.filter(
        (merchant) =>
          merchant.complianceStatus === status || (status === 'Pending' && merchant.complianceStatus === 'New Requested')
      );
    }
    this.pagination.total = this.merchantDataList.length;
  }

viewRemarks(requestId:number) {
            this.dialog.open(ViewRemarksComponent, {
            position: { top: "100px" },
                data: {
                    requestId: requestId,
                },
                autoFocus: true,
              minWidth: "400px",
                maxHeight: "85vh",
                minHeight: "350px",
                disableClose: false,
                hasBackdrop: true,
            }).afterClosed().subscribe(action => {
            if (action) {
              
            }
        });
        }

  updateMerchantStatus(merchant: any, merchantStatus: number) {
    const dialog = this.commonService.confirmation({
      message: `Are you sure you want to change status of <b class="inline-block">${merchant.merchant}</b> to <b>${merchantStatus === 1 ? 'Active' : 'Inactive'}</b>`,
      title: 'Status Change',
    });

    dialog?.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) {
        this.isLoading = true;
        this.merchantService.changeMerchantStatus(merchant.requestId, merchantStatus).subscribe(
          (res) => {
            this.isLoading = false;
            if (res.statusCode?.toString().startsWith('20')) {
              this.getRequests();
            }
          },
          (err) => {
            this.isLoading = false;
            this.commonService.errorMessage({
              title: err?.status?.toString() || 'Error',
              message:
                err?.error?.statusMessage ||
                err?.error?.status?.statusMessageDetail ||
                err?.message ||'Unexpected error occurred.',
            });
          }
        );
      }
    });
  }

  paginationChange(event: Pagination) {
    this.pagination = event;
    this.getRequests();
  }

  onFilterChange(value: any) {
    if (!this.originalDataList) return;

    if (value) {
      const searchValue = value.trim().toLowerCase();
      this.merchantDataList = this.originalDataList.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchValue)
        )
      );
    } else {
      this.merchantDataList = [...this.originalDataList];
    }
    this.pagination.total = this.merchantDataList.length;
  }

  applyFilter(event: any) {
    this.pagination.page = 0;
    this.searchCriteria = event;
    this.getRequests();
  }
}
