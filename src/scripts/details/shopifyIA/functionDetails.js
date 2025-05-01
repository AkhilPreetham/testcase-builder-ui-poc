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
  }
};
