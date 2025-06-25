export interface MerchantUserDto {
  email?: string;
  fullName?: string;
  onlineAccess?: boolean;
  password?: string;
}

export interface MerchantOwnerDetails {
  cnicBackImageBase64: string;
  cnicFrontImageBase64: string;
  cnicOrPassportNumber: string;
  contactNumber: string;
  dateOfBirth: string;
  email: string;
  fullName: string;
  selfieImageBase64: string;
}

export interface BankDetailsDto {
  bankId?: number;
  bankName?: string;
  accountTitle?: string; // Renamed from bankAccountTitle
  accountNumber?: string; // Renamed from ibanNumber
  iban?: string;
  billingAddress?: string;
}

export interface Document {
  date?: string;
  documentBase64?: string; // Renamed to match cURL
  name?: string;
}

export interface MerchantBasicInformation {
  merchantId: number;
  merchantName?: string;
  merchantPlatformId: string;
  platformId: number;
  businessAddress: string;
  businessRegistrationNumber: string;
  businessTypeId: number;
  industryId: number;
  cityId?: number;
  stateId: number;
  countryId: number;
}

export interface MerchantFormDto {
  basicInformation: MerchantBasicInformation;
  ownerDetails: MerchantOwnerDetails;
  bankDetails: BankDetailsDto;
  documents?: Document[];
  
  // addUserRequest?: MerchantUserDto; // Optional, not in cURL
}

export interface MerchantDto {
  merchantId: number;
  merchantName?: string;
  merchantPlatformId?: string;
  platformId?: number;
  businessAddress: string;
  businessRegistrationNumber: string;
  businessTypeId: number;
  industryId: number;
  cityId?: number;
  stateId: number;
  countryId: number;
  bankDetails: BankDetailsDto;
  userDetails?: MerchantUserDto;
  ownerDetails: MerchantOwnerDetails;
  documents?: Document[];
  [key: string]: any;
}