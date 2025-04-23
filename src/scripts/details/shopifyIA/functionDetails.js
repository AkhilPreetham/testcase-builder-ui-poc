

export const detailsHandler = {
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
        return {
            json,
            path,
            mapFields
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
      return {
          json,
          path,
          mapFields
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
      return {
          json,
          path,
          mapFields
      }
    },
}