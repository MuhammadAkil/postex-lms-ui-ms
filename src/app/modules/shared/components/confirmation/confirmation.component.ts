import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message?: string, title?: string },
    private dialog: MatDialogRef<ConfirmationComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialog.close(false);
  }

  submit() {
    this.dialog.close(true);
  }
}
