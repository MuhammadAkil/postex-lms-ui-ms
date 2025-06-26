import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MerchantService } from 'src/app/services/merchant.service';

@Component({
  selector: 'app-view-remarks',
  templateUrl: './view-remarks.component.html',
  styleUrls: ['./view-remarks.component.scss']
})
export class ViewRemarksComponent implements OnInit {

  requestId!: number;
  isLoading = false;
  remarksList: any[] = [];

  constructor(
    private merchantService: MerchantService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.requestId = this.data.requestId;
    this.getRequests();
  }

  remarksData: any = {
    title: 'Urban Hours',
    status: 'Pending',
    date: '10-06-2025',
    time: '09:41 AM',
    remarksList: [
      'Need to update the bank statement',
      'Need CNIC Image',
      'Need Contract',
      'Need CNIC Image',
      'Need CNIC Image',
      'Need CNIC Image',
      'Need CNIC Image'
    ]
  };
  getRequests() {
    this.isLoading = true;
    this.merchantService.getRequestRemarks(this.requestId).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res && res.statusCode?.toString().startsWith('20')) {
          this.remarksList = res.dist || [];
        }
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
