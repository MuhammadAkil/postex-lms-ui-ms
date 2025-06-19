import { Component } from '@angular/core';

@Component({
  selector: 'app-merchant-logs',
  templateUrl: './merchant-logs.component.html',
  styleUrls: ['./merchant-logs.component.scss']
})
export class MerchantLogsComponent {
listOfData = [
    { sr: 1, lmsId: '4823', partner: 'OMS', partnerAccountId: '48273619', merchant: 'Tech Innovations Inc.', owner: 'Oliver Thompson', type: 'Sole Proprietor', registrationDate: '2023-01-15', complianceStatus: 'Approved' },
    { sr: 2, lmsId: '7591', partner: 'Logistics', partnerAccountId: '15938472', merchant: 'Green Solutions LLC', owner: 'Sophia Martinez', type: 'Partnership', registrationDate: '2023-02-20', complianceStatus: 'Approved' },
    { sr: 3, lmsId: '3164', partner: 'XPay', partnerAccountId: '27483916', merchant: 'Urban Eats Co.', owner: 'Liam Johnson', type: 'Limited', registrationDate: '2023-03-05', complianceStatus: 'Approved' },
    { sr: 4, lmsId: '2048', partner: 'OMS', partnerAccountId: '93847215', merchant: 'Creative Minds Agency', owner: 'Emma Williams', type: 'Sole Proprietor', registrationDate: '2023-04-12', complianceStatus: 'Approved' },
    { sr: 5, lmsId: '9375', partner: 'Logistics', partnerAccountId: '64728193', merchant: 'NextGen Marketing', owner: 'Noah Brown', type: 'Partnership', registrationDate: '2023-05-30', complianceStatus: 'Pending' },
    { sr: 6, lmsId: '1482', partner: 'XPay', partnerAccountId: '58392074', merchant: 'Bright Future Consulting', owner: 'Ava Davis', type: 'Limited', registrationDate: '2023-06-18', complianceStatus: 'Pending' }
  ];
searchText: any;

  ngOnInit(): void {}
}
