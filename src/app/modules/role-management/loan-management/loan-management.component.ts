import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.scss']
})
export class LoanManagementComponent {

  platform = {
    oms: true,
    logistics: false,
    xpay: false,
  };

  selectedPlatforms: string[] = ['Logistics'];
  users = ['User A', 'User B', 'User C'];
  selectedUser: string | null = null;
  selectedPlatform: string = 'OMS';
  selectedRole: string = 'Admin';

  saveRole() {
    console.log('Saved', {
      platform: this.platform,
      selectedUser: this.selectedUser,
      selectedRole: this.selectedRole,
    });
  }

}
