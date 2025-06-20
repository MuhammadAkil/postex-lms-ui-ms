import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { BRANCH } from '../constant/interface/branch.interface';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http: HttpClient) { }


  getBranches(params: any): Observable<ResponseDTO<BRANCH[]>> {
    return this.http.get(`/merchantBranch/merchant/${params.merchantId}`, { params: params });
  }

  createBranch(branch: BRANCH): Observable<ResponseDTO<null>> {
    return this.http.post(`/merchantBranch/create`, branch, {});
  }
  updateBranch(merchantBranchId: number, branch: BRANCH): Observable<ResponseDTO<null>> {
    return this.http.patch(`/merchantBranch/${merchantBranchId}`, branch, {});
  }

  updateStatus(merchantBranchIds: any[], statusId: number): Observable<ResponseDTO<null>> {
    return this.http.patch(`/merchantBranch/status`, { branchStatusId: statusId, merchantBranchIds: merchantBranchIds }, {});
  }

  syncMerchantBranchToWMS(merchantBranchId: number): Observable<ResponseDTO<null>> {
    return this.http.get(`/merchantBranch/syncMerchantBranch/${merchantBranchId}`, {});
  }

}
