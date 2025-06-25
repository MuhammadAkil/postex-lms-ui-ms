import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantDto } from 'src/app/constant/interface/merchant.interface';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss']
})
export class ViewDetailComponent implements OnInit {
  merchantId: number = Number.NaN;
  merchant!: MerchantDto;
  modulesViews: string = '';
  data: any;
  complianceStatuses: { label: string; value: string; class: string }[] = [
  { label: 'Approved', value: 'Approved', class: 'status-approved' },
  { label: 'Pending', value: 'Pending', class: 'status-pending' },
  { label: 'Review Requested', value: 'Review Requested', class: 'status-review' }
];



  basicFields: { label: string; value: string }[] = [];
  ownerDetails: { label: string; value: string }[] = [];
  bankDetails: { label: string; value: string }[] = [];

  ownerAttachments = [
    { name: 'Selfie', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'CNIC Front', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'CNIC Back', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' }
  ];

  documents = [
    { name: 'NTN Certificate', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Incorporation Certificate', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Bank Statement', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Authority Letter', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Board Resolution / Proprietorship Declaration', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Utility Bill Pictures', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Past Purchase Orders', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Past Invoices', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Business Image/Logo', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' },
    { name: 'Collateral', date: '2023-01-15', file: 'Incorporation Certificate.jpeg' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private merchantService: MerchantService
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
    }
  }

  getMerchantDetail() {
    this.merchantService.getMerchantDetail(this.merchantId).subscribe(d => {
      if (d.statusCode?.toString().startsWith('20') && d.dist?.length) {
        this.merchant = d.dist[0];
      } else {
        this.setDummyData();
      }
      this.populateFields();
    }, error => {
      this.setDummyData();
      this.populateFields();
    });
  }
  getComplianceClass(status: string | undefined): string {
  return (
    this.complianceStatuses.find(s => s.value === status)?.class || ''
  );
}

  getComplianceStatusClass(status: string | undefined): string {
  switch (status) {
    case 'Approved':
      return 'status-approved';
    case 'Pending':
      return 'status-pending';
    case 'Review Requested':
      return 'status-review';
    default:
      return '';
  }
}


  setDummyData() {
    this.merchant = {
      merchantName: 'Sapphire',
      accountCode: '2114',
      merchantProfile: 'Logistics',
      merchantCategory: 'Normal',
      countryName: 'Pakistan',
      merchantCity: 'Lahore',
      merchantStatus: 'Pending',
      companyRegistrationDate: new Date(),
      merchantEmail: 'sample@example.com',
      merchantPhone: '+92-300-1234567',
      merchantAddress: '57 Commercial Area, Expansion Colony, Ground, Lahore, 54610, Pakistan',
      contactPersonName: 'Kiran Ali',
      contactPersonPhone1: '',
      contactPersonPhone2: '',
      contactPersonEmail1: '',
      contactPersonEmail2: '',
      merchantNotificationResponseDto: {},
      merchantSettlementDetail: {
        bankName: 'Logistics',
        bankAccountTitle: 'Limited',
        ibanNumber: 'IBAN',
        vatNumber: '',
        billingAddress: '',
      },
      minimumOrderValue: 0,
      maximumOrderValue: 0,
      averageMonthlyVolume: 0,
      merchantProfileId: 3,
      branchLimit: 0,
      assignedModules: [],
      merchantId: 0
    } as unknown as MerchantDto;
  }

  populateFields() {
    this.basicFields = [
      { label: 'Platform', value: this.merchant['merchantProfile']|| '-'},
      { label: 'Business Type', value: 'Limited' },
      { label: 'Country', value: this.merchant['countryName']|| '-'},
      { label: 'State/Province', value: 'Punjab' },
      { label: 'Industry', value: this.merchant['merchantCategory'] || '-'},
      { label: 'Business Registration Number', value: this.merchant['accountCode'] || '-'},
      { label: 'City', value: this.merchant['merchantCity']|| '-' },
      { label: 'Business Address', value: this.merchant['merchantAddress']|| '-' },
      { label: 'New Field', value: 'Sample New Field Data' },
    ];

    this.ownerDetails = [
      { label: 'Full Name', value: 'Nomral' },
      { label: 'Email', value: 'Saudi Arabia' },
      { label: 'CNIC/Passport Number', value: 'Normal' },
      { label: 'CNIC/Passport Number', value: 'Normal' },
      { label: 'Contact Number', value: 'Kiran Ali' },
      { label: 'Date of Birth', value: 'Kiran Ali' },
    ];

    this.bankDetails = [
      { label: 'Bank Name', value: this.merchant.bankDetails?.bankName || '-' },
      { label: 'Account Title', value: this.merchant.bankDetails?.accountTitle || '-' },
      { label: 'Account Number', value: this.merchant['accountCode']|| '-' },
      { label: 'IBAN', value: this.merchant.bankDetails?.iban || '-' },
    ];
  }
}
