import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { SuperMerchantDto, SuperMerchantForm } from '../constant/interface/superMerchant.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperMerchantService {

  constructor(private http: HttpClient) { }

  createSuperMerchant(superMerchantForm: SuperMerchantForm): Observable<ResponseDTO<any>> {
    return this.http.post(`/super-merchant/addSuperMerchant`, superMerchantForm, {});
  }

  getAllSuperMerchant(params: any): Observable<ResponseDTO<Array<SuperMerchantDto>>> {
    return this.http.get(`/super-merchant/superMerchants`, { params: params });
  }

  getSuperMerchantDetail(merchantId: number): Observable<ResponseDTO<SuperMerchantDto>> {
    return this.http.get(`/super-merchant/${merchantId}/detail`, {});
  }

  updateSuperMerchantDetail(superMerchantId: number, superMerchantDetail:SuperMerchantDto): Observable<ResponseDTO<any>> {
    return this.http.patch(`/super-merchant/${superMerchantId}/update`, superMerchantDetail, {});
  }

}
