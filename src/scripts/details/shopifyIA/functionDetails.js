export const creationFunctionDetailsHandler = {
  createSHPFDraftOrderthoughAPI: (testCaseName) => {
    let json = {
      draft_order: {
        customer: {
          id: "process.env[DEFAULT_CUSTOMER.EMAIL]",
        },
        line_items: [
          {
            sku: "process.env[DEFAULTS.PRODUCTS.0.SKU]",
            title: "process.env[DEFAULTS.PRODUCTS.0.SKU]",
            price: 8.99,
            quantity: 5,
            requires_shipping: true,
            applied_discount: {
              value_type: "fixed_amount",
              value: "2.99",
              amount: "2.99",
            },
          },
        ],
        use_customer_default_address: true,
        shipping_line: {
          code: "shopify-Standard%20Shipping",
          price: "5.00",
          title: "Standard Shipping",
        },
      },
    };

    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [
      `{{${testCaseName}shopifyOrderId}}`,
      `{{${testCaseName}shopifyOrderNumber}}`,
      `{{${testCaseName}shippingCost}}`,
      `{{${testCaseName}customerFirstName}}`,
      `{{${testCaseName}customerLastName}}`,
    ];
    let uniqueValues = {
      uniqueValue: "financialStatus",
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createProduct: (testCaseName) => {
    let json = {
      product: {
        title: "Serial Erasable142209",
        body_html: "Serial Erasable142209",
        vendor: "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]",
        product_type: "",
        tags: "",
        variants: [
          {
            price: "5.00",
            sku: "Serial Erasable142209",
            option1: "Serial Erasable142209",
            inventory_management: "shopify",
            inventory_policy: "continue",
          },
        ],
        images: [],
      },
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [`{{${testCaseName}shopifyProductTitile}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createShipmentforSHPFOrder: (testCaseName) => {
    let json = {
      shpfOrderId: "{{testCaseNameshopifyOrderId}}",
      locationId: "process.env[SH_DEFAULT.AUTO_QA_LOCATION1]",
      trackingNumber: 123456,
      fulfilLines: [{ lineID: "{{testCaseNamelineItem1}}", quantity: 2 }],
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [`{{${testCaseName}fulfilmentRecordID}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createShopifyStoreFrontOrder: (testCaseName) => {
    let json = {
      input: {
        allowPartialAddresses: true,
        buyerIdentity: {
          countryCode: "process.env[SHOPIFY_STORE4_Address.country_code]",
        },
        email: "process.env[DEFAULT_TAXABLE_CUSTOMER.EMAIL]",
        lineItems: [
          { quantity: 2, variantId: "{{testCaseNameforDependentResources1}}" },
        ],
        shippingAddress: {
          address1: "process.env[DEFAULT_ADDRESSES.TAX_SHIPPING.ADDR1]",
          address2: "",
          city: "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.CITY]",
          country:
            "process.env[DEFAULT_ADDRESSES.DEFAULT_DEMOGRAPHICS.COUNTRY]",
          province: "process.env[DEFAULT_ADDRESSES.TAX_SHIPPING.PROVINCE]",
          zip: "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.ZIPCODE]",
          phone: "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.PHONE]",
          firstName: "process.env[DEFAULT_TAXABLE_CUSTOMER.FIRST_NAME]",
          lastName: "process.env[DEFAULT_TAXABLE_CUSTOMER.LAST_NAME]",
        },
      },
    };

    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [
      `{{${testCaseName}shopifyOrderId}}`,
      `{{${testCaseName}shopifyOrderNumber}}`,
      `{{${testCaseName}shippingCost}}`,
      `{{${testCaseName}customerFirstName}}`,
      `{{${testCaseName}customerLastName}}`,
    ];
    let uniqueValues = {
      uniqueValue: "financialStatus",
      secondaryValue: "discountCode",
      tertiaryValue: "shippingRate",
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createCreditMemo: (testCaseName) => {
    let json = {
      invoiceID: "2874781",
      items: [
        {
          name: "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          qty: 1,
          amount: 8.99,
          etailLineId: "{{testCaseNamelineItem1}}",
          id: "2874781_1",
          taxcode:
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          lineItemType: null,
        },
        {
          name: "process.env[DEFAULTS.PRODUCTS.1.SKU]",
          qty: 1,
          amount: 8.99,
          etailLineId: "{{testCaseNamelineItem2}}",
          id: "2874781_3",
          taxcode:
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          lineItemType: null,
        },
        {
          name: "Ship001",
          qty: 0,
          amount: 0,
          etailLineId: null,
          id: "2874781_5",
          taxcode:
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          lineItemType: "Celigo_ShippingItem",
        },
      ],
    };

    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [`{{${testCaseName}creditMemoID}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createNScustomercreditmemoRefund: (testCaseName) => {
    let json = {
      "customer_name": "process.env[DEFAULT_CUSTOMER.ID]",
      "eTailOrderId": "{{testCaseNameshopifyOrderId}}",
      "id": "2874880",
      "amount": "13.50",
      "etail_channel": "process.env[AUT.SH]",
      "shopify_store": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]"
    };

    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [`{{${testCaseName}transformedCustomerRefundID}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createFulfillment: (testCaseName) => {
    let json = {
      "shopify_orderID": "{{testCaseNameshopifyOrderId}}",
      "line_items": [
        {
          "itemname": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "location": "process.env[NS_DEFAULT.LOCATION1]",
          "quantity": 2
        }
      ],
      "packages": [
        {
          "packagedescr": "description data 1",
          "packagetrackingnumber": "12345",
          "packageweight": 1
        }
      ]
    };

    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [`{{${testCaseName}fulfilmentRecordID}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  refundSHPFOrderthruAPI: (testCaseName) => {
    let json = {
      "shopify_order_id": "{{testCaseNameshopifyOrderId}}",
      "refund": {
        "currency": "process.env[CURRENCY.SHOPIFY]",
        "shipping": {
          "full_refund": false
        },
        "transactions": [
          {
            "kind": "refund",
            "amount": 5,
            "gateway": "manual",
            "parent_id": "7579847589943"
          }
        ],
        "refund_line_items": [
          {
            "line_item_id": "{{testCaseNamelineItem1}}",
            "quantity": "1",
            "restock_type": "return",
            "location_id": "process.env[SH_DEFAULT.Location1ID]"
          }
        ]
      },
      "restock": "return"
    }
    

    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [`{{${testCaseName}refundId}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createNScustomerPayment: (testCaseName) => {
    let json = {
      "id": "2903322",
      "amount": "60.73"
    }

    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [`{{${testCaseName}paymentId}}`];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createNSCustomer: (testCaseName) => {
    let json = {
      "custID": "FirstName_1484391 LastName_1484391",
      "firstname": "FirstName_1484391",
      "lastname": "LastName_1484391",
      "address": [
        {
          "addressee": "FirstName_1484391",
          "address1": "address1",
          "address2": "address2",
          "attention": "attention123",
          "city": "Sandiego",
          "state": "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.STATE]",
          "country": "United States",
          "zip": "90001",
          "addressPhone": "",
          "shopifyStoreName": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]"
        }
      ],
      "customer_email": "test1484391@yopmail.com",
      "shopifyStoreId": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_ID]",
      "shopifyStoreName": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]",
      "primary_currency": "process.env[CURRENCY.NETSUITE]",
      "custrecord_celigo_shopify_store": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]",
      "updated_by_shopify_ia": "F"
    }
    

    let path = "connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [
       `{{${testCaseName}nsCustomerID}}`,
      `{{${testCaseName}nsCustomerFirstName}}`,
      `{{${testCaseName}nsCustomerLastName}}`
    ];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  getShopifyCustomerDefaultAddressId: (testCaseName) => {
    let json = { "customerEmail": "test1484391@yopmail.com" }
    

    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/export";
    let mapFields = [
       `{{${testCaseName}addressId}}`
    ];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createSHPFCustomer: (testCaseName) => {
    let json = {
      "firstname": "{{testCaseNamensCustomerFirstName}}",
      "lastname": "{{testCaseNamensCustomerLastName}}",
      "email": "testupdated1484391@yopmail.com",
      "phone": "",
      "customerId": "{{testCaseNamecustomerId}}"
    }
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [
       `{{${testCaseName}customerId}}`
    ];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  updateSHPFCustomerAddress: (testCaseName) => {
    let json = {
      "phone": "",
      "address1": "address1 Update",
      "address2": "address2 Update",
      "city": "Sandiegoupdated",
      "country": "United States",
      "zip": "90002",
      "customerId": "{{testCaseNamecustomerId}}"
    }
    
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
    let mapFields = [
       `{{${testCaseName}addressId}}`
    ];
    let uniqueValues = {
      uniqueValue: "customerId",
      secondaryValue: "addressId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  createItem: (testCaseName) => {
    let json = {
      "Itemnamenumber": "Serial Erasable142209",
      "Displayname": "Serial Erasable142209",
      "subsidiary": "3",
      "sale_description": "This is an item created by automation for Shopify",
      "sale_specification": "",
      "etail_channel": "process.env[AUT.SH]",
      "shopify_product_type": "",
      "shopify_enable_out_of_stock_selling": true,
      "shopify_do_not_track_inventory": false,
      "shopify_product_tags": "",
      "price": "25.00",
      "shopify_product_visibility": "Online store",
      "shopify_variation_theme": "",
      "Shopify_store": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]",
      "itemCostingMethod": "Average"
    }
    
    
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [
       `{{${testCaseName}itemRecordID}}`,
      `{{${testCaseName}itemDisplayname}}`,
      `{{${testCaseName}nsItemID}}`,
    ];
    let uniqueValues = {
      uniqueValue: "type: INVENTORY_ITEM, SERIALIZED, LOT_NUMBERED etc"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  adjustNSInventory: (testCaseName) => {
    let json = {
      "subsidiary": "3",
      "account": "process.env[NS_DEFAULT.NETSUITE_ACCOUNT_FOR_ALL_PURPOSES]",
      "inventory": [
        {
          "quantity": "2",
          "item": "Serial Erasable142209",
          "location": "process.env[NS_DEFAULT.LOCATION1]"
        }
      ],
      "inventoryDetail": [
        {
          "inventoryNumber": "IN1",
          "assignQuantity": 1,
          "expirationDate": "10/30/2022",
          "binnumber": "BIN001"
        },
        {
          "inventoryNumber": "IN2",
          "assignQuantity": 1,
          "expirationDate": "10/30/2022",
          "binnumber": "BIN002"
        }
      ]
    }
    
    
    
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/import";
    let mapFields = [
    ];
    let uniqueValues = {
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
};

export const validationFunctionDetailsHandler = {
  pleaseSelect: (testCaseName) => {
    let json = {};
    let path = "";
    let mapFields = [];
    let uniqueValues = {};
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  validateSalesOrderWithDiscountItem: (testCaseName) => {
    let json = {
      "Shipping Cost": ".00",
      "Ship Via": "Download",
      items: [],
      fulfilLines: [],
      fulfilTracking: [],
      cancelorderLine: [],
      assignedInventoryDetail: [],
      cashSale_line_items: [],
      CustomerDepositDetails: [],
      inventoryDetails: [],
      salesOrder_discount_codes: [
        {
          "Shopify Discount Code": "testdisccart",
          "Amount (Foreign Currency)": "-2.00",
          Item: "process.env[DEFAULT_DISCOUNT.DISCOUNTS.0.NAME]",
        },
      ],
      salesOrder_LineLevel_discount: [],
      "Tax Item":
        "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
      etail_line_items: [
        {
          Item: "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          Quantity: "{{testCaseNamelineItemQty1}}",
          "Item Rate": "10.00",
          "Amount (Foreign Currency)": "20.00",
          "eTail Order Line Id": "{{testCaseNamelineItem1}}",
          "eTail Order Line Tax": "2.9",
        },
      ],
      etail_tax_line_items: [],
      etail_refund_line_items: [],
      etail_refund_adjustments: [],
      "eTail Order Line Tax": null,
      "eTail Order Total Variance": "0",
      "eTail Order Fulfillment Exported": null,
      "eTail Order Id": "{{testCaseNameshopifyOrderId}}",
      "eTail Order Billing Exported": "T",
      "eTail Order Auto Billing Exported": null,
      "eTail Discount Total Variance": "0",
      "eTail Tax Total Variance": "0",
      "eTail Ship Total Variance": "0",
      "eTail Channel": "process.env[AUT.SH]",
      "eTail Refund Exported": null,
      "eTail Cancelled Order Exported": null,
    };
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId",
      secondaryValue: "invStatusEnabled",
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  validateInvoiceWithDiscountItem: (testCaseName) => {
    let json = {
      etail_line_items: [
        {
          Item: "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          Quantity: "{{testCaseNamelineItemQty1}}",
          "Item Rate": "8.99",
          "Amount (Foreign Currency)": "44.95",
          "eTail Order Line Id": "{{testCaseNamelineItem1}}",
          "eTail Order Line Tax": "3.75",
          "Tax Item":
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
        },
        {
          Item: "process.env[DEFAULT_DISCOUNT.DISCOUNTS.0.NAME]",
          Quantity: null,
          "Item Rate": null,
          "Amount (Foreign Currency)": "-14.95",
          "eTail Order Line Id": null,
          "eTail Order Line Tax": "3.75",
          "Tax Item":
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          "eTail Order Item Type Id": "Celigo_Discount_Line_{{testCaseNamelineItem1}}",
        },
        {
          Item: "process.env[DEFAULTS.PRODUCTS.1.SKU]",
          Quantity: "{{testCaseNamelineItemQty1}}",
          "Item Rate": "8.99",
          "Amount (Foreign Currency)": "44.95",
          "eTail Order Line Id": "{{testCaseNamelineItem2}}",
          "eTail Order Line Tax": "3.75",
          "Tax Item":
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
        },
        {
          Item: "process.env[DEFAULT_DISCOUNT.DISCOUNTS.0.NAME]",
          Quantity: null,
          "Item Rate": null,
          "Amount (Foreign Currency)": "-14.95",
          "eTail Order Line Id": null,
          "eTail Order Line Tax": "3.75",
          "Tax Item":
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          "eTail Order Item Type Id": "Celigo_Discount_Line_{{testCaseNamelineItem2}}",
        },
        {
          Item: "Ship001",
          Quantity: "1",
          "Item Rate": "{{testCaseNameshippingCost}}",
          "Amount (Foreign Currency)": "{{testCaseNameshippingCost}}",
          "eTail Order Line Id": null,
          "eTail Order Line Tax": ".63",
          "Tax Item":
            "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
          "eTail Order Item Type Id": "Celigo_ShippingItem",
        },
      ],
      salesOrder_discount_codes: [],
      salesOrder_LineLevel_discount: [],
      etail_tax_line_items: [],
    };

    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId",
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyShopifyBillingANDrefund: (testCaseName) => {
    let json = {
      "financial_status": "partially_refunded",
      "refund_transactions": [
        {
          "kind": "refund",
          "amount": "13.50"
        }
      ],
      "refund_body": [
        {
          "restock": true
        }
      ],
      "refund_line_fields": [
        {
          "sku": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "quantity": 1,
          "restock_type": "return"
        },
        {
          "sku": "process.env[DEFAULTS.PRODUCTS.1.SKU]",
          "quantity": 1,
          "restock_type": "return"
        }
      ],
      "refund_shipping_fields": []
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/export";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyCashsaleDataFromNetsuite: (testCaseName) => {
    let json = {
      "Shipping Cost": ".00",
      "Ship Via": "Download",
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [
        {
          "Item": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "Quantity": "{{testCaseNamelineItemQty1}}",
          "Amount (Foreign Currency)": "10.00",
          "eTail Order Auto Billing Exported": "T",
          "eTail Order Line Id": "{{testCaseNamelineItem1}}",
          "eTail Order Line Tax": "1.45"
        }
      ],
      "CustomerDepositDetails": [],
      "inventoryDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "etail_line_items": [],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [],
      "etail_refund_adjustments": [],
      "eTail Order Line Tax": null,
      "eTail Order Total Variance": "0",
      "eTail Order Fulfillment Exported": null,
      "eTail Order Id": "{{testCaseNameshopifyOrderId}}",
      "eTail Order Billing Exported": "T",
      "eTail Discount Total Variance": "0",
      "eTail Tax Total Variance": "0",
      "eTail Ship Total Variance": "0",
      "eTail Channel": "process.env[AUT.SH]",
      "eTail Refund Exported": null,
      "eTail Cancelled Order Exported": null
    }
    ;
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyCashRefundDataFromNetsuite: (testCaseName) => {
    let json = {
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [],
      "CustomerDepositDetails": [],
      "inventoryDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "Amount (Transaction Total)": "-5.73",
      "etail_line_items": [],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [
        {
          "Item": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "Quantity": null,
          "Item Rate": "5.00",
          "Amount (Foreign Currency)": "-5.00",
          "Line Item Id": "{{testCaseNamelineItem1}}",
          "eTail Order Line Tax": ".72"
        }
      ],
      "etail_refund_adjustments": [],
      "eTail Refund Exported": "T",
      "Item": [],
      "line_items": []
    }
    
    ;
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyShopifyBilling: (testCaseName) => {
    let json = {
      "financial_status": "paid",
      "refund_details": [],
      "refund_amount": []
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_2]/export";
    let mapFields = [];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyCustRefundDataFromNetsuite: (testCaseName) => {
    let json = {
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [],
      "CustomerDepositDetails": [],
      "inventoryDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "etail_line_items": [],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [],
      "etail_refund_adjustments": [],
      "eTail Refund Exported": "F",
      "Payment Method": "Cash",
      "Amount (Foreign Currency)": "24.91",
      "Location": "process.env[NS_DEFAULT.LOCATION1]",
      "Account": null
    };
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [
      `{{${testCaseName}refundId}}`
    ];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  validateCreditMemoWithDiscountItem: (testCaseName) => {
    let json = {
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [],
      "CustomerDepositDetails": [],
      "inventoryDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "etail_line_items": [
        {
          "Item": "Automation matrix1 : Automation matrix1CB",
          "Quantity": "-1",
          "Item Rate": "18.70",
          "Amount (Foreign Currency)": "-18.70",
          "eTail Order Line Id": null,
          "eTail Order Line Tax": "1.21",
          "Tax Item": "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_CODES.TAX_NAME]"
        },
        {
          "Item": "Ship002",
          "Quantity": null,
          "Item Rate": "{{testCaseNameshippingCost}}",
          "Amount (Foreign Currency)": "-7.00",
          "eTail Order Line Id": null,
          "eTail Order Line Tax": "1.21",
          "Tax Item": "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_CODES.TAX_NAME]",
          "eTail Order Item Type Id": "Celigo_ShippingItem"
        }
      ],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [],
      "etail_refund_adjustments": [],
      "eTail Order Line Tax": null,
      "eTail Order Total Variance": "0",
      "eTail Order Fulfillment Exported": null,
      "eTail Order Id": "{{testCaseNameshopifyOrderId}}",
      "eTail Order Billing Exported": "F",
      "eTail Order Auto Billing Exported": "T",
      "eTail Discount Total Variance": null,
      "eTail Tax Total Variance": "0",
      "eTail Ship Total Variance": "0",
      "eTail Channel": "process.env[AUT.SH]",
      "eTail Refund Exported": "T",
      "eTail Cancelled Order Exported": null,
      "Status": "Fully Applied",
      "Amount (Transaction Total)": "-24.91"
    };
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [
      `{{${testCaseName}refundId}}`
    ];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyCustomerDepositDataFromNetsuite: (testCaseName) => {
    let json = {
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [],
      "CustomerDepositDetails": [
        {
          "Amount": "23.52"
        }
      ],
      "inventoryDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "etail_line_items": [],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [],
      "etail_refund_adjustments": []
    }
    ;
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [
    ];
    let uniqueValues = {
      uniqueValue: "shopifyOrderId",
      secondaryValue: "depositAmount"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyShopifyCustomer: (testCaseName) => {
    let json = {
      "first_name": "{{testCaseNamensCustomerFirstName}}",
      "last_name": "{{testCaseNamensCustomerLastName}}",
      "email": "test1004162@dmail.com",
      "default_address": {
        "first_name": null,
        "last_name": "{{testCaseNamensCustomerFirstName}}",
        "phone": "0",
        "address1": "address1",
        "address2": "address2",
        "city": "Sandiego",
        "country": "United States",
        "province_code": "process.env[DEFAULT_ADDRESSES.TAX_BILLING.PROVINCE]",
        "zip": "90001"
      },
      "addresses": [
        {
          "first_name": null,
          "last_name": "{{testCaseNamensCustomerLastName}}",
          "phone": "0",
          "address1": "address5",
          "address2": "address6",
          "city": "Sandiego",
          "country": "United States",
          "province_code": "process.env[DEFAULT_ADDRESSES.TAX_BILLING.PROVINCE]",
          "zip": "90001"
        }
      ]
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/export";
    let mapFields = [
      `{{${testCaseName}customerId}}`
    ];
    let uniqueValues = {
      uniqueValue: "customerEmail"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyNSCustomerByInternalID: (testCaseName) => {
    let json = {
      "Name": "FirstName_1484391 LastName_1484391",
      "Phone": "",
      "Email": "testupdated1484391@yopmail.com",
      "Is Individual": "T",
      "Customer Name": "FirstName_1484391 LastName_1484391",
      "Addressee": "{{testCaseNamensCustomerFirstName}}",
      "Address 1": "address1 Update",
      "Address 2": "address2 Update",
      "Attention": null,
      "City": "Sandiegoupdated",
      "State/Province Display Name": "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.STATE]",
      "Country": "United States",
      "Zip Code": "90002",
      "Address Phone": "",
      "Default Billing Address": "T",
      "eTail Address Id": "{{testCaseNameaddressId}}",
      "eTail Channel": "process.env[AUT.SH]",
      "eTail Customer Id": "{{testCaseNamecustomerId}}",
      "eTail Customer Exported": "F",
      "Updated By Shopify IA": "T",
      "currency": [],
      "address": []
    }
    ;
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [
    ];
    let uniqueValues = {
      uniqueValue: "customerInternalID",
      secondaryValue: "etailAddressId",
      tertiaryValue: "defaultBillingOne: true or false",
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyShopifyFulfillment: (testCaseName) => {
    let json = {
      "order_id": "{{testCaseNameshopifyOrderId}}",
      "line_items": [
        {
          "title": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "quantity": 2,
          "sku": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "name": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "fulfillment_status": "partial"
        },
        {
          "title": "Ship001",
          "quantity": 1,
          "sku": "Ship001",
          "name": "Ship001",
          "fulfillment_status": "fulfilled"
        }
      ],
      "tracking_numbers": ["124068"]
    };
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/export";
    let mapFields = [
      `{{${testCaseName}fulfilmentRecordID}}`
    ];
    let uniqueValues = {
      uniqueValue: "shopifyOrderID",
      secondaryValue: "fulfillmentNum"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  validateErrorMessage: (testCaseName) => {
    let json = {};
    let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/export";
    let mapFields = [
    ];
    let uniqueValues = {
      uniqueValue: "flowStore: flowName",
      secondaryValue: "expectedErrorMessage",
      tertiaryValue: "forValidation" //add few more

    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  },
  verifyFulfillmentImportDataFromNetsuite: (testCaseName) => {
    let json = {
      "items": [],
      "fulfilLines": [],
      "fulfilTracking": [],
      "cancelorderLine": [],
      "assignedInventoryDetail": [],
      "cashSale_line_items": [],
      "CustomerDepositDetails": [],
      "salesOrder_discount_codes": [],
      "salesOrder_LineLevel_discount": [],
      "etail_line_items": [
        {
          "Item": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
          "Quantity": "{{testCaseNamelineItemQty1}}",
          "Item Rate": null,
          "Amount (Foreign Currency)": null,
          "eTail Order Line Id": "{{testCaseNamelineItem1}}"
        },
        {
          "Item": "process.env[DEFAULTS.PRODUCTS.1.SKU]",
          "Quantity": "{{testCaseNamelineItemQty1}}",
          "Item Rate": null,
          "Amount (Foreign Currency)": null,
          "eTail Order Line Id": "{{testCaseNamelineItem2}}"
        }
      ],
      "etail_tax_line_items": [],
      "etail_refund_line_items": [],
      "etail_refund_adjustments": []
    };
    let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
    let mapFields = [
    ];
    let uniqueValues = {
      uniqueValue: "fulfillmentId",
      secondaryValue: "invStatusEnabled: true or false"
    };
    return {
      json,
      path,
      mapFields,
      uniqueValues,
    };
  }
};
