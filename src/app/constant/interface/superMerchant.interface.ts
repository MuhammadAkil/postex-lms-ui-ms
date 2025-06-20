export interface SuperMerchantForm {
    active: boolean;
    addSuperMerchantUserDto: AddSuperMerchantUserDto;
    address: string;
    phone1: string;
    superMerchantCode: string;
    superMerchantName: string;
}

export interface AddSuperMerchantUserDto {
    email: string;
    fullName?: string;
    password?: string;
}


export interface SuperMerchantDto {
    superMerchantId: number;
    superMerchantCode: string;
    superMerchantName: string;
    active: boolean;
    phone?: string;
    address?: string;
    subMerchantsResponseDtoList?: Array<SubMerchantsResponseDtoList>;
    [key:string]:any;
}


export interface SubMerchantsResponseDtoList {
    merchantId?: number;
    merchantName?: string;
    email?: string;
    active?: boolean;
}
