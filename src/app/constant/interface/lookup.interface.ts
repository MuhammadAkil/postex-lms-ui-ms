
export interface DeliveryCity {
    cityId: number
    cityName: string
    active: boolean
    countryId: number
    countryName: string
}

export interface Country {
    statusCode: any
    countryId: number;
    countryName: string;
    active?: boolean;
}
export interface BusinessType {
    businessTypeId: number;
    businessTypeName: string;
}
export interface State {
    countryId: number;
    stateName: string;
    stateId: number;
}
export interface City {
    cityId: number;
    cityName: string;
    stateId: number;
}
export interface Partner {
    partnerId: number;
    partnerName: string;
    partnerAccountId: string;
}
export interface Industry {
    industryId: number;
    industryName: string;
}
export interface Platform {
    platformId: number;
    platformName: string;
}

export interface MerchantCategory {
    merchantCategoryId: number;
    merchantCategory: string;
}

export interface Module {
    moduleId: number;
    moduleName: string;
}

export interface Bank {
    bankId: number;
    bankCode: string;
    bankName: string;
}
export interface Profile {
    merchantProfileId: Number,
    profile: string
}
export interface userRoles {
    roleId: Number,
    roleName: string
    userId:Number
}



export interface MerchantLookup {
    merchantId: number
    merchantName: string
    merchantCode: string
    merchantCategoryId: number
    merchantCategory: string
}
