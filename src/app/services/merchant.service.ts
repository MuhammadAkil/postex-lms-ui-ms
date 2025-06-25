import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MerchantBasicInformation, MerchantDto, MerchantFormDto, BankDetailsDto } from '../constant/interface/merchant.interface';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }

  createMerchant(merchantForm: MerchantFormDto): Observable<ResponseDTO<any>> {
    return this.http.post(`/merchant/create`, merchantForm, {});
  }

  getMerchantDetail(merchantId: number): Observable<ResponseDTO<Array<MerchantDto>>> {
    return this.http.get(`/merchant/${merchantId}/detail`, {});
  }

  getAllMerchant(params: any): Observable<ResponseDTO<Array<MerchantDto>>> {
    return this.http.get(`/merchant/merchantsList`, {params:params});
  }

  updateBasicInformation(merchantId:number,basicInfo:MerchantBasicInformation): Observable<ResponseDTO<any>> {
    return this.http.patch(`/merchant/${merchantId}/basic-info`, basicInfo, {});
  }

  // updateContactInformation(merchantId: number, contactInfo: MerchantContactInformation): Observable<ResponseDTO<any>> {
  //   return this.http.patch(`/merchant/${merchantId}/contact-info`, contactInfo, {});
  // }

  // updateBusinessStatistics(merchantId: number, businessStatistics: BusinessStatistics): Observable<ResponseDTO<any>> {
  //   return this.http.patch(`/merchant/${merchantId}/business-statics`, businessStatistics, {});
  // }

  // updateNotificationDetails(merchantId: number, notificationInfo: MerchantNotificationDto): Observable<ResponseDTO<any>> {
  //   return this.http.patch(`/merchant/${merchantId}/notification-info`, notificationInfo, {});
  // }

  updateSettlementDetail(merchantId: number, settlementDetail: BankDetailsDto): Observable<ResponseDTO<any>> {
    return this.http.patch(`/merchant/${merchantId}/settlement-detail`, settlementDetail, {});
  }

  // updateAccessControl(merchantId: number, userInfo: MerchantUserDto): Observable<ResponseDTO<any>> {
  //   return this.http.patch(`/merchant/${merchantId}/access-control`, userInfo, {});
  // }

  changeMerchantStatus(merchantId: number, status: number): Observable<ResponseDTO<any>> {
    return this.http.patch(`/merchant/${merchantId}/updateStatus`, { 'merchantStatus' :status});
  }

}
