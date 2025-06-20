import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorModalComponent } from '../modules/shared/components/error-modal/error-modal.component';
import { SuccessModalComponent } from '../modules/shared/components/success-modal/success-modal.component';
import { ConfirmationComponent } from '../modules/shared/components/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
isLoading : boolean = false;
  constructor( private dialog:MatDialog) { }

  successMessage(data:{message?:string, title?:string, buttonText?:string, buttonLink?:string}){
    if(!this.isLoading){
      this.isLoading = true;
      this.dialog.open(SuccessModalComponent,{
        data:data,
        minWidth: "400px",
        width:"100%",
        maxWidth:"450px",
        autoFocus:false,
      }).afterClosed().subscribe((d:any)=>{
        this.isLoading = false;
      })
    }
  }

  errorMessage(data:{message?:string, title?:string, buttonText?:string, buttonLink?:string}){
    if(!this.isLoading){
      this.isLoading = true;
      this.dialog.open(ErrorModalComponent,{
        data:data,
        minWidth: "400px",
        width: "100%",
        maxWidth:"450px",
        autoFocus:false,
      }).afterClosed().subscribe((d:any)=>{
        this.isLoading = false;
      })
    }
  }

  confirmation(data: { message?: string, title?: string }): MatDialogRef<ConfirmationComponent> | null {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: data,
      minWidth: "400px",
      width: "100%",
      maxWidth: "450px",
      autoFocus: false,
    });
    return dialogRef;
  }
}
