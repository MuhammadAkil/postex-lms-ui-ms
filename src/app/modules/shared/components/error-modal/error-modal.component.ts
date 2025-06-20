import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message?:string, title?:string, buttonText?:string, buttonLink?:string},
    private dialog:MatDialogRef<ErrorModalComponent>,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.dialog.close(true);
  }

  navigateTo(){
    this.router.navigate([this.data.buttonLink]);
    this.dialog.close(true);
  }
}
