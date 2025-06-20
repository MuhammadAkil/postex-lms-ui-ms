
export interface DeliveryCity {
    cityId: number
    cityName: string
    active: boolean
    countryId: number
    countryName: string
}

export interface Country {
    countryId: number;
    countryName: string;
    active: boolean;
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


export interface MerchantLookup {
    merchantId: number
    merchantName: string
    merchantCode: string
    merchantCategoryId: number
    merchantCategory: string
}
