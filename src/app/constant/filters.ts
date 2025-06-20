export interface FilterObject { 
    label?: string,
    variable?: string | any, 
    check?: boolean, 
    value?: any, 
    placeholder?: string, 
    isDisable?: boolean, 
    isMultiple?: boolean, 
    options?: { label?: string | {}, value?: number | string }[], 
    dafaultType?: 'customer' | 'search', 
    type?: 'date' | 'text' | 'number' | 'select', ids?: any[], 
    [others: string]: any; 
}
export class ConstantFilterVariable {
    public static date = 'date';
    public static customerName = 'customerName';
    
    
    public static superMerchantName = 'superMerchantName';
    public static address = 'address';
    public static phone = "phone";
    public static superMerchantCode = 'superMerchantCode';
    public static customerPhone = "customerPhone";


    public static trackingNumber = 'trackingNumber';
    public static omsOrderRefNumber = 'omsOrderRefNumber';
    public static storeOrderRefNumber = "storeOrderRefNumber";
    public static merchantName = 'merchantName';
    public static accountCode = 'accountCode';
    public static merchantCode = 'merchantCode';
    public static merchantId = 'merchantId';




    public static branchIds = 'Branch';
    public static deliveryCompanyIds = 'Delivery Company';

    public static deliveryCityIds = 'Delivery City';
    public static merchantCityId = 'City';
    public static transactionTypeIds = 'Payment Method';
    public static transactionStatusIds = 'Status';
    
}
export class ConstantFilterLabel {
    public static date = 'Date';
    public static customerName = 'Name';  

    public static merchantName = 'Merchant Name';
    public static accountCode = 'Account Code';
    public static merchantCode = 'Merchant Code';

    public static superMerchantName = 'Super Merchant Name';
    public static address = 'Address';
    public static phone = "Phone";
    public static superMerchantCode = 'Super Merchant Code';

    public static ContactNumber = 'Mobile Number';
    public static omsOrderRefNumber = 'OMS Ref.#';
    public static storeOrderRefNumber = "Store Ref.#";
    public static trackingNumber = 'Tracking #';

    public static branchIds = 'Branch';
    public static deliveryCompanyIds = 'Delivery Company';
    public static merchantId = 'Merchant';
    public static merchantCityId = 'City';
    public static deliveryCityIds = 'Delivery City';
    public static transactionTypeIds = 'Payment Method';
    public static transactionStatusIds = 'Status';

}
const Filters: FilterObject[] = [
    { label: ConstantFilterLabel.date, variable: ConstantFilterVariable.date, check: true, value: {fromDate:'',toDate:''}, placeholder: "", options: [], type: "date" },
   
   
    { label: ConstantFilterLabel.superMerchantName, variable: ConstantFilterVariable.superMerchantName, check: true, value: "", placeholder: "e.g Jhon Doe", options: [], dafaultType: 'customer', type: "text" },
    { label: ConstantFilterLabel.address, variable: ConstantFilterVariable.address, check: true, value: "", placeholder: "e.g abc...", options: [], dafaultType: 'customer', type: "text" },
    { label: ConstantFilterLabel.phone, variable: ConstantFilterVariable.phone, check: true, value: "", placeholder: "e.g 971XXXXXXXXXX", options: [], dafaultType: 'customer', type: "number" },
    { label: ConstantFilterLabel.superMerchantCode, variable: ConstantFilterVariable.superMerchantCode, check: true, value: "", placeholder: "e.g 000...", options: [], dafaultType: 'search', type: "text" },
   
    { label: ConstantFilterLabel.customerName, variable: ConstantFilterVariable.customerName, check: true, value: "", placeholder: "e.g Jhon Doe", options: [], dafaultType: 'customer', type: "text" },
    { label: ConstantFilterLabel.ContactNumber, variable: ConstantFilterVariable.customerPhone, check: true, value: "", placeholder: "e.g 971XXXXXXXXXX", options: [], dafaultType: 'customer', type: "number" },
    
     
    { label: ConstantFilterLabel.merchantName, variable: ConstantFilterVariable.merchantName, check: true, value: "", placeholder: "e.g Jhon Doe", options: [], dafaultType: 'customer', type: "text" },
    { label: ConstantFilterLabel.accountCode, variable: ConstantFilterVariable.accountCode, check: true, value: "", placeholder: "e.g...", options: [], dafaultType: 'search', type: "text" },
    { label: ConstantFilterLabel.merchantCode, variable: ConstantFilterVariable.merchantCode, check: true, value: "", placeholder: "e.g...", options: [], dafaultType: 'search', type: "text" },

    { label: ConstantFilterLabel.omsOrderRefNumber, variable: ConstantFilterVariable.omsOrderRefNumber, check: true, value: "", placeholder: "e.g 0000...", options: [], dafaultType: 'search', type: "text" },
    { label: ConstantFilterLabel.storeOrderRefNumber, variable: ConstantFilterVariable.storeOrderRefNumber, check: true, value: "", placeholder: "e.g XX00...", options: [], dafaultType: 'search', type: "text" },
    { label: ConstantFilterLabel.trackingNumber, variable: ConstantFilterVariable.trackingNumber, check: true, value: "", placeholder: "e.g XX-XXX0X000000", options: [], dafaultType: 'search', type: "text" },

    { label: ConstantFilterLabel.branchIds, variable: ConstantFilterVariable.branchIds, check: true, value: null, placeholder: "Select Branch", options: [], type: "select" },
    { label: ConstantFilterLabel.deliveryCompanyIds, variable: ConstantFilterVariable.deliveryCompanyIds, check: true, value: null, placeholder: "Select Delivery Company", options: [], type: "select" },
    { label: ConstantFilterLabel.deliveryCityIds, variable: ConstantFilterVariable.deliveryCityIds, check: true, value: null, placeholder: "Select Delivery City", options: [], type: "select" },
   
    { label: ConstantFilterLabel.merchantId, variable: ConstantFilterVariable.merchantId, check: true, value: null, placeholder: "Select Merchant", options: [], type: "select" },
    
    { label: ConstantFilterLabel.merchantCityId, variable: ConstantFilterVariable.merchantCityId, check: true, value: null, placeholder: "Select Merchant City", options: [], type: "select" },
    { label: ConstantFilterLabel.transactionTypeIds, variable: ConstantFilterVariable.transactionTypeIds, check: true, value: null, placeholder: "Select Payment Method", options: [], type: "select" },
    { label: ConstantFilterLabel.transactionStatusIds, variable: ConstantFilterVariable.transactionStatusIds, check: true, value: null, placeholder: "Select Order Status", options: [], type: "select" },

]
export function GetAllFilters() {
    return JSON.parse(JSON.stringify(Filters));
};

export function GetSelectedFilters(variables: string[]) {
    var filters: FilterObject[] = [];
    for (var variable of variables) {
        const field = Filters.find(field => field.variable == variable || field.label == variable);
        if (field) {
            filters.push(field);
        }
    }
    return JSON.parse(JSON.stringify(filters));
};