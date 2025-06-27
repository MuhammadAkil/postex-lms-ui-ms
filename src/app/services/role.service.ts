import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MerchantBasicInformation, MerchantDto, MerchantFormDto, BankDetailsDto } from '../constant/interface/merchant.interface';
import { UserRoleMenu } from '../constant/interface/user-roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  assignRole(RoleMenuForm: UserRoleMenu): Observable<ResponseDTO<any>> {
    return this.http.post(`/merchant/create`, RoleMenuForm, {});
  }
   getUserRoleMenu(userId: any): Observable<ResponseDTO<any>> {
    return this.http.get(`/user-roles/menus/${userId}`);
  }

}
