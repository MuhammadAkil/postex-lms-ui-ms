export class SearchCriteria {
    merchantId?:number;
    orderRefNumber?: string;
    omsOrderRefNumber?:string;
    storeOrderRefNumber?:string;
    orderReferenceNumber?: string;
    transactionTypeIds?:Array<number>;
    trackingNumber?: string;
    customerName?: string;
    merchantName?: string;
    customerPhone?: string;
    toDate?: string;
    fromDate?: string;
    pagination?: 'enable' | 'disable';
    page?: number | Number = 0;
    size?: number | Number =25;
    transactionStatusIds?:Array<number>;
    schedulerStatusId?:number;
    schedulerTypeId?:number;
    active?:boolean;
    ruleTypeId?:any;
    invoicePayment?:string | number;
    shipmentTypeIds?:Array<number>;
    deliveryTypeIds?:number;
}