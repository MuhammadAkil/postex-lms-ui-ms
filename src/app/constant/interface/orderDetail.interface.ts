
export interface OrderDetail {
    transactionId: number;
    omsOrderRefNumber: string;
    storeOrderRefNumber: string;
    transactionDatetime: string;
    trackingNumber: string;
    invoicePayment: number;
    merchantId: number;
    merchantName: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    isSplit: boolean;
    transactionStatusId: number;
    transactionStatus: string;
    paymentModeId: number;
    paymentMode: string;
    deliveryTypeId: number;
    deliveryType: string;
    deliveryAddress: string;
    transactionNotes: string;
    deliveryCityId: number;
    deliveryCityName: string;
    deliveryCompanyId: number;
    shipmentTypeId: number;
    shipmentType: string;
    orderWeight: number;
    shippingCharges: number;
    orderTax: number;
    deliveryCompanyName: string;
    productsDetail: ProductsDetail[];
    branchDetail: BranchDetail;
    discountType: string;
    discountAmount: number;
    deliveryCharges: number;
    platformId: number;
    platform: string;
    transactionType: number;
    transactionReturnId: number;
    transactionReturnReason: string;
    returnDescription: string;
  }
  export interface BranchDetail {
    merchantBranchId: number;
    merchantId: number;
    branchName: string;
    branchCode: string;
    zipCode: string;
    address: string;
    cityId: number;
    cityName: string;
    contactNumber: string;
    contactEmail: string;
    addressLat: string;
    addressLong: string;
    platformId: number;
    platform: string;
    branchStatusId: number;
    branchStatus: string;
    cityAreaId: number;
    cityAreaName: string;
  }
  export interface ProductsDetail {
    transactionProductId: number;
    productId: number;
    productName: string;
    skuNumber: string;
    productDescription: string;
    productImage: string;
    productUnitPrice: string;
    productTax: string;
    productWeight: string;
    productCategoryId: number;
    productCategory: string;
    productQuantity: number;
  }