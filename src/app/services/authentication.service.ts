import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router:Router) { }


  login(form:{email:string,password:string, applicationTypeId:number}):Observable<ResponseDTO<any>>{
    return this.http.post('/user/login',form,{});
  }

  subMerchantLogin(form: { merchantId: number, email: string }): Observable<ResponseDTO<any>> {
    return this.http.get('/super-merchant/subMerchantLogin', {params:form});
  }

  logOut():Observable<ResponseDTO<any>>{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return this.http.post('/user/logout',{ "appToken": dist?.appToken, "userId": dist?.userId },{});
  }

  getToken():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.appToken || ""
  }

  getSuperMerchantToken():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.superMerchantToken || ""
  }

  getFullName():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.fullName || ""
  }
  getProfileLogo():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.logoUrl || ""
  }

  getMerchantId():number{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.merchantId || ""
  }
  isSuperMerchant():boolean{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.superMerchantToken? true : false
  }

  getUserId():number{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.userId || ""
  }

  getUserTypeId(): number {
    // 1 = admin, 2= Back-office User, 3= Super Merchant User, 4= Merchant User;
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.userTypeId || 4
  }

  getUserType(): string {
    // 1 = admin, 2= Back-office User, 3= Super Merchant User, 4= Merchant User;
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.userType || "";
  }

  isWMSallowed(): Boolean {
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.moduleIds?.includes(2) || false; //  OMS Module = 1, WMS Module = 2
  }

  getEmail():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.email || ""
  }

  logout(){
    if(this.getToken()){
      this.logOut().pipe(take(1)).subscribe(d=>{
        if(d.statusCode?.toString().startsWith('20')){
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/auth']);
        }
      });
    }else {
      this.router.navigate(['/auth']);
    }
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth']);
  }

  saveUser(data:any,rememberMe:boolean){
    var storage = rememberMe? localStorage : sessionStorage;
    storage.setItem(environment.storageKey,JSON.stringify(data) || '');
  }

  sendRecoveryEmail(email:string):Observable<ResponseDTO<any>>{
    return this.http.post('/user/forget-password',{email:email},{});
  }

  verifyResetToken(token:string):Observable<ResponseDTO<any>>{
    return this.http.post('/user/reset-password/token/verify',{resetPasswordToken:token},{});
  }

  updatePassword(form:{userId:number, newPassword:string, confirmPassword:string}):Observable<ResponseDTO<any>>{
    return this.http.post(`/user/${form.userId}/reset-password`,form,{});
  }

  updateUserProfile(obj:any):Observable<ResponseDTO<any>>{
    return this.http.patch(`/user/${obj.userId}`, obj);
  }

  getMerchantName():string{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.merchantName || ""
  }

  getMerchantCountryId():number{
    const dist = JSON.parse(sessionStorage.getItem(environment.storageKey) || localStorage.getItem(environment.storageKey) || "{}");
    return dist?.merchantCountryId || null
  }
}
