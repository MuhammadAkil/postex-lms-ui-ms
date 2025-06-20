import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantFormDto } from 'src/app/models/merchant.interface';

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
  disabledFutureDate = (current: Date): boolean => current > this.today;
  submitted = false;
  isLoading: boolean = false;
  showPassword: boolean = false;
  conPassword: boolean = false;
  passwordValidation: any = {
        length: false,
        number: false,
        upperCase: false,
        lowerCase: false,
    }

  // Dummy Data
  dummyPlatformList = [
    { id: 1, name: 'Platform A' },
    { id: 2, name: 'Platform B' },
  ];
  dummyMerchantList = [
    { id: 1, name: 'Merchant A' },
    { id: 2, name: 'Merchant B' },
  ];
  dummyPlatformIdList = [
    { id: 1, name: 'ID 001' },
    { id: 2, name: 'ID 002' },
  ];
  dummyBusinessTypeList = [
    { id: 1, name: 'Sole Proprietorship' },
    { id: 2, name: 'Partnership' },
  ];
  dummyIndustryList = [
    { id: 1, name: 'Retail' },
    { id: 2, name: 'Technology' },
  ];
  dummyStateList = [
    { id: 1, name: 'Sindh' },
    { id: 2, name: 'Punjab' },
  ];
  dummyCountryList = [
    { id: 1, name: 'Pakistan' },
    { id: 2, name: 'United States' },
  ];
  dummyCityList = [
    { id: 1, name: 'Karachi' },
    { id: 2, name: 'Lahore' },
  ];
  dummyBankList = [
    { id: 1, name: 'HBL' },
    { id: 2, name: 'UBL' },
  ];

  documentTypes = [
    { name: 'NTN Certificate', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Incorporation Certificate', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Bank Statement', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Authority Letter', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Board Resolution / Proprietorship Declaration', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Utility Bill Pictures', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Past Purchase Orders', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Past Invoices', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Business Image/Logo', date: null as Date | null, fileUrl: null as string | null },
    { name: 'Collateral', date: null as Date | null, fileUrl: null as string | null },
  ];

  steps: { id: number, name: string, icon: string, sequence: number }[] = [
    { id: 1, name: "Basic Information", icon: "assets/svgs/basic-info.svg", sequence: 1 },
    { id: 2, name: "Owner Details", icon: "assets/svgs/owner-detail.svg", sequence: 2 },
    { id: 3, name: "Bank Details", icon: "assets/svgs/bank-detail.svg", sequence: 3 },
    { id: 4, name: "Documents", icon: "assets/svgs/document.svg", sequence: 4 },
  ];

  merchantForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.steps = this.steps.sort((a, b) => a.sequence - b.sequence);
  }

  createForm() {
    this.merchantForm = this.fb.group({
      basicInformation: this.fb.group({
        logoUrl: [null],
        platformId: [null, [Validators.required]],
        merchantId: [null, [Validators.required]],
        merchantPlatformId: [null, [Validators.required]],
        businessType: [null, [Validators.required]],
        businessRegistrationNumber: [null, [Validators.required, Validators.maxLength(100)]],
        industry: [null, [Validators.required]],
        country: [null, [Validators.required]],
        stateProvince: [null, [Validators.required]],
        cityId: [null, [Validators.required]],
        businessAddress: [null, [Validators.required, Validators.maxLength(500)]],
      }),
      contactInformation: this.fb.group({
        contactPersonName: [null, [Validators.required, Validators.maxLength(128)]],
        email: [null, [Validators.required, Validators.maxLength(320), Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        cnicPassportNumber: [null, [Validators.required, Validators.maxLength(50)]],
        phone: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(11)]],
        dateOfBirth: [null, [Validators.required]],
        selfieUrl: [null],
        cnicBackUrl: [null],
      }),
      settlementDetail: this.fb.group({
        bankId: [null, [Validators.required]],
        bankAccountTitle: [null, [Validators.required, Validators.maxLength(100)]],
        accountNumber: [null, [Validators.required, Validators.maxLength(50)]],
        ibanNumber: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(34)]],
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
    this.readFile(target.files[0]);
    this.fileUpload.nativeElement.value = "";
  }

  readFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.basicInformation.controls['logoUrl'].setValue(reader.result as string);
    };
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['png', 'jpeg', 'jpg'].includes(ext || '')) {
        return;
      } else if (file.size > this.mbInBytes * 5) {
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  uploadSelfie(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) throw new Error('cannot use multiple files');
    this.readFileForContact(target.files[0], 'selfieUrl');
    this.fileUpload.nativeElement.value = "";
  }

  uploadCnicBack(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) throw new Error('cannot use multiple files');
    this.readFileForContact(target.files[0], 'cnicBackUrl');
    this.fileUpload.nativeElement.value = "";
  }

  readFileForContact(file: File, field: string) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.contactInformation.controls[field].setValue(reader.result as string);
    };
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['png', 'jpeg', 'jpg', 'pdf'].includes(ext || '')) {
        return;
      } else if (file.size > this.mbInBytes * 5) {
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  uploadDocument(event: any, doc: { name: string, date: Date | null, fileUrl: string | null }) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) throw new Error('cannot use multiple files');
    this.readFileForDocument(target.files[0], doc);
    this.fileUpload.nativeElement.value = "";
  }

  readFileForDocument(file: File, doc: { name: string, date: Date | null, fileUrl: string | null }) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      doc.fileUrl = reader.result as string;
    };
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['png', 'jpeg', 'jpg', 'pdf'].includes(ext || '')) {
        return;
      } else if (file.size > this.mbInBytes * 5) {
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  removeDocument(doc: { name: string, date: Date | null, fileUrl: string | null }): void {
    doc.fileUrl = null;
    doc.date = null;
  }

  mapFromDto(): MerchantFormDto {
    let base64Img = this.basicInformation.value.logoUrl ? this.basicInformation.value.logoUrl.toString().split(',')[1] : null;
    this.basicInformation.controls['logoUrl'].setValue(base64Img);
    const documents = this.documentTypes
      .filter(doc => doc.fileUrl)
      .map(doc => ({
        name: doc.name,
        base64: doc.fileUrl!.toString().split(',')[1],
        date: doc.date || new Date(),
      }));
    var merchant: MerchantFormDto = {
      ...this.basicInformation.value,
      ...this.contactInformation.value,
      addSettlementDetailDto: this.settlementDetail.value,
      merchantEmail: this.contactInformation.value.email,
      merchantPhone: this.contactInformation.value.phone,
      documents: documents,
    };
    return merchant;
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
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 5; // Move to a success state
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