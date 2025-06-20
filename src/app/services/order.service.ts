import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { OrderList } from '../constant/interface/orderlist.interface';
import { OrderDetail } from '../constant/interface/orderDetail.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrderList(obj: any): Observable<ResponseDTO<OrderList[]>> {
    return this.http.get('/order/list', { params: obj });
  }
  getOrderDetail(params:any): Observable<ResponseDTO<OrderDetail>> {
    return this.http.get(`/order/detail`, {params:params})
  }
  getOrderJourney(transactionId: any): Observable<ResponseDTO<any>> {
    return this.http.get(`/order/${transactionId}/journey`)
  }
}
