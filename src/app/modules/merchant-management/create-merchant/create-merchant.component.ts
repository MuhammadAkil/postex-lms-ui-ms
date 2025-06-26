import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessType, City, Country, Industry, Partner, Platform, State } from 'src/app/constant/interface/lookup.interface';
import { MerchantFormDto } from 'src/app/constant/interface/merchant.interface';
import { CommonService } from 'src/app/services/common.service';
import { LookupService } from 'src/app/services/lookup.service';
import { MerchantService } from 'src/app/services/merchant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.scss']
})
export class CreateMerchantComponent implements OnInit {
  @ViewChild('selfieUpload') selfieUpload!: ElementRef;
  @ViewChild('cnicFrontUpload') cnicFrontUpload!: ElementRef;
  @ViewChild('cnicBackUpload') cnicBackUpload!: ElementRef;
  @ViewChild('documentUpload') documentUpload!: ElementRef; 
  
  countryList: Country[] = [];
  platformList: Platform[] = [];
  businessTypeList: BusinessType[] = [];
  industryList: Industry[] = [];
  partnerList: Partner[] = [];
  stateList: State[] = [];
  cityList: City[] = [];

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
  };

  dummyMerchantList = [
    { id: 1, name: 'Merchant A' },
    { id: 2, name: 'Merchant B' },
  ];
  dummyPlatformIdList = [
    { id: 1, name: 'ID 001' },
    { id: 2, name: 'ID 002' },
  ];
  dummyBankList = [
    { id: 1, name: 'HBL' },
    { id: 2, name: 'UBL' },
  ];

  documentTypes = [
  { name: 'NTN Certificate', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Incorporation Certificate', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Bank Statement', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Authority Letter', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Board Resolution / Proprietorship Declaration', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Utility Bill Pictures', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Past Purchase Orders', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Past Invoices', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Business Image/Logo', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
  { name: 'Collateral', date: null, fileUrl: null, uploadingFileName: '', progress: 0 },
];


  steps: { id: number; name: string; icon: string; sequence: number }[] = [
    { id: 1, name: 'Basic Information', icon: 'assets/svgs/basic-info.svg', sequence: 1 },
    { id: 2, name: 'Owner Details', icon: 'assets/svgs/owner-detail.svg', sequence: 2 },
    { id: 3, name: 'Bank Details', icon: 'assets/svgs/bank-detail.svg', sequence: 3 },
    { id: 4, name: 'Documents', icon: 'assets/svgs/document.svg', sequence: 4 },
  ];

  merchantForm!: FormGroup;
  dynamicFields: { label: string; value: string }[] = [];
  private subscriptions: Subscription[] = [];

  uploadProgress: { [key: string]: number } = { selfieUrl: 0, cnicFrontUrl: 0, cnicBackUrl: 0 };
  uploadedFiles: { [key: string]: string } = { selfieUrl: '', cnicFrontUrl: '', cnicBackUrl: '' };

  constructor(
    private fb: FormBuilder,
    private lookupService: LookupService,
    private merchantService: MerchantService,
    private commonService: CommonService
  ) {
    this.createForm();
    this.steps = this.steps.sort((a, b) => a.sequence - b.sequence);
  }

  ngOnInit(): void {
    const countrySub = this.basicInformation.get('countryId')?.valueChanges.subscribe(countryId => {
      this.stateList = [];
      this.cityList = [];
      this.basicInformation.patchValue({ stateId: null, cityId: null });
      if (countryId) this.getStates(countryId);
    });

    const stateSub = this.basicInformation.get('stateId')?.valueChanges.subscribe(stateId => {
      this.cityList = [];
      this.basicInformation.patchValue({ cityId: null });
      if (stateId) this.getCities(stateId);
    });

    if (countrySub) this.subscriptions.push(countrySub);
    if (stateSub) this.subscriptions.push(stateSub);

    this.getCountries();
    this.getPlatforms();
    this.getBusinessTypes();
    this.getIndustries();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getCountries() {
    this.lookupService.getCountryList().subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.countryList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load countries.' })
    });
  }

  getPlatforms() {
    this.lookupService.getPlatformList().subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.platformList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load platforms.' })
    });
  }

  getBusinessTypes() {
    this.lookupService.getBusinessTypeList().subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.businessTypeList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load business types.' })
    });
  }

  getIndustries() {
    this.lookupService.getIndustryList().subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.industryList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load industries.' })
    });
  }

  getStates(countryId?: number) {
    this.lookupService.getStateList(countryId).subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.stateList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load states.' })
    });
  }

  getCities(stateId?: number) {
    this.lookupService.getCityList(stateId).subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.cityList = d.dist || [];
        }
      },
      error: () => this.commonService.errorMessage({ title: 'Error', message: 'Failed to load cities.' })
    });
  }

  createForm() {
    this.merchantForm = this.fb.group({
      basicInformation: this.fb.group({
        platformId: [null, [Validators.required]],
        merchantId: [0, [Validators.required]],
        merchantPlatformId: [null, [Validators.required]],
        businessType: [null, [Validators.required]],
        businessRegistrationNumber: [null, [Validators.required, Validators.maxLength(100)]],
        industry: [null, [Validators.required]],
        countryId: [null, [Validators.required]],
        stateId: [null, [Validators.required]],
        cityId: [null, [Validators.required]],
        businessAddress: [null, [Validators.required, Validators.maxLength(500)]],
        merchantName: ['Test Merchant', [Validators.required]],
      }),
      ownerDetails: this.fb.group({
        contactPersonName: [null, [Validators.required, Validators.maxLength(128)]],
        email: [null, [Validators.required, Validators.maxLength(320), Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-zA-Z]{2,}$')]],
        cnicOrPassportNumber: [null, [Validators.required, Validators.maxLength(50)]],
        phone: [null, [Validators.required, Validators.pattern('^\\+?[0-9]{10,14}$')]],
        dateOfBirth: [null, [Validators.required]],
        selfieUrl: [null],
        cnicFrontUrl: ['', [Validators.required]],
        cnicBackUrl: [null],
      }),
      bankDetails: this.fb.group({
        bankName: [null],
        bankId: [null, [Validators.required]],
        accountTitle: [null, [Validators.required, Validators.maxLength(100)]],
        accountNumber: [null, [Validators.required, Validators.maxLength(50)]],
        iban: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(34)]],
      }),
      attachment: [null],
    });
  }

  get basicInformation(): FormGroup {
    return this.merchantForm.controls['basicInformation'] as FormGroup;
  }

  get ownerDetails(): FormGroup {
    return this.merchantForm.controls['ownerDetails'] as FormGroup;
  }

  get bankDetails(): FormGroup {
    return this.merchantForm.controls['bankDetails'] as FormGroup;
  }

  onFileChange(event: any, field: string, uploadRef: ElementRef, isDocument = false, doc?: { name: string; date: Date | null; fileUrl: string | null ;  progress: number;  uploadingFileName: string;
}) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) {
      this.commonService.errorMessage({ title: 'Error', message: 'Cannot use multiple files.' });
      return;
    }
    if (isDocument && doc) {
      this.readFileForDocument(target.files[0], doc);
    } else {
      this.readFile(target.files[0], field, uploadRef);
    }
    uploadRef.nativeElement.value = '';
  }

  readFile(file: File, field: string, uploadRef: ElementRef) {
    const reader: FileReader = new FileReader();
    this.uploadedFiles[field] = file.name;
    this.uploadProgress[field] = 0;

    // Simulate progress for small files (since onprogress may not fire)
    const total = file.size;
    let loaded = 0;
    const chunkSize = 1024 * 1024; // 1MB chunks
    const readInChunks = () => {
      const chunk = file.slice(loaded, loaded + chunkSize);
      loaded += chunkSize;
      this.uploadProgress[field] = Math.min((loaded / total) * 100, 100);
      if (loaded < total) {
        reader.readAsBinaryString(chunk);
      } else {
        reader.readAsDataURL(file); // Final read for full data
      }
    };

    reader.onload = (e: any) => {
      if (['selfieUrl', 'cnicFrontUrl', 'cnicBackUrl'].includes(field)) {
        this.ownerDetails.controls[field].setValue(reader.result as string);
      } else {
        this.basicInformation.controls[field]?.setValue(reader.result as string);
      }
      this.uploadProgress[field] = 100;
    };

    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['png', 'jpeg', 'jpg', 'pdf'].includes(ext || '')) {
        this.commonService.errorMessage({ title: 'Error', message: 'Invalid file format. Use PNG, JPEG, JPG, or PDF.' });
        return;
      } else if (file.size > this.mbInBytes * 5) {
        this.commonService.errorMessage({ title: 'Error', message: 'File size exceeds 5MB.' });
        return;
      }
      readInChunks(); // Start reading in chunks
    }
  }

  uploadSelfie(event: any) {
    this.onFileChange(event, 'selfieUrl', this.selfieUpload);
  }

  uploadCnicFront(event: any) {
    this.onFileChange(event, 'cnicFrontUrl', this.cnicFrontUpload);
  }

  uploadCnicBack(event: any) {
    this.onFileChange(event, 'cnicBackUrl', this.cnicBackUpload);
  }

  readFileForContact(file: File, field: string) {
    this.readFile(file, field, this.selfieUpload);
  }

 uploadDocument(event: any, doc: { name: string; date: Date | null; fileUrl: string | null;  progress: number;uploadingFileName: string;}) {
    this.onFileChange(event, '', this.documentUpload, true, doc); 
  }

