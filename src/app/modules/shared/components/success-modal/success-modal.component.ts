import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message?:string, title?:string, buttonText?:string, buttonLink?:string},
    private dialog:MatDialog,
    
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialog.closeAll()
  }

  navigateTo() {
    if (this.data.buttonLink) {
      this.router.navigate([this.data.buttonLink]);      
    }
    this.dialog.closeAll()
  }
}
