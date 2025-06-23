import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantDto } from 'src/app/constant/interface/merchant.interface';
import { LookupService } from 'src/app/services/lookup.service';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  merchantId: number = Number.NaN;
  merchant!: MerchantDto;
  moduleList: any[] = [];
  modulesViews: string = "";

  // Dummy data to be used if API fails or no data is returned
  private dummyMerchant: MerchantDto = {
    merchantName: 'ABC Retail Store',
    accountCode: 'MRC-12345',
    merchantProfile: 'Standard',
    merchantCategory: 'Retail',
    countryName: 'Pakistan',
    merchantCity: 'Karachi',
    merchantStatus: 'Active',
    companyRegistrationDate: '2023-05-15',
    merchantEmail: 'contact@abcretail.com',
    merchantPhone: '+92-321-1234567',
    merchantAddress: '123 Commercial Lane, Karachi, Pakistan',
    contactPersonName: 'Ali Khan',
    contactPersonPhone1: '+92-321-1234567',
    contactPersonPhone2: '+92-322-7654321',
    contactPersonEmail1: 'ali.khan@abcretail.com',
    contactPersonEmail2: 'support@abcretail.com',
    merchantNotificationResponseDto: {
      smsEnabled: true,
      emailEnabled: true,
      sms1: '+92-321-1234567',
      sms2: '+92-322-7654321',
      email1: 'contact@abcretail.com',
      email2: 'support@abcretail.com',
    },
    merchantSettlementDetail: {
      bankName: 'HBL Bank',
      bankAccountTitle: 'ABC Retail Store Account',
      ibanNumber: 'PK12HBLB1234567890123456',
      vatNumber: 'VAT-987654321',
      billingAddress: '123 Billing Street, Karachi, Pakistan',
    },
    minimumOrderValue: 1000.50,
    maximumOrderValue: 50000.75,
    averageMonthlyVolume: 250000.00,
    merchantProfileId: 3, // To show Number of Branches
    branchLimit: 5,
    assignedModules: [
      {
        moduleName: 'Sales',
        moduleId: 0
      },
      {
        moduleName: 'Inventory',
        moduleId: 2
      },
    ],
    merchantId: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private merchantService: MerchantService,
    private lookupService: LookupService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['merchantId']) {
        this.merchantId = Number(params['merchantId']);
      }
    });
  }

  ngOnInit(): void {
    if (!isNaN(this.merchantId) && this.merchantId) {
      this.getMerchantDetail();
    } else {
      // If merchantId is invalid, use dummy data
      this.merchant = this.dummyMerchant;
      this.modulesViews = this.merchant.assignedModules?.map(e => e.moduleName).join(", ") || "";
    }
  }
// Method to handle date formatting with fallback
  getFormattedDate(date: Date | undefined): string {
    return date ? new Date(date).toLocaleDateString() : '-';
  }
getNotificationStatus(enabled: boolean | undefined): string {
    return enabled !== undefined ? (enabled ? 'Yes' : 'No') : '-';
  }
  // Method to handle number formatting with fallback
  getFormattedNumber(value: number | undefined): string {
    return value !== undefined ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) : '-';
  }
  getMerchantDetail() {
    this.merchantService.getMerchantDetail(this.merchantId).subscribe({
      next: (d) => {
        if (d.statusCode?.toString().startsWith('20') && d.dist) {
          this.merchant = d.dist[0];
          this.modulesViews = this.merchant.assignedModules?.map(e => e.moduleName).join(", ") || "";
        } else {
          // Use dummy data if API response is not successful
          this.merchant = this.dummyMerchant;
          this.modulesViews = this.dummyMerchant.assignedModules?.map(e => e.moduleName).join(", ") || "";
        }
      },
      error: () => {
        // Use dummy data if API call fails
        this.merchant = this.dummyMerchant;
        this.modulesViews = this.dummyMerchant.assignedModules?.map(e => e.moduleName).join(", ") || "";
      },
    });
  }
}