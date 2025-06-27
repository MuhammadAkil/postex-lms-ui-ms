import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { Bank, BusinessType, City, Country, Industry, MerchantCategory, MerchantLookup, Module, Partner, Platform, Profile, State, userRoles } from '../constant/interface/lookup.interface';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  getCountryList(): Observable<ResponseDTO<Array<Country>>>{
    return this.http.get(`/lookup/country`,{});
  }
  getBusinessTypeList(): Observable<ResponseDTO<Array<BusinessType>>>{
    return this.http.get(`/lookup/business-type`,{});
  }
  getIndustryList(): Observable<ResponseDTO<Array<Industry>>>{
    return this.http.get(`/lookup/industry`,{});
  }
  getPartnerList(): Observable<ResponseDTO<Array<Partner>>>{
    return this.http.get(`/lookup/partner`,{});
  }
  getPlatformList(): Observable<ResponseDTO<Array<Platform>>>{
    return this.http.get(`/lookup/platform`,{});
  }

  getStateList(countryId?: number): Observable<ResponseDTO<Array<State>>>{
    return this.http.get(`/lookup/state`,{params:{countryId:countryId || ''}});
  }
  getCityList(stateId?: number): Observable<ResponseDTO<Array<City>>>{
    return this.http.get(`/lookup/city`,{params:{stateId:stateId || ''}});
  }

  getMerchantCategory(): Observable<ResponseDTO<Array<MerchantCategory>>> {
    return this.http.get(`/lookup/merchant-category`, {});
  }

  getRolesList(countryId: userRoles | undefined): Observable<ResponseDTO<userRoles[]>> {
    return this.http.get(`/lookup/roles`, {});
  }

  getBankList(): Observable<ResponseDTO<Array<Bank>>> {
    return this.http.get(`/lookup/banks`, {});
  }

  getMerchantList(): Observable<ResponseDTO<Array<MerchantLookup>>> {
    return this.http.get(`/lookup/merchants`, {});
  }
  getMerchantProfile(): Observable<ResponseDTO<Array<Profile>>> {
    return this.http.get(`/lookup/merchant/profile`, {});
  }

}
