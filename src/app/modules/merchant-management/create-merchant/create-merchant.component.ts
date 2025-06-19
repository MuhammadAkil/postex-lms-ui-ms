import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantFormDto } from 'src/app/models/merchant.interface';
// import { MerchantFormDto } from 'src/app/constant/interface/merchant.interface';
// import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.scss']
})
export class CreateMerchantComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  mbInBytes = 1 * 1024 * 1024;
  currentStep: number = 1;
  today: Date = new Date();
  disabledFutureDate = (current: Date): boolean => current > new Date();
  submitted = false;
  isLoading: boolean = false;
  showPassword: boolean = false;
  conPassword: boolean = false;
  uploadedDocuments: Array<{ name: string, base64: string }> = [];
  passwordValidation: any = {
    length: false,
    number: false,
    upperCase: false,
    lowerCase: false,
  };

  // Dummy Data
  dummyCountryList = [
    { id: 1, name: 'Pakistan' },
    { id: 2, name: 'United States' },
    { id: 3, name: 'United Kingdom' },
  ];
  dummyCityList = [
    { id: 1, name: 'Karachi' },
    { id: 2, name: 'Lahore' },
    { id: 3, name: 'New York' },
  ];
  dummyBankList = [
    { id: 1, name: 'HBL' },
    { id: 2, name: 'UBL' },
    { id: 3, name: 'Bank of America' },
  ];

  steps: { id: number, name: string, icon: string, sequence: number }[] = [
    { id: 1, name: "Basic Information", icon: "", sequence: 1 },
    { id: 2, name: "Owner Details", icon: "", sequence: 2 },
    { id: 3, name: "Bank Details", icon: "", sequence: 3 },
    { id: 4, name: "Documents", icon: "", sequence: 4 },
  ];

  merchantForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private commonService: CommonService
  ) {
    this.createForm();
    this.steps = this.steps.sort((a, b) => a.sequence - b.sequence);
  }

  createForm() {
    this.merchantForm = this.fb.group({
      basicInformation: this.fb.group({
        logoUrl: [null],
        accountCode: [null, [Validators.required, Validators.maxLength(100)]],
        merchantName: [null, [Validators.required, Validators.maxLength(100)]],
        country: [null, [Validators.required]],
        cityId: [null, [Validators.required]],
      }),
      contactInformation: this.fb.group({
        email: [null, [Validators.required, Validators.maxLength(320), Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(11)]],
        merchantAddress: [null, [Validators.required, Validators.maxLength(500)]],
        contactPersonName: [null, [Validators.required, Validators.maxLength(128)]],
      }),
      settlementDetail: this.fb.group({
        bankId: [null, [Validators.required]],
        bankAccountTitle: [null, [Validators.required, Validators.maxLength(100)]],
        ibanNumber: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(34)]],
        vatNumber: [null, [Validators.required, Validators.maxLength(50)]],
        billingAddress: [null, [Validators.required, Validators.maxLength(1000)]],
      }),
      attachment: [null],
    });
  }

  get basicInformation(): FormGroup {
    return this.merchantForm.controls['basicInformation'] as FormGroup;
  }

  get contactInformation(): FormGroup {
    return this.merchantForm.controls['contactInformation'] as FormGroup;
  }

  get settlementDetail(): FormGroup {
    return this.merchantForm.controls['settlementDetail'] as FormGroup;
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) throw new Error('cannot use multiple files');
    this.readFile(event.target.files[0]);
    this.fileUpload.nativeElement.value = "";
  }

  readFile(file: any) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.basicInformation.controls['logoUrl'].setValue(reader.result as string);
    };
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['png', 'jpeg', 'jpg'].includes(ext)) {
        // this.commonService.errorMessage({
        //   message: "Please upload valid image file",
        //   title: "Invalid File",
        // });
        return;
      } else if (file.size > this.mbInBytes * 5) {
        // this.commonService.errorMessage({
        //   message: "File size is more than 5MB",
        //   title: "File Size",
        // });
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  mapFromDto(): MerchantFormDto {
    let base64Img = this.basicInformation.value.logoUrl?.toString().split(',')[1];
    this.basicInformation.controls['logoUrl'].setValue(base64Img);
    var merchant: MerchantFormDto = {
      ...this.basicInformation.value,
      ...this.contactInformation.value,
      addSettlementDetailDto: this.settlementDetail.value,
      merchantEmail: this.contactInformation.value.email,
      merchantPhone: this.contactInformation.value.phone,
    };
    return merchant;
  }

  uploadDocument(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) throw new Error('cannot use multiple files');
    this.dragDocument(event.target.files[0]);
    this.fileUpload.nativeElement.value = "";
  }

  dragDocument(file: any) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedDocuments.push({ name: file.name, base64: reader.result as string });
    };
    if (file) {
      if (file.size > this.mbInBytes * 5) {
        // this.commonService.errorMessage({ message: "File size is more than 5MB", title: "File Size", });
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  removeDocument(doc: { name: string, base64: string }): void {
    this.uploadedDocuments = this.uploadedDocuments.filter(d => d !== doc);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showConPassword() {
    this.conPassword = !this.conPassword;
  }

  incrementStep(form: any) {
    if (form.valid) {
      this.currentStep++;
      this.submitted = true;
    } else if (form.invalid) {
      form.markAllAsTouched();
      this.submitted = false;
    }
  }

  createMerchant() {
    if (this.merchantForm.invalid === false) {
      this.isLoading = true;
      // Dummy success response for now
      setTimeout(() => {
        this.isLoading = false;
        // this.commonService.successMessage({
        //   title: "Success",
        //   message: "Merchant created successfully",
        // });
        this.currentStep = 5; // Move to a success state (e.g., merchantCreatedTemp)
      }, 1000);
    }
  }

  validate(target: any) {
    const value = target.value;
    this.passwordValidation.length = value.length >= 8 ? true : false;
    this.passwordValidation.number = /[0-9]/.test(value) ? true : false;
    this.passwordValidation.upperCase = /[A-Z]/.test(value) ? true : false;
    this.passwordValidation.lowerCase = /[a-z]/.test(value) ? true : false;
  }
}