readFileForDocument(file: File, doc: {name: string;date: Date | null;fileUrl: string | null;uploadingFileName: string;progress: number;})
 {
  const reader: FileReader = new FileReader();
  reader.onload = () => {
    doc.fileUrl = reader.result as string;
    doc.date = new Date();
    doc.uploadingFileName = file.name;
    doc.progress = 100;
  };

  if (file) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['png', 'jpeg', 'jpg', 'pdf'].includes(ext || '')) {
      this.commonService.errorMessage({ title: 'Error', message: 'Invalid file format. Use PNG, JPEG, JPG, or PDF.' });
      return;
    } else if (file.size > this.mbInBytes * 5) {
      this.commonService.errorMessage({ title: 'Error', message: 'File size exceeds 5MB.' });
      return;
    }

    reader.readAsDataURL(file);
  }
}



  removeDocument(doc: { name: string; date: Date | null; fileUrl: string | null }): void {
    doc.fileUrl = null;
    doc.date = null;
  }

  mapFromDto(): MerchantFormDto {
    const documents = this.documentTypes
      .filter(doc => doc.fileUrl)
      .map(doc => ({
        name: doc.name,
        documentBase64: (doc.fileUrl as unknown as string).split(',')[1],
        date: (doc.date || new Date()).toISOString(),
      }));

    return {
      basicInformation: {
        platformId: this.basicInformation.get('platformId')?.value,
        merchantId: this.basicInformation.get('merchantId')?.value,
        merchantPlatformId: this.basicInformation.get('merchantPlatformId')?.value,
        businessTypeId: this.basicInformation.get('businessType')?.value,
        businessRegistrationNumber: this.basicInformation.get('businessRegistrationNumber')?.value,
        industryId: this.basicInformation.get('industry')?.value,
        countryId: this.basicInformation.get('countryId')?.value,
        stateId: this.basicInformation.get('stateId')?.value,
        cityId: this.basicInformation.get('cityId')?.value,
        businessAddress: this.basicInformation.get('businessAddress')?.value,
        merchantName: this.basicInformation.get('merchantName')?.value,
      },
      ownerDetails: {
        fullName: this.ownerDetails.get('contactPersonName')?.value,
        email: this.ownerDetails.get('email')?.value,
        cnicOrPassportNumber: this.ownerDetails.get('cnicOrPassportNumber')?.value,
        contactNumber: this.ownerDetails.get('phone')?.value,
        dateOfBirth: this.ownerDetails.get('dateOfBirth')?.value?.toISOString(),
        selfieImageBase64: this.ownerDetails.get('selfieUrl')?.value?.split(',')[1] || '',
        cnicFrontImageBase64: this.ownerDetails.get('cnicFrontUrl')?.value?.split(',')[1] || '',
        cnicBackImageBase64: this.ownerDetails.get('cnicBackUrl')?.value?.split(',')[1] || '',
      },
      bankDetails: {
        bankName: this.bankDetails.get('bankName')?.value,
        bankId: this.bankDetails.get('bankId')?.value,
        accountTitle: this.bankDetails.get('accountTitle')?.value,
        accountNumber: this.bankDetails.get('accountNumber')?.value,
        iban: this.bankDetails.get('iban')?.value,
      },
      documents,
    };
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
    if (!this.merchantForm.valid) {
      this.merchantForm.markAllAsTouched();
      this.commonService.errorMessage({ title: 'Error', message: 'Please fill all required fields correctly.' });
      return;
    }

    this.isLoading = true;
    const payload = this.mapFromDto();
    const payloadSize = new Blob([JSON.stringify(payload)]).size; // Size in bytes
  console.log('Payload Size (bytes):', payloadSize, 'Payload:', payload);
    
    this.merchantService.createMerchant(payload).subscribe({
      next: (d: any) => {
        if (d.statusCode?.toString().startsWith('20')) {
          this.isLoading = false;
          this.commonService.successMessage({
            title: 'Success',
            message: 'Merchant created successfully',
          });
          // this.currentStep = 5;
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Error Details:', err); 
        const errorMessage =
          err?.status === 500
            ? 'Oops, an unexpected error occurred. Please try again later.'
            : err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message || 'An error occurred.';
        this.commonService.errorMessage({
          title: err?.status?.toString() || 'Error',
          message: errorMessage,
        });
        this.merchantForm.markAllAsTouched();
      }
    });
  }

  validate(target: any) {
    const value = target.value;
    this.passwordValidation.length = value.length >= 8;
    this.passwordValidation.number = /[0-9]/.test(value);
    this.passwordValidation.upperCase = /[A-Z]/.test(value);
    this.passwordValidation.lowerCase = /[a-z]/.test(value);
  }

  addNewField() {
    this.dynamicFields.push({ label: '', value: '' });
    this.basicInformation.controls['dynamicFields']?.setValue(this.dynamicFields);
  }

  removeField(index: number) {
    this.dynamicFields.splice(index, 1);
    this.basicInformation.controls['dynamicFields']?.setValue(this.dynamicFields);
  }

  updateFieldValue(index: number) {
    this.basicInformation.controls['dynamicFields']?.setValue(this.dynamicFields);
  }
}