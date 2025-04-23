

export const creationFunctionDetailsHandler = {
    createSHPFDraftOrderthoughAPI: (testCaseName) => {
        let json = {
            "draft_order": {
              "customer": {
                "id": "process.env[DEFAULT_CUSTOMER.EMAIL]"
              },
              "line_items": [
                {
                  "sku": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
                  "title": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
                  "price": 8.99,
                  "quantity": 5,
                  "requires_shipping": true,
                  "applied_discount": {
                    "value_type": "fixed_amount",
                    "value": "2.99",
                    "amount": "2.99"
                  }
                }
              ],
              "use_customer_default_address": true,
              "shipping_line": {
                "code": "shopify-Standard%20Shipping",
                "price": "5.00",
                "title": "Standard Shipping"
              }
            }
          }
          
        let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
        let mapFields = [
           `{{${testCaseName}shopifyOrderId}}`,
           `{{${testCaseName}shopifyOrderNumber}}`,
           `{{${testCaseName}shippingCost}}`,
           `{{${testCaseName}customerFirstName}}`,
           `{{${testCaseName}customerLastName}}`
        ]
        let uniqueValues = {
          uniqueValue: "financialStatus"
        }
        return {
            json,
            path,
            mapFields,
            uniqueValues
        }
    },
    createProduct: (testCaseName) => {
      let json = {
        "product": {
          "title": "Serial Erasable142209",
          "body_html": "Serial Erasable142209",
          "vendor": "process.env[SHOPIFY_PRIMARY_STORE_DATA.STORE_NAME]",
          "product_type": "",
          "tags": "",
          "variants": [
            {
              "price": "5.00",
              "sku": "Serial Erasable142209",
              "option1": "Serial Erasable142209",
              "inventory_management": "shopify",
              "inventory_policy": "continue"
            }
          ],
          "images": []
        }
      }
      let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
      let mapFields = [
         `{{${testCaseName}shopifyProductTitile}}`
      ]
      let uniqueValues = {}
      return {
          json,
          path,
          mapFields,
          uniqueValues
      }
    },
    createShipmentforSHPFOrder: (testCaseName) => {
      let json = {
        "shpfOrderId": "{{T2993shopifyOrderId}}",
        "locationId": "process.env[SH_DEFAULT.AUTO_QA_LOCATION1]",
        "trackingNumber": 123456,
        "fulfilLines": [
          { "lineID": "{{T2993lineItem1}}", "quantity": 2 }
        ]
      } 
      let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
      let mapFields = [
         `{{${testCaseName}fulfilmentRecordID}}`
      ]
      let uniqueValues = {}
      return {
          json,
          path,
          mapFields,
          uniqueValues
      }
    },
    createShopifyStoreFrontOrder: (testCaseName) => {
      let json = {
        "input": {
          "allowPartialAddresses": true,
          "buyerIdentity": {
            "countryCode": "process.env[SHOPIFY_STORE4_Address.country_code]"
          },
          "email": "process.env[DEFAULT_TAXABLE_CUSTOMER.EMAIL]",
          "lineItems": [
            { "quantity": 2, "variantId": "{{C111forDependentResources1}}" }
          ],
          "shippingAddress": {
            "address1": "process.env[DEFAULT_ADDRESSES.TAX_SHIPPING.ADDR1]",
            "address2": "",
            "city": "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.CITY]",
            "country": "process.env[DEFAULT_ADDRESSES.DEFAULT_DEMOGRAPHICS.COUNTRY]",
            "province": "process.env[DEFAULT_ADDRESSES.TAX_SHIPPING.PROVINCE]",
            "zip": "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.ZIPCODE]",
            "phone": "process.env[DEFAULT_ADDRESSES.TAX_DEMOGRAPHICS.PHONE]",
            "firstName": "process.env[DEFAULT_TAXABLE_CUSTOMER.FIRST_NAME]",
            "lastName": "process.env[DEFAULT_TAXABLE_CUSTOMER.LAST_NAME]"
          }
        }
      }
        
      let path = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
      let mapFields = [
         `{{${testCaseName}shopifyOrderId}}`,
         `{{${testCaseName}shopifyOrderNumber}}`,
         `{{${testCaseName}shippingCost}}`,
         `{{${testCaseName}customerFirstName}}`,
         `{{${testCaseName}customerLastName}}`
      ]
      let uniqueValues = {
        uniqueValue: "financialStatus",
        secondaryValue: "discountCode",
        tertiaryValue: "shippingRate"
      }
      return {
          json,
          path,
          mapFields,
          uniqueValues
      }
  },
}

export const validationFunctionDetailsHandler = {
  validateSalesOrderWithDiscountItem: (testCaseName) => {
      let json = {
        "Shipping Cost": ".00",
        "Ship Via": "Download",
        "items": [],
        "fulfilLines": [],
        "fulfilTracking": [],
        "cancelorderLine": [],
        "assignedInventoryDetail": [],
        "cashSale_line_items": [],
        "CustomerDepositDetails": [],
        "inventoryDetails": [],
        "salesOrder_discount_codes": [
          {
            "Shopify Discount Code": "testdisccart",
            "Amount (Foreign Currency)": "-2.00",
            "Item": "process.env[DEFAULT_DISCOUNT.DISCOUNTS.0.NAME]"
          }
        ],
        "salesOrder_LineLevel_discount": [],
        "Tax Item": "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
        "etail_line_items": [
          {
            "Item": "process.env[DEFAULTS.PRODUCTS.0.SKU]",
            "Quantity": "{{C111lineItemQty1}}",
            "Item Rate": "10.00",
            "Amount (Foreign Currency)": "20.00",
            "eTail Order Line Id": "{{C111lineItem1}}",
            "eTail Order Line Tax": "2.9"
          }
        ],
        "etail_tax_line_items": [],
        "etail_refund_line_items": [],
        "etail_refund_adjustments": [],
        "eTail Order Line Tax": null,
        "eTail Order Total Variance": "0",
        "eTail Order Fulfillment Exported": null,
        "eTail Order Id": "{{C111shopifyOrderId}}",
        "eTail Order Billing Exported": "T",
        "eTail Order Auto Billing Exported": null,
        "eTail Discount Total Variance": "0",
        "eTail Tax Total Variance": "0",
        "eTail Ship Total Variance": "0",
        "eTail Channel": "process.env[AUT.SH]",
        "eTail Refund Exported": null,
        "eTail Cancelled Order Exported": null
      }       
      let path = "/connections/process.env[CONNECTIONS.NETSUITE]/proxy";
      let mapFields = [
        
      ]
      let uniqueValues = {
        uniqueValue: "shopifyOrderId",
        secondaryValue: "invStatusEnabled",
      }
      return {
          json,
          path,
          mapFields,
          uniqueValues
      }
  }
}