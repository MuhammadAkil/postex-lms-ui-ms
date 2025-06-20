import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http : HttpClient) { }

  airwayBills(obj: any): Observable<ResponseDTO<any>> {
    return this.http.get<ResponseDTO<any>>(environment.baseUrlReporting + `/order/airway-bill`, { params: obj });
  }
}
