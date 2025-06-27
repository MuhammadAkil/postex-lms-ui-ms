import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userRoles } from 'src/app/constant/interface/lookup.interface';
import { AssignRolePayload } from 'src/app/constant/interface/user-roles.interface';
import { CommonService } from 'src/app/services/common.service';
import { LookupService } from 'src/app/services/lookup.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.scss']
})
export class LoanManagementComponent {

  roleForm!: FormGroup;
  users = [];
  platforms = ['OMS', 'Logistics', 'XPay'];
  roles = [
    'Admin', 'Compliance', 'Merchant Initiator', 'Finance Team',
    'Loan Initiator', 'Finance Approver', 'Loan Approver', 'User Manager'
  ];



  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.createRole();
    this.getRoles();
  }

  createRole() {
    this.roleForm = this.fb.group({
      platform: ['OMS', Validators.required],
      user: [null, Validators.required],
      role: ['Admin', Validators.required],
    });

  }
  getRoles() {
    const userId = 1
    this.roleService.getUserRoleMenu(userId).subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.users = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load states.' })
    });
  }
  saveRole() {
  if (this.roleForm.invalid) {
    this.roleForm.markAllAsTouched();
    return;
  }
  const payload = this.roleForm.value;
  this.roleService.assignRole(payload).subscribe({
    next: (res: any) => {
      if (res?.statusCode?.toString().startsWith('20')) {
        this.commonService.successMessage({
          title: 'Success',
          message: res.statusMessage || 'Role assigned successfully',
        });
        this.roleForm.reset({ platform: 'OMS', role: 'Admin', user: null });
      }
    },
    error: (err: any) => {
      this.commonService.errorMessage({
        title: 'Error',
        message:
          err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message || 'Failed to assign role.',
        });
    }
  });
}

}
