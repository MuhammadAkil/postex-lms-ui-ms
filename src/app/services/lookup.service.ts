import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { Bank, Country, DeliveryCity, MerchantCategory, MerchantLookup, Module, Profile } from '../constant/interface/lookup.interface';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  getCountryList(): Observable<ResponseDTO<Array<Country>>>{
    return this.http.get(`/lookup/countries`,{});
  }

  getCityList(countryId?: number): Observable<ResponseDTO<Array<DeliveryCity>>>{
    return this.http.get(`/lookup/cities`,{params:{countryId:countryId || ''}});
  }

  getMerchantCategory(): Observable<ResponseDTO<Array<MerchantCategory>>> {
    return this.http.get(`/lookup/merchant-category`, {});
  }

  getModuleList(): Observable<ResponseDTO<Module[]>> {
    return this.http.get(`/lookup/module`, {});
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
