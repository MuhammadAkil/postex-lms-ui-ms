export interface MerchantFormDto {
    accountCode?: string;
    addSettlementDetailDto?: SettlementDetailDto
    addUserRequest?: MerchantUserDto
    assignedModuleIds?: number[];
    averageMonthlyVolume?: number;
    categoryId?: number;
    cityId?: number;
    companyRegistrationNumber?: string;
    contactPersonEmail1?: string;
    contactPersonEmail2?: string;
    contactPersonName?: string;
    contactPersonPhone1?: string;
    contactPersonPhone2?: string;
    logoUrl?: string;
    maximumOrderValue?: number
    merchantAddress?: string;
    merchantEmail?: string;
    merchantName?: string;
    merchantNotificationDto?: MerchantNotificationDto
    merchantPhone?: string;
    minimumOrderValue?: number;
    profileImage?: string;
    registrationDate?: string;
    merchantStatusId?: number;
    merchantStatus?: string;
}

export interface SettlementDetailDto {
    bankId?: number;
    bankName?: string;
    bankAccountTitle?: string;
    ibanNumber?: string;
    vatNumber?: string;
    billingAddress?: string;
}

export interface MerchantUserDto {
    email?: string;
    fullName?: string;
    onlineAccess?: boolean;
    password?: string;
}

export interface MerchantNotificationDto {
    email1?: string;
    email2?: string;
    sms1?: string;
    sms2?: string;
    smsEnabled?:boolean;
    emailEnabled?:boolean;
  
}


export interface MerchantDto {
    merchantId: number;
    merchantName: string;
    accountCode?: string;
    merchantCode?: string;
    merchantEmail?: string;
    logoUrl?: string;
    merchantPhone?: string;
    merchantStatusId?: number;
    merchantStatus?: string;
    companyRegistrationDate?: string;
    merchantAddress?: string;
    merchantCategoryId?: number;
    merchantCategory?: string;
    contactPersonName?: string;
    contactPersonPhone1?: string;
    contactPersonPhone2?: string;
    contactPersonEmail1?: string;
    contactPersonEmail2?: string;
    companyRegistrationNumber?: string;
    merchantCityId?: number;
    merchantCity?: string;
    countryId?: number;
    countryName?: string;
    minimumOrderValue?: number;
    maximumOrderValue?: number;
    averageMonthlyVolume?: number;
    merchantNotificationResponseDto?: MerchantNotificationDto;
    merchantSettlementDetail?: SettlementDetailDto;
    userDetails?: MerchantUserDto;
    assignedModules?: Array<{ moduleName: string, moduleId:number}>;
    merchantProfileId?: number;
    transactionProcessing?: string;
    merchantProfile?: string;
    branchLimit?:number;
    [key: string]: any;
}

export interface MerchantBasicInformation {
    assignedModuleIds?: Array<number>;
    cityId?: number;
    logoUrl?: string;
    merchantCategoryId?: number;
    merchantName?: string;
    merchantStatusId?: number;
    profileImageUrl?: string;
    registrationDate?: string;
}


export interface MerchantContactInformation {
    contactPersonEmail1?: string;
    contactPersonEmail2?: string;
    contactPersonName?: string;
    contactPersonPhone1?: string;
    contactPersonPhone2?: string;
    merchantAddress?: string;
    merchantEmail?: string;
    merchantPhone?: string;
}


export interface BusinessStatistics {
    agent: string
    averageMonthlyVolume: number
    maximumOrderValue: number
    minimumOrderValue: number
    supportAgent: string
}
