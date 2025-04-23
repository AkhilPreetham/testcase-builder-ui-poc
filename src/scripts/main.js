import {copyJsonToClipboard} from './helper.js'
import {creationFunctionDetailsHandler, validationFunctionDetailsHandler} from "./details/shopifyIA/functionDetails.js"


document.addEventListener("DOMContentLoaded", () => {
    // Global variables to store dynamic variables
    let testCaseId, testCaseTitle, flowIdCounter, flowUpdateStatusCallCounter, updateSettingsCallCounter, dataCreationCounter, flowValidateResponseCounter, finalValidationCounter, interactionCounter, flowIdCustomField, suiteName;
    let testCaseName
    let addOnObj = {
      updateFlowStatus: "flowStatusPaneTemplate",
      updateSettings: "settingsPaneTemplate",
    }
    const dynamicVariables = new Set()
    let reusableOptions = [
      "process.env[DEFAULTS.PRODUCTS.0.SKU]",
      "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
      "process.env[NS_DEFAULT.LOCATION1]",
      "process.env[DEFAULT_CUSTOMER.EMAIL]"
    ]
    
    function initApp() {
      // Add event listeners for main buttons
      document.getElementById("addInteractionBtn").addEventListener("click", addInteraction)
      document.getElementById("copyJsonBtn").addEventListener("click", copyJsonToClipboard)
      //document.getElementById("downloadJsonBtn").addEventListener("click", downloadJson)
  
      // Add event listeners for test case basics to update JSON preview
      document.getElementById("testCaseName").addEventListener("input", updateJsonPreview)
      document.getElementById("suiteTitle").addEventListener("input", updateJsonPreview)
      document.getElementById("suiteName").addEventListener("input", updateJsonPreview)
      document.getElementById("storeName").addEventListener("input", updateJsonPreview)
      flowIdCounter = 1
      flowUpdateStatusCallCounter = 1
      updateSettingsCallCounter = 1
      interactionCounter = 1
      dataCreationCounter = 1
      flowValidateResponseCounter = 1
      finalValidationCounter = 1
      flowIdCustomField= []
      // Add first interaction by default
      addInteraction()
  
      // Initialize JSON preview
      updateJsonPreview()
    }
    initApp()
    function addInteraction() {
      const interactionsContainer = document.getElementById("interactionsContainer")
      const template = document.getElementById("interactionTemplate")
      const clone = document.importNode(template.content, true)
  
      // Add event listeners for the new interaction
      const interaction = clone.querySelector(".interaction")
  
      // Add event listener for remove button
      interaction.querySelector(".removeInteractionBtn").addEventListener("click", () => {
        interaction.remove()
        updateJsonPreview()
        interactionCounter--
        arrangeTheIntegrationOrder()
      })

      interaction.querySelector(".interaction-name").textContent = `Interaction ${interactionCounter}`
  
      // Add event listener for add pre-request step button
      interaction.querySelector(".addPreRequestStepBtn").addEventListener("click", () => {
        addPreRequestStep(interaction.querySelector(".preRequestStepsContainer"))
      })
  
      // Add event listeners for input fields
      const inputFields = interaction.querySelectorAll("input, select")
      inputFields.forEach((field) => {
        field.addEventListener("input", updateJsonPreview)
      })
  
      // Append the new interaction
      interactionsContainer.appendChild(clone)
  
      // Add first pre-request step by default
      addPreRequestStep(interaction.querySelector(".preRequestStepsContainer"))
  
      //populate validation with proper steps
      updateFinalSteps(interaction)
      // Update JSON preview
      updateJsonPreview()
      arrangeTheIntegrationOrder()
      interactionCounter++
    }
  
    function addPreRequestStep(container) {
      const template = document.getElementById("preRequestStepTemplate")
      const clone = document.importNode(template.content, true)
  
      // Add event listeners for the new step
      const step = clone.querySelector(".preRequestStep")
  
      // Add event listener for remove button
      step.querySelector(".removeStepBtn").addEventListener("click", () => {
        step.remove()
        updateJsonPreview()
      })
  
      // Add event listener for step type select
      const stepTypeSelect = step.querySelector(".stepType")
      stepTypeSelect.addEventListener("change", function () {
        step.querySelector(".addOnForPreRequest").innerHTML = ""
        configureStepByType(step, this.value)
        updateJsonPreview()
      })
  
      // Add event listeners for input fields
      const inputFields = step.querySelectorAll("input, select")
      inputFields.forEach((field) => {
        field.addEventListener("input", updateJsonPreview)
      })
  
      // Append the new step
      container.appendChild(clone)
  
      // Configure step based on default type
      configureStepByType(step, "custom")
  
      // Update JSON preview
      updateJsonPreview()
    }
  
    function configureStepByType(step, type) {
      // Reset all containers first
      const containers = [
        ".filterKeyContainer",
        ".storeNameId",
        ".customVariableField",
        ".customVariableValue",
        ".settingsMethodContainer",
        ".payloadContainer",
        ".dataCreationMethodContainer",
        ".uniqueValueContainer1",
        ".uniqueValueContainer2",
        ".uniqueValueContainer3",
        ".waitUntilContainer",
        ".stepResponse",
        ".partialValidationContainer",
        ".bodyPathContainer",
      ]
  
      containers.forEach((container) => {
        const element = step.querySelector(container)
        if (element) {
          element.classList.add("hidden")
        }
      })
  
      // Configure based on type
      const methodSelect = step.querySelector(".stepRequestMethod")
      const pathInput = step.querySelector(".stepRequestPath")
  
      switch (type) {
        case "flowId":
          methodSelect.value = "GET"
          pathInput.value = "/flows"
          step.querySelector(".filterKeyContainer").classList.remove("hidden")
          step.querySelector(".customVariableField").classList.remove("hidden")
          step.querySelector(".customVariableValue").classList.remove("hidden")
          step.querySelector(".storeNameId").classList.remove("hidden")
  
          // Set default values
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          //step.querySelector(".stepRequestFilterKey").placeholder = "name : Sync Shopify order on-demand to NetSuite (add)"
          step.querySelector(".stepRequestStoreVariable").value = `store_${testCaseName}flowId${flowIdCounter}`
          step.querySelector(".stepRequestStoreValue").value = "_id"
          flowIdCustomField.push(`store_${testCaseName}flowId${flowIdCounter}`)
          flowIdCounter++
          break
  
        case "integrationId":
          methodSelect.value = "GET"
          pathInput.value = "/integrations"
          step.querySelector(".filterKeyContainer").classList.remove("hidden")
          step.querySelector(".customVariableField").classList.remove("hidden")
          step.querySelector(".customVariableValue").classList.remove("hidden")
  
          // Set default values
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          step.querySelector(".stepRequestFilterKey").value = "name : Shopify - NetSuite"
          step.querySelector(".stepRequestStoreVariable").value = `store_${testCaseName}integrationID`
          step.querySelector(".stepRequestStoreValue").value = "_id"
          break
  
        case "updateFlowStatus":
          methodSelect.value = "PUT"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          pathInput.value = `/integrations/{{${testCaseName}integrationID}}/settings/persistSettings`
          step.querySelector(".settingsMethodContainer").classList.remove("hidden")
          step.querySelector(".payloadContainer").classList.remove("hidden")
  
          // Set default values
          step.querySelector(".stepRequestSettingsMethod").value = "updateflowStatusThroughAPI"
          const suiteName = document.getElementById("suiteName").value || "Api_Suite1"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          //const testTitle = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
          step.querySelector(".stepRequestPayload").value =
            `/test-data/${suiteName}/payloads/${testCaseName}/${testCaseName}flowStatusJSON${flowUpdateStatusCallCounter}.json`
          flowUpdateStatusCallCounter++
          attachSettingAddOns(step, type)
          break
  
        case "updateSettings":
          methodSelect.value = "PUT"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          pathInput.value = `/integrations/{{${testCaseName}integrationID}}/settings/persistSettings`
          step.querySelector(".settingsMethodContainer").classList.remove("hidden")
          step.querySelector(".payloadContainer").classList.remove("hidden")
  
          // Set default values
          step.querySelector(".stepRequestSettingsMethod").value = "updateSettings"
          const suite = document.getElementById("suiteName").value || "Api_Suite1"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          //const tt = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
          step.querySelector(".stepRequestPayload").value =
            `/test-data/${suite}/payloads/${testCaseName}/${testCaseName}updateSettings${updateSettingsCallCounter}.json`
          attachSettingAddOns(step, type)
          updateSettingsCallCounter++
          break
  
        case "dataCreation":
          methodSelect.value = "POST"
          pathInput.value = "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import"
          step.querySelector(".payloadContainer").classList.remove("hidden")
          step.querySelector(".dataCreationMethodContainer").classList.remove("hidden")
          //step.querySelector(".uniqueValueContainer1").classList.remove("hidden")
  
          // Set default values
          const s = document.getElementById("suiteName").value || "Api_Suite1"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          const title = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
          step.querySelector(".stepRequestPayload").value =
            `/test-data/${s}/payloads/${testCaseName}/${testCaseName}dataCreation_payload${dataCreationCounter}.json`
          step.querySelector(".stepRequestDataCreationMethod").value = "createSHPFDraftOrderthoughAPI"
          //step.querySelector(".stepRequestUniqueValue1").value = "PAID"
          attachDataCreationAddOns(step, type)
          dataCreationCounter++
          break
  
        case "flowValidation":
          methodSelect.value = "GET"
          testCaseName = document.getElementById("testCaseName").value || "C8266"
          pathInput.value = `/flows/{{${testCaseName}flowId1}}/jobs/latest`
          step.querySelector(".waitUntilContainer").classList.remove("hidden")
          step.querySelector(".customVariableField").classList.remove("hidden")
          step.querySelector(".customVariableValue").classList.remove("hidden")
          step.querySelector(".stepResponse").classList.remove("hidden")
          step.querySelector(".partialValidationContainer").classList.remove("hidden")
          step.querySelector(".bodyPathContainer").classList.remove("hidden")
          step.querySelector(".stepResponse").querySelector(".uniqueValueContainer1").classList.add("hidden")
          step.querySelector(".stepResponse").querySelector(".uniqueValueContainer2").classList.add("hidden")
          step.querySelector(".stepResponse").querySelector(".uniqueValueContainer3").classList.add("hidden")
          step.querySelector(".dataValidationMethodContainer").classList.add("hidden")
  
          // Set default values
          step.querySelector(".stepRequestWaitUntil").value = "completed"
          step.querySelector(".stepRequestStoreVariable").value = `store_${testCaseName}jobstatus`
          step.querySelector(".stepRequestStoreValue").value = "[0].status"
          step.querySelector(".stepResponseStatus").value = "200"
          step.querySelector(".stepResponsePartialValidation").value = "true"
          const sName = document.getElementById("suiteName").value || "Api_Suite1"
          const testT = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
          step.querySelector(".stepResponseBodyPath").value =
            `/test-data/${sName}/responses/${testCaseName}/${testCaseName}flowValidate_response${flowValidateResponseCounter}.json`
          flowValidateResponseCounter++
          break
  
        case "custom":
        default:
          step.querySelector(".waitUntilContainer").classList.remove("hidden")
          step.querySelector(".customVariableField").classList.remove("hidden")
          step.querySelector(".customVariableValue").classList.remove("hidden")
          step.querySelector(".stepResponse").classList.remove("hidden")
          step.querySelector(".partialValidationContainer").classList.remove("hidden")
          step.querySelector(".bodyPathContainer").classList.remove("hidden")
          step.querySelector(".payloadContainer").classList.remove("hidden")
          step.querySelector(".dataCreationMethodContainer").classList.remove("hidden")
          step.querySelectorAll(".uniqueValueContainer1").forEach((e) => e.classList.remove("hidden"))
          step.querySelectorAll(".uniqueValueContainer2").forEach((e) => e.classList.remove("hidden"))
          step.querySelectorAll(".uniqueValueContainer3").forEach((e) => e.classList.remove("hidden"))
          step.querySelector(".dataValidationMethodContainer").classList.remove("hidden")
          // Show basic fields for custom step
          methodSelect.value = "GET"
          pathInput.value = ""
          break
      }
    }
  
    function updateJsonPreview() {
      try {
        suiteName = document.getElementById("suiteName").value
        const testCaseJson = buildTestCaseJson()
        document.getElementById("jsonPreview").textContent = JSON.stringify(testCaseJson, null, 2)
  
        // Update dynamic variables for all steps
        updateDynamicVariables()
      } catch (error) {
        console.error("Error updating JSON preview:", error)
        document.getElementById("jsonPreview").textContent = "Error generating JSON: " + error.message
      }
    }
  
    function buildTestCaseJson() {
      testCaseName = document.getElementById("testCaseName").value || ""
      const suiteTitle = document.getElementById("suiteTitle").value || ""
      const suiteName = document.getElementById("suiteName").value || ""
      const storeName = document.getElementById("storeName").value || ""
  
      // Build full suite title if not provided
      const fullSuiteTitle = suiteTitle || (testCaseName ? `${testCaseName} | Test Case` : "")
  
      // Build interactions
      const interactions = []
      const interactionElements = document.querySelectorAll("#interactionsContainer .interaction")
  
      interactionElements.forEach((interactionEl) => {
        const testTitle = interactionEl.querySelector(".testTitle").value || ""
  
        // Build pre-request steps
        const preRequestSteps = []
        const stepElements = interactionEl.querySelectorAll(".preRequestStep")
  
        stepElements.forEach((stepEl) => {
          const stepType = stepEl.querySelector(".stepType").value
          const step = buildStepJson(stepEl, stepType)
          preRequestSteps.push(step)
        })
  
        // Build final request/response
        const finalRequest = {
          method: interactionEl.querySelector(".finalRequestMethod").value,
          path: interactionEl.querySelector(".finalRequestPath").value,
        }
  
        const finalResponse = {
          status: Number.parseInt(interactionEl.querySelector(".finalResponseStatus").value) || 200,
          time: Number.parseInt(interactionEl.querySelector(".finalResponseTime").value) || 10000,
        }
  
        // Add optional fields to final response
        const validationMethod = interactionEl.querySelector(".finalResponseValidationMethod").value
        if (validationMethod) {
          finalResponse.dataValidationMethod = validationMethod
        }
  
        const bodyPath = interactionEl.querySelector(".finalResponseBodyPath").value
        if (bodyPath) {
          finalResponse.body = bodyPath
        }
  
        const uniqueValue = interactionEl.querySelector(".finalStepResponseUniqueValue1").value
        if (uniqueValue) {
          finalResponse.uniqueValue = uniqueValue
        }
        const secondaryValue = interactionEl.querySelector(".finalStepResponseUniqueValue2").value
        if (secondaryValue) {
          finalResponse.secondaryValue = secondaryValue
        }
        const tertiaryValue = interactionEl.querySelector(".finalStepResponseUniqueValue3").value
        if (tertiaryValue) {
          finalResponse.tertiaryValue = tertiaryValue
        }
  
        // Build the interaction object
        const interaction = {
          test: testTitle,
          test_title: testTitle,
          pre_request: preRequestSteps,
          request: finalRequest,
          response: finalResponse,
        }
  
        interactions.push(interaction)
      })
  
      // Build the complete test case JSON
      return {
        testData: [
          {
            suite: fullSuiteTitle,
            suite_title: fullSuiteTitle,
            storeName: storeName,
            interactions: interactions,
          },
        ],
      }
    }
  
    function buildStepJson(stepEl, stepType) {
      const step = {}
  
      // Build request object
      const request = {
        method: stepEl.querySelector(".stepRequestMethod").value,
        path: stepEl.querySelector(".stepRequestPath").value,
      }
  
      // Add optional fields based on step type
      switch (stepType) {
        case "flowId":
        case "integrationId":
          const filterKey = stepEl.querySelector(".stepRequestFilterKey").value
          if (filterKey) {
            request.filterKey = filterKey
          }
  
          const storeVariable = stepEl.querySelector(".stepRequestStoreVariable").value
          const storeValue = stepEl.querySelector(".stepRequestStoreValue").value
          if (storeVariable && storeValue) {
            request.storeName = document.getElementById("storeName").value || "store1"
            request[storeVariable] = storeValue
          }
          break
  
        case "updateFlowStatus":
        case "updateSettings":
          const settingsMethod = stepEl.querySelector(".stepRequestSettingsMethod").value
          if (settingsMethod) {
            request.settingsMethod = settingsMethod
          }
  
          const payload = stepEl.querySelector(".stepRequestPayload").value
          if (payload) {
            request.payload = payload
          }
          break
  
        case "dataCreation":
          const dataCreationPayload = stepEl.querySelector(".stepRequestPayload").value
          if (dataCreationPayload) {
            request.payload = dataCreationPayload
          }
  
          const dataCreationMethod = stepEl.querySelector(".stepRequestDataCreationMethod").value
          if (dataCreationMethod) {
            request.dataCreationMethod = dataCreationMethod
          }
  
          const uniqueValue = stepEl.querySelector(".stepRequestUniqueValue1").value
          if (uniqueValue) {
            request.uniqueValue = uniqueValue
          }
          break
  
        case "flowValidation":
          const waitUntil = stepEl.querySelector(".stepRequestWaitUntil").value
          if (waitUntil) {
            request.waitUntil = waitUntil
          }
  
          const flowStoreVariable = stepEl.querySelector(".stepRequestStoreVariable").value
          const flowStoreValue = stepEl.querySelector(".stepRequestStoreValue").value
          if (flowStoreVariable && flowStoreValue) {
            request[flowStoreVariable] = flowStoreValue
          }
  
          // Build response object for flow validation
          const response = {
            status: Number.parseInt(stepEl.querySelector(".stepResponseStatus").value) || 200,
          }
  
          const partialValidation = stepEl.querySelector(".stepResponsePartialValidation").value
          if (partialValidation === "true") {
            response.partialValidation = true
          }
  
          const bodyPath = stepEl.querySelector(".stepResponseBodyPath").value
          if (bodyPath) {
            response.body = bodyPath
          }
  
          step.response = response
          break
      }
  
      step.request = request
      return step
    }
  
    function updateDynamicVariables() {
      // Clear existing variables
      dynamicVariables.clear()
  
      // Collect all store variables from steps
      const storeVariableInputs = document.querySelectorAll(".stepRequestStoreVariable")
      storeVariableInputs.forEach((input) => {
        const value = input.value.trim()
        if (value && value.startsWith("store_")) {
          const varName = value.substring(6) // Remove 'store_' prefix
          dynamicVariables.add(varName)
        }
      })
  
      // Update all path inputs with dynamic variables
      updatePathsWithDynamicVariables()
    }
  
    function updatePathsWithDynamicVariables() {
      const pathInputs = document.querySelectorAll(".stepRequestPath, .finalRequestPath")
      testCaseName = document.getElementById("testCaseName").value || "C8266"
  
      pathInputs.forEach((input) => {
        const currentValue = input.value
  
        // Check if we need to update with dynamic variables
        dynamicVariables.forEach((varName) => {
          const placeholder = `{{${testCaseName}${varName}}}`
          if (currentValue.includes(placeholder)) {
            // Variable is already in the correct format
            return
          }
  
          const simpleVarName = varName.replace(testCaseName, "")
          const simplePlaceholder = `{{${simpleVarName}}}`
  
          if (currentValue.includes(simplePlaceholder)) {
            // Replace simple placeholder with full placeholder
            input.value = currentValue.replace(simplePlaceholder, placeholder)
          }
        })
      })
    }
  
    function copyJsonToClipboard() {
      const jsonText = document.getElementById("jsonPreview").textContent
      navigator.clipboard
        .writeText(jsonText)
        .then(() => {
          alert("JSON copied to clipboard!")
        })
        .catch((err) => {
          console.error("Failed to copy JSON: ", err)
          alert("Failed to copy JSON to clipboard")
        })
    }

    function arrangeTheIntegrationOrder() {
      document.querySelectorAll(".interaction-name").forEach((node, i) => {
          node.textContent = `Interaction ${i + 1}`;
      });
    }

    function attachSettingAddOns (step, type){
      let template = document.getElementById(addOnObj[type])
      let templateClone = document.importNode(template.content, true)
      step.querySelector(".addOnForPreRequest").appendChild(templateClone)
      console.log("entered")
      if(type == 'updateFlowStatus'){
      let addOne = step.querySelector(".addOnForPreRequest").querySelector(".flow-selector")
      const flowHeader = addOne.querySelector('.flow-header');
      const flowOptions = addOne.querySelector('.flow-options');
      const flowChevron = addOne.querySelector('.flow-header i');
      
      flowHeader.addEventListener('click', function() {
        flowOptions.classList.toggle('hidden');
        flowChevron.classList.toggle('fa-chevron-down');
        flowChevron.classList.toggle('fa-chevron-up');
      });
      
      // Update JSON preview when flow options change
      const flowCheckboxes = addOne.querySelectorAll('.flow-checkbox');
      const flowToggles = addOne.querySelectorAll('.flow-toggle');
      const flowJsonPreview = step.querySelector(".addOnForPreRequest").querySelector('#flow-json-preview');

      flowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFlowJson);
      });
      
      flowToggles.forEach(toggle => {
        toggle.addEventListener('change', updateFlowJson);
      });

      function updateFlowJson() {
        const flowData = {};
        
        addOne.querySelectorAll('.flow-option').forEach((option, index) => {
          const checkbox = option.querySelector('.flow-checkbox');
          const toggle = option.querySelector('.flow-toggle');
          const flowName = option.querySelector('span').textContent;
          
          if (checkbox.checked) {
            flowData[flowName] = toggle.checked;
          }
        });
        
        flowJsonPreview.textContent = JSON.stringify(flowData, null, 2);
      }
     } else if(type == 'updateSettings'){
      let addOne = step.querySelector(".addOnForPreRequest").querySelector(".settings-add-on")
      const taxOption = addOne.querySelector('#tax-option');
      const perLineTaxes = addOne.querySelector('#per-line-taxes');
      const defaultTaxCode = addOne.querySelector('#default-tax-code');
      const taxJsonPreview = addOne.querySelector('#tax-json-preview');
      
      function updateTaxJson() {
        const taxData = {
          "Sync sales tax to NetSuite as": taxOption.value,
          "Per-line taxes on transaction enabled in NetSuite": perLineTaxes.checked,
          "Default tax code or group when no match is found in NetSuite ": defaultTaxCode.value
        };
        
        taxJsonPreview.textContent = JSON.stringify(taxData, null, 2);
      }
      
      taxOption.addEventListener('change', updateTaxJson);
      perLineTaxes.addEventListener('change', updateTaxJson);
      defaultTaxCode.addEventListener('input', updateTaxJson);
      
      // Initialize tax JSON preview
      updateTaxJson();
     }
    }

    function attachDataCreationAddOns(step, type) {
      const templateClone = document.importNode(
        document.getElementById("dataCreationTemplate").content,
        true
      );
      const addOnContainer = step.querySelector(".addOnForPreRequest");
      addOnContainer.appendChild(templateClone);
    
      const updateDetails = (step) => {
        const functionValue = step.querySelector(".stepRequestDataCreationMethod").value;
        const details = creationFunctionDetailsHandler[functionValue](testCaseName);
    
        step.querySelector(".stepRequestPath").value = details.path;
    
        Object.keys(details.uniqueValues).forEach((key, index) => {
          const uniqueValueContainer = step.querySelector(`.uniqueValueContainer${index + 1}`);
          uniqueValueContainer.classList.remove("hidden");
          uniqueValueContainer.querySelector(`.stepRequestUniqueValue${index + 1}`).placeholder = details.uniqueValues[key];
        });
    
        addOnContainer.querySelector("#flow-json-preview").textContent = JSON.stringify(details.json, null, 2);
        handleReusableOptions(addOnContainer, [...reusableOptions]);
        reusableOptions.push(...details.mapFields);
        handleMappedOptions(addOnContainer, [...details.mapFields]);
      };
    
      updateDetails(step);
      step.querySelector(".stepRequestDataCreationMethod").addEventListener("change", () => {
        step.querySelectorAll(".uniqueValueContainer1").forEach((e) => e.classList.add("hidden"))
        step.querySelectorAll(".uniqueValueContainer2").forEach((e) => e.classList.add("hidden"))
        step.querySelectorAll(".uniqueValueContainer3").forEach((e) => e.classList.add("hidden"))
        updateDetails(step)
      });
    }

    function filterOptions(options, inputValue) {
      if (!inputValue) {
        return options
      }
      return options.filter((option) => option.toLowerCase().includes(inputValue.toLowerCase()))
    }

    function renderOptions(filteredOptions, optionsList, inputElement, dropdownElement) {
      optionsList.innerHTML = ""
    console.log("filteredOptions is ", filteredOptions)
      if (filteredOptions.length === 0) {
        const noResults = document.createElement("li")
        noResults.className = "px-4 py-2 text-sm text-gray-500"
        noResults.textContent = "No options found"
        optionsList.appendChild(noResults)
        return
      }
    
      filteredOptions.forEach((option) => {
        console.log("option inside filteredOptions", option)
        const li = document.createElement("li")
        li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
        li.textContent = option
        li.addEventListener("click", () => {
          inputElement.value = option
          dropdownElement.classList.add("hidden")
        })
        optionsList.appendChild(li)
      })
    }

    

    function handleReusableOptions(addOnContainer, options) {
      console.log("entered inside handleReusableOptions")
      const inputElement = addOnContainer.querySelector("#autocomplete-input")
      const dropdownElement = addOnContainer.querySelector("#options-dropdown")
      const optionsList = addOnContainer.querySelector("#options-list")
      console.log("reusableOptions before ", options)
      setupAutocomplete(inputElement,dropdownElement, optionsList, options)
      document.addEventListener("click", (event) => {
        if (!inputElement.contains(event.target) && !dropdownElement.contains(event.target)) {
          dropdownElement.classList.add("hidden")
        }
      })
    }

    function handleMappedOptions(addOnContainer, mappingOptions) {
      console.log("entered inside handleMappedOptions")
      console.log("mappingOptions ", mappingOptions)
      const mappedFieldsInput = addOnContainer.querySelector("#mapped-fields-input")
      const mappedFieldsDropdown = addOnContainer.querySelector("#mapped-fields-dropdown")
      const mappedFieldsList = addOnContainer.querySelector("#mapped-fields-list")
      setupAutocomplete(mappedFieldsInput,mappedFieldsDropdown, mappedFieldsList, mappingOptions)
      document.addEventListener("click", (event) => {
        if (!mappedFieldsInput.contains(event.target) && !mappedFieldsDropdown.contains(event.target)) {
          mappedFieldsDropdown.classList.add("hidden")
        }
      })
    }

    function setupAutocomplete(inputElement, dropdownElement, optionsList, options) {
      // Show dropdown when input is focused
      inputElement.addEventListener("focus", () => {
        const filteredOptions = filterOptions(options, inputElement.value)
        renderOptions(filteredOptions, optionsList,  inputElement, dropdownElement)
        dropdownElement.classList.remove("hidden")
      })
    
      // Filter options as user types
      inputElement.addEventListener("input", () => {
        const filteredOptions = filterOptions(options, inputElement.value)
        renderOptions(filteredOptions, optionsList, inputElement, dropdownElement)
        dropdownElement.classList.remove("hidden")
      })
    
      // Initial render of options
      renderOptions(options, optionsList, inputElement, dropdownElement)
    }

    function updateFinalSteps(interaction){
      interaction.querySelector(".finalResponseBodyPath").value =
            `/test-data/${suiteName}/responses/${testCaseName}/${testCaseName}finalValidation_response${finalValidationCounter}.json`
      finalValidationCounter++
      const templateClone = document.importNode(
        document.getElementById("dataCreationTemplate").content,
        true
      );
      const addOnContainer = interaction.querySelector(".addOnForFinalRequest");
      addOnContainer.appendChild(templateClone);
    
      const updateDetails = (interaction) => {
        const functionValue = interaction.querySelector(".finalResponseValidationMethod").value;
        console.log("functionValue is ", functionValue)
        const details = validationFunctionDetailsHandler[functionValue](testCaseName);
    
        interaction.querySelector(".finalRequestPath").value = details.path;
    
        Object.keys(details.uniqueValues).forEach((key, index) => {
          const uniqueValueContainer = interaction.querySelector(`.uniqueValueFinalContainer${index + 1}`);
          uniqueValueContainer.classList.remove("hidden");
          uniqueValueContainer.querySelector(`.finalStepResponseUniqueValue${index + 1}`).placeholder = details.uniqueValues[key];
        });
    
        addOnContainer.querySelector("#flow-json-preview").textContent = JSON.stringify(details.json, null, 2);
        handleReusableOptions(addOnContainer, [...reusableOptions]);
        reusableOptions.push(...details.mapFields);
        handleMappedOptions(addOnContainer, [...details.mapFields]);
      };
    
      updateDetails(interaction);
      interaction.querySelector(".stepRequestDataCreationMethod").addEventListener("change", () => {
        interaction.querySelectorAll(".uniqueValueContainer1").forEach((e) => e.classList.add("hidden"))
        interaction.querySelectorAll(".uniqueValueContainer2").forEach((e) => e.classList.add("hidden"))
        interaction.querySelectorAll(".uniqueValueContainer3").forEach((e) => e.classList.add("hidden"))
        updateDetails(step)
      });
    }
  })
  