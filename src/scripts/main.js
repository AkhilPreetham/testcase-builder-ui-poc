import {
  creationFunctionDetailsHandler,
  validationFunctionDetailsHandler,
} from "./details/shopifyIA/functionDetails.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Global variables to store dynamic variables
  let testCaseId,
    testCaseTitle,
    flowIdCounter,
    flowUpdateStatusCallCounter,
    updateSettingsCallCounter,
    dataCreationCounter,
    flowValidateResponseCounter,
    finalValidationCounter,
    interactionCounter,
    flowIdCustomField,
    suiteName;
  let filterMapData = new Map()
  let testCaseName;
  let bodyDetails = [];
  let addOnObj = {
    updateFlowStatus: "flowStatusPaneTemplate",
    updateSettings: "settingsPaneTemplate",
  };
  const dynamicVariables = new Set();

  // let reusableOptions = [
  //   "process.env[DEFAULTS.PRODUCTS.0.SKU]",
  //   "process.env[DEFAULT_TAX_CODES_AND_TAX_GROUPS.DEFAULT_TAX_GROUP.TAX_NAME]",
  //   "process.env[NS_DEFAULT.LOCATION1]",
  //   "process.env[DEFAULT_CUSTOMER.EMAIL]",
  // ];
  let reusableOptions = await getEnvDetails('../src/env/dev.txt')
  console.log("reusableOptions is ", reusableOptions);

  function initApp() {
    // Add event listeners for main buttons
    document
      .getElementById("addInteractionBtn")
      .addEventListener("click", addInteraction);
    document
      .getElementById("copyJsonBtn")
      .addEventListener("click", copyJsonToClipboard);
    document
      .getElementById("createPayloadBodies")
      .addEventListener("click", downloadJson);

    // Add event listeners for test case basics to update JSON preview
    document
      .getElementById("testCaseName")
      .addEventListener("input", updateJsonPreview);
    document
      .getElementById("suiteTitle")
      .addEventListener("input", updateJsonPreview);
    document
      .getElementById("suiteName")
      .addEventListener("input", updateJsonPreview);
    document
      .getElementById("storeName")
      .addEventListener("input", updateJsonPreview);
    flowIdCounter = 1;
    flowUpdateStatusCallCounter = 1;
    updateSettingsCallCounter = 1;
    interactionCounter = 1;
    dataCreationCounter = 1;
    flowValidateResponseCounter = 1;
    finalValidationCounter = 1;
    flowIdCustomField = [];
    // Add first interaction by default
    addInteraction();

    // Initialize JSON preview
    updateJsonPreview();
  }
  initApp();
  function addInteraction() {
    const interactionsContainer = document.getElementById(
      "interactionsContainer"
    );
    const template = document.getElementById("interactionTemplate");
    const clone = document.importNode(template.content, true);

    // Add event listeners for the new interaction
    const interaction = clone.querySelector(".interaction");

    // Add event listener for remove button
    interaction
      .querySelector(".removeInteractionBtn")
      .addEventListener("click", () => {
        interaction.remove();
        updateJsonPreview();
        interactionCounter--;
        arrangeTheIntegrationOrder();
      });

    interaction.querySelector(
      ".interaction-name"
    ).textContent = `Interaction ${interactionCounter}`;

    // Add event listener for add pre-request step button
    interaction
      .querySelector(".addPreRequestStepBtn")
      .addEventListener("click", () => {
        addPreRequestStep(
          interaction.querySelector(".preRequestStepsContainer")
        );
      });

    // Add event listeners for input fields
    const inputFields = interaction.querySelectorAll("input, select");
    inputFields.forEach((field) => {
      field.addEventListener("input", updateJsonPreview);
    });

    // Append the new interaction
    interactionsContainer.appendChild(clone);

    // Add first pre-request step by default
    addPreRequestStep(interaction.querySelector(".preRequestStepsContainer"));

    //populate validation with proper steps
    updateFinalSteps(interaction);
    // Update JSON preview
    updateJsonPreview();
    arrangeTheIntegrationOrder();
    interactionCounter++;
  }

  function addPreRequestStep(container) {
    const template = document.getElementById("preRequestStepTemplate");
    const clone = document.importNode(template.content, true);

    // Add event listeners for the new step
    const step = clone.querySelector(".preRequestStep");

    // Add event listener for remove button
    step.querySelector(".removeStepBtn").addEventListener("click", () => {
      step.remove();
      updateJsonPreview();
    });

    // Add event listener for step type select
    const stepTypeSelect = step.querySelector(".stepType");
    stepTypeSelect.addEventListener("change", function () {
      step.querySelector(".addOnForPreRequest").innerHTML = "";
      configureStepByType(step, this.value);
      updateJsonPreview();
    });

    // Add event listeners for input fields
    const inputFields = step.querySelectorAll("input, select");
    inputFields.forEach((field) => {
      field.addEventListener("input", updateJsonPreview);
    });

    // Append the new step
    container.appendChild(clone);

    // Configure step based on default type
    configureStepByType(step, "custom");

    // Update JSON preview
    updateJsonPreview();
  }

  function configureStepByType(step, type) {
    let fieldID1
    let sName
    let testT
    // Reset all containers first
    const containers = [
      ".filterKeyContainer1",
      ".filterKeyContainer2",
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
    ];

    containers.forEach((container) => {
      const element = step.querySelector(container);
      if (element) {
        element.classList.add("hidden");
      }
    });

    // Configure based on type
    const methodSelect = step.querySelector(".stepRequestMethod");
    const pathInput = step.querySelector(".stepRequestPath");

    switch (type) {
      case "flowId":
        let customVar = `${testCaseName}flowId${flowIdCounter}`;
        methodSelect.value = "GET";
        pathInput.value = "/flows";
        step.querySelector(".filterKeyContainer1").classList.remove("hidden");
        step.querySelector(".customVariableField").classList.remove("hidden");
        step.querySelector(".customVariableValue").classList.remove("hidden");
        step.querySelector(".storeNameId").classList.remove("hidden");

        // Set default values
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        //step.querySelector(".stepRequestFilterKey").placeholder = "name : Sync Shopify order on-demand to NetSuite (add)"
        step.querySelector(
          ".stepRequestStoreVariable"
        ).value = `store_${customVar}`;
        step.querySelector(".stepRequestFilterKey1").addEventListener("change", () => {
          filterMapData.set(step.querySelector(".stepRequestFilterKey1").value, customVar)
          console.log("filterMapData is ", filterMapData);
        })
        //filterMapData.set(step.querySelector(".stepRequestFilterKey1").value, customVar)
        step.querySelector(".stepRequestStoreValue").value = "_id";
        flowIdCustomField.push(`store_${testCaseName}flowId${flowIdCounter}`);
        flowIdCounter++;
        break;

      case "integrationId":
        methodSelect.value = "GET";
        pathInput.value = "/integrations";
        step.querySelector(".filterKeyContainer2").classList.remove("hidden");
        step.querySelector(".customVariableField").classList.remove("hidden");
        step.querySelector(".customVariableValue").classList.remove("hidden");

        // Set default values
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        step.querySelector(
          ".stepRequestStoreVariable"
        ).value = `store_${testCaseName}integrationID`;
        step.querySelector(".stepRequestStoreValue").value = "_id";
        break;

      case "updateFlowStatus":
        methodSelect.value = "PUT";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        pathInput.value = `/integrations/{{${testCaseName}integrationID}}/settings/persistSettings`;
        step
          .querySelector(".settingsMethodContainer")
          .classList.remove("hidden");
        step.querySelector(".payloadContainer").classList.remove("hidden");

        // Set default values
        step.querySelector(".stepRequestSettingsMethod").value =
          "updateflowStatusThroughAPI";
        const suiteName =
          document.getElementById("suiteName").value || "Api_Suite1";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        //const testTitle = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
        step.querySelector(
          ".stepRequestPayload"
        ).value = `/test-data/${suiteName}/payloads/${testCaseName}/${testCaseName}flowStatusJSON${flowUpdateStatusCallCounter}.json`;

        attachSettingAddOns(step, type);
        break;

      case "updateSettings":
        methodSelect.value = "PUT";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        pathInput.value = `/integrations/{{${testCaseName}integrationID}}/settings/persistSettings`;
        step
          .querySelector(".settingsMethodContainer")
          .classList.remove("hidden");
        step.querySelector(".payloadContainer").classList.remove("hidden");

        // Set default values
        step.querySelector(".stepRequestSettingsMethod").value =
          "updateSettings";
        const suite =
          document.getElementById("suiteName").value || "Api_Suite1";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        //const tt = step.closest(".interaction").querySelector(".testTitle").value || "OrderImportOrderImport"
        step.querySelector(
          ".stepRequestPayload"
        ).value = `/test-data/${suite}/payloads/${testCaseName}/${testCaseName}updateSettings${updateSettingsCallCounter}.json`;
        attachSettingAddOns(step, type);
        updateSettingsCallCounter++;
        break;

      case "dataCreation":
        methodSelect.value = "POST";
        pathInput.value =
          "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
        step.querySelector(".payloadContainer").classList.remove("hidden");
        step
          .querySelector(".dataCreationMethodContainer")
          .classList.remove("hidden");
        //step.querySelector(".uniqueValueContainer1").classList.remove("hidden")

        // Set default values
        const s = document.getElementById("suiteName").value || "Api_Suite1";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        const title =
          step.closest(".interaction").querySelector(".testTitle").value ||
          "OrderImportOrderImport";
        step.querySelector(
          ".stepRequestPayload"
        ).value = `/test-data/${s}/payloads/${testCaseName}/${testCaseName}dataCreation_payload${dataCreationCounter}.json`;
        step.querySelector(".stepRequestDataCreationMethod").value =
          "createSHPFDraftOrderthoughAPI";
        //step.querySelector(".stepRequestUniqueValue1").value = "PAID"
        attachDataCreationAddOns(step, type);

        break;
      case "dataValidation":
        methodSelect.value = "POST";
        pathInput.value =
          "/connections/process.env[CONNECTIONS.SHOPIFY_STORE_1]/import";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
       
        step.querySelector(".stepResponse").classList.remove("hidden");
      
        step.querySelector(".bodyPathContainer").classList.remove("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer1")
          .classList.add("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer2")
          .classList.add("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer3")
          .classList.add("hidden");

        // Set default values
        fieldID1 = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
        pathInput.value = `/flows/{{${fieldID1}}}/jobs/latest`
        step.querySelector(".filterKeyContainer1").addEventListener("change", () => {
          fieldID1 = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
          pathInput.value = `/flows/{{${fieldID1}}}/jobs/latest`
        })
        step.querySelector(".stepRequestWaitUntil").value = "completed";
        step.querySelector(
          ".stepRequestStoreVariable"
        ).value = `store_${testCaseName}jobstatus`;
        step.querySelector(".stepRequestStoreValue").value = "[0].status";
        step.querySelector(".stepResponseStatus").value = "200";
        step.querySelector(".stepResponsePartialValidation").value = "true";
        sName =
          document.getElementById("suiteName").value || "Api_Suite1";
        testT =
          step.closest(".interaction").querySelector(".testTitle").value ||
          "OrderImportOrderImport";
        step.querySelector(
          ".stepResponseBodyPath"
        ).value = `/test-data/${sName}/responses/${testCaseName}/${testCaseName}flowValidate_response${flowValidateResponseCounter}.json`;
        // flowValidateResponseCounter++;
        attachFlowValidationAddOn(step, type);
        updateJsonPreview();
        break;
      case "flowValidation":
        methodSelect.value = "GET";
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        step.querySelector(".filterKeyContainer1").classList.remove("hidden");
        step.querySelector(".waitUntilContainer").classList.remove("hidden");
        step.querySelector(".customVariableField").classList.remove("hidden");
        step.querySelector(".customVariableValue").classList.remove("hidden");
        step.querySelector(".stepResponse").classList.remove("hidden");
        step
          .querySelector(".partialValidationContainer")
          .classList.remove("hidden");
        step.querySelector(".bodyPathContainer").classList.remove("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer1")
          .classList.add("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer2")
          .classList.add("hidden");
        step
          .querySelector(".stepResponse")
          .querySelector(".uniqueValueContainer3")
          .classList.add("hidden");
        step
          .querySelector(".dataValidationMethodContainer")
          .classList.add("hidden");

        // Set default values
        let fieldID1 = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
        pathInput.value = `/flows/{{${fieldID1}}}/jobs/latest`
        step.querySelector(".filterKeyContainer1").addEventListener("change", () => {
          fieldID1 = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
          pathInput.value = `/flows/{{${fieldID1}}}/jobs/latest`
        })
        step.querySelector(".stepRequestWaitUntil").value = "completed";
        step.querySelector(
          ".stepRequestStoreVariable"
        ).value = `store_${testCaseName}jobstatus`;
        step.querySelector(".stepRequestStoreValue").value = "[0].status";
        step.querySelector(".stepResponseStatus").value = "200";
        step.querySelector(".stepResponsePartialValidation").value = "true";
        const sName =
          document.getElementById("suiteName").value || "Api_Suite1";
        const testT =
          step.closest(".interaction").querySelector(".testTitle").value ||
          "OrderImportOrderImport";
        step.querySelector(
          ".stepResponseBodyPath"
        ).value = `/test-data/${sName}/responses/${testCaseName}/${testCaseName}flowValidate_response${flowValidateResponseCounter}.json`;
        // flowValidateResponseCounter++;
        attachFlowValidationAddOn(step, type);
        updateJsonPreview();
        break;
      case "runFlow":
        methodSelect.value = "POST";
        step.querySelector(".filterKeyContainer1").classList.remove("hidden");
        let fieldID = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
        pathInput.value = `/flows/{{${fieldID}}}/run`
        step.querySelector(".filterKeyContainer1").addEventListener("change", () => {
          fieldID = filterMapData.get(step.querySelector(".stepRequestFilterKey1").value)
          pathInput.value = `/flows/{{${fieldID}}}/run`
          updateJsonPreview();
        })

        // Set default values
        testCaseName = document.getElementById("testCaseName").value || "C8266";
        step.querySelector(
          ".stepRequestStoreVariable"
        ).value = `store_${testCaseName}integrationID`;
        step.querySelector(".stepRequestStoreValue").value = "_id";
        break;

      case "custom":
      default:
        step.querySelector(".filterKeyContainer1").classList.remove("hidden");
        step.querySelector(".filterKeyContainer2").classList.remove("hidden");
        step.querySelector(".waitUntilContainer").classList.remove("hidden");
        step.querySelector(".customVariableField").classList.remove("hidden");
        step.querySelector(".customVariableValue").classList.remove("hidden");
        step.querySelector(".stepResponse").classList.remove("hidden");
        step.querySelector(".partialValidationContainer").classList.remove("hidden");
        step.querySelector(".bodyPathContainer").classList.remove("hidden");
        step.querySelector(".payloadContainer").classList.remove("hidden");
        step.querySelector(".dataCreationMethodContainer").classList.remove("hidden");
        step.querySelectorAll(".uniqueValueContainer1").forEach((e) => e.classList.remove("hidden"));
        step.querySelectorAll(".uniqueValueContainer2").forEach((e) => e.classList.remove("hidden"));
        step.querySelectorAll(".uniqueValueContainer3").forEach((e) => e.classList.remove("hidden"));
        step.querySelector(".dataValidationMethodContainer").classList.remove("hidden");
        // Show basic fields for custom step
        methodSelect.value = "GET";
        pathInput.value = "";
        break;
    }
  }

  function updateJsonPreview() {
    try {
      suiteName = document.getElementById("suiteName").value;
      const testCaseJson = buildTestCaseJson();
      document.getElementById("jsonPreview").textContent = JSON.stringify(
        testCaseJson,
        null,
        2
      );

      // Update dynamic variables for all steps
      updateDynamicVariables();
    } catch (error) {
      console.error("Error updating JSON preview:", error);
      document.getElementById("jsonPreview").textContent =
        "Error generating JSON: " + error.message;
    }
  }

  function buildTestCaseJson() {
    testCaseName = document.getElementById("testCaseName").value || "";
    const suiteTitle = document.getElementById("suiteTitle").value || "";
    const suiteName = document.getElementById("suiteName").value || "";
    const storeName = document.getElementById("storeName").value || "";

    // Build full suite title if not provided
    const fullSuiteTitle =
      suiteTitle || (testCaseName ? `${testCaseName} | Test Case` : "");

    // Build interactions
    const interactions = [];
    const interactionElements = document.querySelectorAll(
      "#interactionsContainer .interaction"
    );

    interactionElements.forEach((interactionEl) => {
      const testTitle = interactionEl.querySelector(".testTitle").value || "";

      // Build pre-request steps
      const preRequestSteps = [];
      const stepElements = interactionEl.querySelectorAll(".preRequestStep");

      stepElements.forEach((stepEl) => {
        const stepType = stepEl.querySelector(".stepType").value;
        const step = buildStepJson(stepEl, stepType);
        preRequestSteps.push(step);
      });

      // Build final request/response
      const finalRequest = {
        method: interactionEl.querySelector(".finalRequestMethod").value,
        path: interactionEl.querySelector(".finalRequestPath").value,
      };

      const finalResponse = {
        status:
          Number.parseInt(
            interactionEl.querySelector(".finalResponseStatus").value
          ) || 200,
        time:
          Number.parseInt(
            interactionEl.querySelector(".finalResponseTime").value
          ) || 10000,
      };

      // Add optional fields to final response
      const validationMethod = interactionEl.querySelector(
        ".finalResponseValidationMethod"
      ).value;
      if (validationMethod) {
        finalResponse.dataValidationMethod = validationMethod;
      }

      const bodyPath = interactionEl.querySelector(
        ".finalResponseBodyPath"
      ).value;
      if (bodyPath) {
        finalResponse.body = bodyPath;
      }

      const uniqueValue = interactionEl.querySelector(
        ".finalStepResponseUniqueValue1"
      ).value;
      if (uniqueValue) {
        finalResponse.uniqueValue = uniqueValue;
      }
      const secondaryValue = interactionEl.querySelector(
        ".finalStepResponseUniqueValue2"
      ).value;
      if (secondaryValue) {
        finalResponse.secondaryValue = secondaryValue;
      }
      const tertiaryValue = interactionEl.querySelector(
        ".finalStepResponseUniqueValue3"
      ).value;
      if (tertiaryValue) {
        finalResponse.tertiaryValue = tertiaryValue;
      }

      // Build the interaction object
      const interaction = {
        test: testTitle,
        test_title: testTitle,
        pre_request: preRequestSteps,
        request: finalRequest,
        response: finalResponse,
      };

      interactions.push(interaction);
    });

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
    };
  }

  function buildStepJson(stepEl, stepType) {
    const step = {};

    // Build request object
    const request = {
      method: stepEl.querySelector(".stepRequestMethod").value,
      path: stepEl.querySelector(".stepRequestPath").value,
    };

    // Add optional fields based on step type
    switch (stepType) {
      case "flowId":
      case "integrationId":
        const filterKey = stepEl.querySelector(`${stepType == "flowId" ? ".stepRequestFilterKey1" : ".stepRequestFilterKey2"}`).value;
        if (filterKey) {
          request.filterKey = filterKey;
        }

        const storeVariable = stepEl.querySelector(
          ".stepRequestStoreVariable"
        ).value;
        const storeValue = stepEl.querySelector(".stepRequestStoreValue").value;
        if (storeVariable && storeValue) {
          request.storeName =
            document.getElementById("storeName").value || "store1";
          request[storeVariable] = storeValue;
        }
        break;

      case "updateFlowStatus":
      case "updateSettings":
        const settingsMethod = stepEl.querySelector(
          ".stepRequestSettingsMethod"
        ).value;
        if (settingsMethod) {
          request.settingsMethod = settingsMethod;
        }

        const payload = stepEl.querySelector(".stepRequestPayload").value;
        if (payload) {
          request.payload = payload;
        }
        break;

      case "dataCreation":
        const dataCreationPayload = stepEl.querySelector(
          ".stepRequestPayload"
        ).value;
        if (dataCreationPayload) {
          request.payload = dataCreationPayload;
        }

        const dataCreationMethod = stepEl.querySelector(
          ".stepRequestDataCreationMethod"
        ).value;
        if (dataCreationMethod) {
          request.dataCreationMethod = dataCreationMethod;
        }

        const uniqueValue = stepEl.querySelector(
          ".stepRequestUniqueValue1"
        ).value;
        //TO DO: add more unique values
        if (uniqueValue) {
          request.uniqueValue = uniqueValue;
        }
        break;

      case "flowValidation":
        const waitUntil = stepEl.querySelector(".stepRequestWaitUntil").value;
        if (waitUntil) {
          request.waitUntil = waitUntil;
        }

        const flowStoreVariable = stepEl.querySelector(
          ".stepRequestStoreVariable"
        ).value;
        const flowStoreValue = stepEl.querySelector(
          ".stepRequestStoreValue"
        ).value;
        if (flowStoreVariable && flowStoreValue) {
          request[flowStoreVariable] = flowStoreValue;
        }

        // Build response object for flow validation
        const response = {
          status:
            Number.parseInt(
              stepEl.querySelector(".stepResponseStatus").value
            ) || 200,
        };

        const partialValidation = stepEl.querySelector(
          ".stepResponsePartialValidation"
        ).value;
        if (partialValidation === "true") {
          response.partialValidation = true;
        }

        const bodyPath = stepEl.querySelector(".stepResponseBodyPath").value;
        if (bodyPath) {
          response.body = bodyPath;
        }

        step.response = response;
        break;
    }

    step.request = request;
    return step;
  }

  function updateDynamicVariables() {
    // Clear existing variables
    dynamicVariables.clear();

    // Collect all store variables from steps
    const storeVariableInputs = document.querySelectorAll(
      ".stepRequestStoreVariable"
    );
    storeVariableInputs.forEach((input) => {
      const value = input.value.trim();
      if (value && value.startsWith("store_")) {
        const varName = value.substring(6); // Remove 'store_' prefix
        dynamicVariables.add(varName);
      }
    });

    // Update all path inputs with dynamic variables
    updatePathsWithDynamicVariables();
  }

  function updatePathsWithDynamicVariables() {
    const pathInputs = document.querySelectorAll(
      ".stepRequestPath, .finalRequestPath"
    );
    testCaseName = document.getElementById("testCaseName").value || "C8266";

    pathInputs.forEach((input) => {
      const currentValue = input.value;

      // Check if we need to update with dynamic variables
      dynamicVariables.forEach((varName) => {
        const placeholder = `{{${testCaseName}${varName}}}`;
        if (currentValue.includes(placeholder)) {
          // Variable is already in the correct format
          return;
        }

        const simpleVarName = varName.replace(testCaseName, "");
        const simplePlaceholder = `{{${simpleVarName}}}`;

        if (currentValue.includes(simplePlaceholder)) {
          // Replace simple placeholder with full placeholder
          input.value = currentValue.replace(simplePlaceholder, placeholder);
        }
      });
    });
  }

  function copyJsonToClipboard() {
    const jsonText = document.getElementById("jsonPreview").textContent;
    navigator.clipboard
      .writeText(jsonText)
      .then(() => {
        alert("JSON copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy JSON: ", err);
        alert("Failed to copy JSON to clipboard");
      });
  }

  function arrangeTheIntegrationOrder() {
    document.querySelectorAll(".interaction-name").forEach((node, i) => {
      node.textContent = `Interaction ${i + 1}`;
    });
  }

  function attachSettingAddOns(step, type) {
    let settingsBodyPath = step.querySelector(".stepRequestPayload").value;
    flowUpdateStatusCallCounter++;
    let payloadObj = {};
    let template = document.getElementById(addOnObj[type]);
    let templateClone = document.importNode(template.content, true);
    step.querySelector(".addOnForPreRequest").appendChild(templateClone);
    console.log("entered");
    if (type == "updateFlowStatus") {
      let addOne = step
        .querySelector(".addOnForPreRequest")
        .querySelector(".flow-selector");
      const flowHeader = addOne.querySelector(".flow-header");
      const flowOptions = addOne.querySelector(".flow-options");
      const flowChevron = addOne.querySelector(".flow-header i");

      flowHeader.addEventListener("click", function () {
        flowOptions.classList.toggle("hidden");
        flowChevron.classList.toggle("fa-chevron-down");
        flowChevron.classList.toggle("fa-chevron-up");
      });

      // Update JSON preview when flow options change
      const flowCheckboxes = addOne.querySelectorAll(".flow-checkbox");
      const flowToggles = addOne.querySelectorAll(".flow-toggle");
      const flowJsonPreview = step
        .querySelector(".addOnForPreRequest")
        .querySelector("#flow-json-preview");
      flowJsonPreview.addEventListener("change", () => {
        payloadObj = {
          body: flowJsonPreview.textContent,
          path: settingsBodyPath,
        };
        console.log("payloadObj settings is ", payloadObj);
        pushPayloads(payloadObj);
        //bodyDetails.push(payloadObj)
        console.log("bodyDetails is ", bodyDetails);
      });
      // payloadObj = {
      //   body: flowJsonPreview.textContent,
      //   path: settingsBodyPath
      // }
      //console.log("payloadObj pre is ", payloadObj)

      flowCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateFlowJson);
      });

      flowToggles.forEach((toggle) => {
        toggle.addEventListener("change", updateFlowJson);
      });

      function updateFlowJson() {
        const flowData = {};

        addOne.querySelectorAll(".flow-option").forEach((option, index) => {
          const checkbox = option.querySelector(".flow-checkbox");
          const toggle = option.querySelector(".flow-toggle");
          const flowName = option.querySelector("span").textContent;

          if (checkbox.checked) {
            flowData[flowName] = toggle.checked;
          }
        });

        flowJsonPreview.textContent = JSON.stringify(flowData, null, 2);
        payloadObj = {
          body: flowJsonPreview.textContent,
          path: settingsBodyPath,
        };
        console.log("payloadObj settings is ", payloadObj);
        pushPayloads(payloadObj);
        //bodyDetails.push(payloadObj)
        console.log("bodyDetails settings is ", bodyDetails);
      }
    } else if (type == "updateSettings") {
      let addOne = step
        .querySelector(".addOnForPreRequest")
        .querySelector(".settings-add-on");
      const taxOption = addOne.querySelector("#tax-option");
      const perLineTaxes = addOne.querySelector("#per-line-taxes");
      const defaultTaxCode = addOne.querySelector("#default-tax-code");
      const shopifyOrder = addOne.querySelector("#shopify-order-id");
      const taxJsonPreview = addOne.querySelector("#tax-json-preview");
      taxJsonPreview.addEventListener("change", () => {
        payloadObj = {
          body: taxJsonPreview.textContent,
          path: settingsBodyPath,
        };
        console.log("payloadObj settings is ", payloadObj);
      });
      function updateTaxJson() {
        const taxData = {};
        if (taxOption.value) {
          taxData["Sync sales tax to NetSuite as"] = taxOption.value;
        }
        if (perLineTaxes.checked !== undefined) {
          taxData["Per-line taxes on transaction enabled in NetSuite"] =
            perLineTaxes.checked;
        }
        if (defaultTaxCode.value) {
          taxData[
            "Default tax code or group when no match is found in NetSuite "
          ] = defaultTaxCode.value;
        }
        if (shopifyOrder.value) {
          taxData["Shopify order IDs"] = shopifyOrder.value;
        }
        taxJsonPreview.textContent = JSON.stringify(taxData, null, 2);
        payloadObj = {
          body: taxJsonPreview.textContent,
          path: settingsBodyPath,
        };
        console.log("payloadObj settings is ", payloadObj);
        pushPayloads(payloadObj);
        //bodyDetails.push(payloadObj)
        console.log("bodyDetails settings is ", bodyDetails);
      }

      taxOption.addEventListener("change", updateTaxJson);
      perLineTaxes.addEventListener("change", updateTaxJson);
      defaultTaxCode.addEventListener("input", updateTaxJson);
      shopifyOrder.addEventListener("input", updateTaxJson);

      // Initialize tax JSON preview
      updateTaxJson();
    }
  }

  function attachDataCreationAddOns(step, type) {
    let preStepBodyPath = step.querySelector(".stepRequestPayload").value;
    dataCreationCounter++;
    const templateClone = document.importNode(
      document.getElementById("dataCreationTemplate").content,
      true
    );
    const addOnContainer = step.querySelector(".addOnForPreRequest");
    addOnContainer.appendChild(templateClone);

    const updateDetails = (step) => {
      let payloadObj = {};
      const functionValue = step.querySelector(
        ".stepRequestDataCreationMethod"
      ).value;
      const details =
        creationFunctionDetailsHandler[functionValue](testCaseName);

      step.querySelector(".stepRequestPath").value = details.path;

      Object.keys(details.uniqueValues).forEach((key, index) => {
        const uniqueValueContainer = step.querySelector(
          `.uniqueValueContainer${index + 1}`
        );
        uniqueValueContainer.classList.remove("hidden");
        uniqueValueContainer.querySelector(
          `.stepRequestUniqueValue${index + 1}`
        ).placeholder = details.uniqueValues[key];
      });
      details.json = JSON.stringify(details.json).split("testCaseName").join(`${testCaseName}`);
      addOnContainer.querySelector("#flow-json-preview").textContent =
        JSON.stringify(JSON.parse(details.json), null, 2);
      addOnContainer
        .querySelector("#flow-json-preview")
        .addEventListener("input", () => {
          payloadObj = {
            body: addOnContainer.querySelector("#flow-json-preview")
              .textContent,
            path: preStepBodyPath,
          };
          console.log("payloadObj pre is ", payloadObj);
        });
      payloadObj = {
        body: addOnContainer.querySelector("#flow-json-preview").textContent,
        path: preStepBodyPath,
      };
      console.log("payloadObj pre is ", payloadObj);
      pushPayloads(payloadObj);
      //bodyDetails.push(payloadObj)
      console.log("bodyDetails is ", bodyDetails);
      handleReusableOptions(addOnContainer, [...reusableOptions]);
      reusableOptions.push(...details.mapFields);
      handleMappedOptions(addOnContainer, [...details.mapFields]);
    };

    updateDetails(step);
    step
      .querySelector(".stepRequestDataCreationMethod")
      .addEventListener("change", () => {
        step
          .querySelectorAll(".uniqueValueContainer1")
          .forEach((e) => e.classList.add("hidden"));
        step
          .querySelectorAll(".uniqueValueContainer2")
          .forEach((e) => e.classList.add("hidden"));
        step
          .querySelectorAll(".uniqueValueContainer3")
          .forEach((e) => e.classList.add("hidden"));
        updateDetails(step);
      });
  }

  function attachFlowValidationAddOn(step, type) {
    let payloadObj = {}
    let preStepBodyPath = step.querySelector(".stepResponseBodyPath").value;
    console.log("preStepBodyPath is ", step.querySelector(".stepRequestPath").value)
    flowValidateResponseCounter++;
    const templateClone = document.importNode(
      document.getElementById("flowValidationTemplate").content,
      true
    );
    const addOnContainer = step.querySelector(".addOnForPreRequest");
    addOnContainer.appendChild(templateClone);
    let jsonBody = [
      {
        "_flowId": `{{${step.querySelector(".stepRequestPath").value.split('{{')[1].split('}}')[0]}}}`,
        "type": "flow",
        "status": "completed",
        "numError": 0,
        "numSuccess": 1,
        "numIgnore": 0,
        "numResolved": 0
      }
    ]

    addOnContainer.querySelector("#flow-json-preview").textContent =
      JSON.stringify(jsonBody, null, 2);
    step.querySelector(".filterKeyContainer1").addEventListener("change", () => {
      jsonBody = [
        {
          "_flowId": `{{${step.querySelector(".stepRequestPath").value.split('{{')[1].split('}}')[0]}}}`,
          "type": "flow",
          "status": "completed",
          "numError": 0,
          "numSuccess": 1,
          "numIgnore": 0,
          "numResolved": 0
        }
      ]

      addOnContainer.querySelector("#flow-json-preview").textContent =
        JSON.stringify(jsonBody, null, 2);
      updateJsonPreview();
    })
    addOnContainer
      .querySelector("#flow-json-preview")
      .addEventListener("input", () => {
        payloadObj = {
          body: addOnContainer.querySelector("#flow-json-preview")
            .textContent,
          path: preStepBodyPath,
        };
        console.log("payloadObj pre is ", payloadObj);
      });
    payloadObj = {
      body: addOnContainer.querySelector("#flow-json-preview").textContent,
      path: preStepBodyPath,
    };
    console.log("payloadObj pre is ", payloadObj);
    pushPayloads(payloadObj);
  }

  function filterOptions(options, inputValue) {
    if (!inputValue) {
      return options;
    }
    return options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function renderOptions(
    filteredOptions,
    optionsList,
    inputElement,
    dropdownElement
  ) {
    optionsList.innerHTML = "";
    console.log("filteredOptions is ", filteredOptions);
    if (filteredOptions.length === 0) {
      const noResults = document.createElement("li");
      noResults.className = "px-4 py-2 text-sm text-gray-500";
      noResults.textContent = "No options found";
      optionsList.appendChild(noResults);
      return;
    }

    filteredOptions.forEach((option) => {
      //console.log("option inside filteredOptions", option);
      const li = document.createElement("li");
      li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm";
      li.textContent = option;
      li.addEventListener("click", () => {
        inputElement.value = option;
        dropdownElement.classList.add("hidden");
      });
      optionsList.appendChild(li);
    });
  }

  function handleReusableOptions(addOnContainer, options) {
    console.log("entered inside handleReusableOptions");
    const inputElement = addOnContainer.querySelector("#autocomplete-input");
    const dropdownElement = addOnContainer.querySelector("#options-dropdown");
    const optionsList = addOnContainer.querySelector("#options-list");
    console.log("reusableOptions before ", options);
    setupAutocomplete(inputElement, dropdownElement, optionsList, options);
    document.addEventListener("click", (event) => {
      if (
        !inputElement.contains(event.target) &&
        !dropdownElement.contains(event.target)
      ) {
        dropdownElement.classList.add("hidden");
      }
    });
  }

  function handleMappedOptions(addOnContainer, mappingOptions) {
    console.log("entered inside handleMappedOptions");
    console.log("mappingOptions ", mappingOptions);
    const mappedFieldsInput = addOnContainer.querySelector(
      "#mapped-fields-input"
    );
    const mappedFieldsDropdown = addOnContainer.querySelector(
      "#mapped-fields-dropdown"
    );
    const mappedFieldsList = addOnContainer.querySelector(
      "#mapped-fields-list"
    );
    setupAutocomplete(
      mappedFieldsInput,
      mappedFieldsDropdown,
      mappedFieldsList,
      mappingOptions
    );
    document.addEventListener("click", (event) => {
      if (
        !mappedFieldsInput.contains(event.target) &&
        !mappedFieldsDropdown.contains(event.target)
      ) {
        mappedFieldsDropdown.classList.add("hidden");
      }
    });
  }

  function setupAutocomplete(
    inputElement,
    dropdownElement,
    optionsList,
    options
  ) {
    // Show dropdown when input is focused
    inputElement.addEventListener("focus", () => {
      const filteredOptions = filterOptions(options, inputElement.value);
      renderOptions(
        filteredOptions,
        optionsList,
        inputElement,
        dropdownElement
      );
      dropdownElement.classList.remove("hidden");
    });

    // Filter options as user types
    inputElement.addEventListener("input", () => {
      const filteredOptions = filterOptions(options, inputElement.value);
      renderOptions(
        filteredOptions,
        optionsList,
        inputElement,
        dropdownElement
      );
      dropdownElement.classList.remove("hidden");
    });

    // Initial render of options
    renderOptions(options, optionsList, inputElement, dropdownElement);
  }

  function updateFinalSteps(interaction) {
    let finalStepBodyPath = `/test-data/${suiteName}/responses/${testCaseName}/${testCaseName}finalValidation_response${finalValidationCounter}.json`;
    console.log("finalStepBodyPath is ", finalStepBodyPath)
    interaction.querySelector(".finalResponseBodyPath").value = finalStepBodyPath;
    document.getElementById("suiteName").addEventListener("input", () => {
      console.log("triggered to update ")
      interaction.querySelector(".finalResponseBodyPath").value = `/test-data/${suiteName}/responses/${testCaseName}/${testCaseName}finalValidation_response${finalValidationCounter}.json`
    });
    document.getElementById("testCaseName").addEventListener("input", (e) => {
      interaction.querySelector(".finalResponseBodyPath").value = `/test-data/${suiteName}/responses/${testCaseName}/${testCaseName}finalValidation_response${finalValidationCounter}.json`
    });

    finalValidationCounter++;
    const templateClone = document.importNode(
      document.getElementById("dataCreationTemplate").content,
      true
    );
    const addOnContainer = interaction.querySelector(".addOnForFinalRequest");
    addOnContainer.appendChild(templateClone);

    const updateDetails = (interaction) => {
      let payloadObj = {};
      const functionValue = interaction.querySelector(
        ".finalResponseValidationMethod"
      ).value;
      //if (functionValue == 'pleaseSelect') return
      console.log("functionValue is ", functionValue);
      const details =
        validationFunctionDetailsHandler[functionValue](testCaseName);

      interaction.querySelector(".finalRequestPath").value = details.path;

      Object.keys(details.uniqueValues).forEach((key, index) => {
        const uniqueValueContainer = interaction.querySelector(
          `.uniqueValueFinalContainer${index + 1}`
        );
        uniqueValueContainer.classList.remove("hidden");
        uniqueValueContainer.querySelector(`.finalStepResponseUniqueValue${index + 1}`).placeholder = details.uniqueValues[key];
      });
      details.json = JSON.stringify(details.json).split("testCaseName").join(`${testCaseName}`);
      addOnContainer.querySelector("#flow-json-preview").textContent =
        JSON.stringify(JSON.parse(details.json), null, 2);
      addOnContainer.querySelector("#flow-json-preview").addEventListener("input", () => {
          payloadObj = {
            body: addOnContainer.querySelector("#flow-json-preview")
              .textContent,
            path: interaction.querySelector(".finalResponseBodyPath").value,
          };
          pushPayloads(payloadObj)
          console.log("payloadObj is ", payloadObj);
        });
      if (functionValue !== 'pleaseSelect') {
        payloadObj = {
          body: addOnContainer.querySelector("#flow-json-preview").textContent,
          path: interaction.querySelector(".finalResponseBodyPath").value,
        };
        pushPayloads(payloadObj);
      }
      console.log("payloadObj is ", payloadObj);
      handleReusableOptions(addOnContainer, [...reusableOptions]);
      reusableOptions.push(...details.mapFields);
      handleMappedOptions(addOnContainer, [...details.mapFields]);
    };

    updateDetails(interaction);
    interaction.querySelector(".finalResponseValidationMethod").addEventListener("change", () => {
      interaction.querySelectorAll(".uniqueValueContainer1").forEach((e) => e.classList.add("hidden"));
      interaction.querySelectorAll(".uniqueValueContainer2").forEach((e) => e.classList.add("hidden"));
      interaction.querySelectorAll(".uniqueValueContainer3").forEach((e) => e.classList.add("hidden"));
      updateDetails(interaction);
    });
  }

  function pushPayloads(payloadObj) {
    let flag = true;
    bodyDetails.forEach((e, i) => {
      if (e.path == payloadObj.path) {
        e = payloadObj;
        flag = false;
      }
    });
    if (flag) bodyDetails.push(payloadObj);
  }

  async function downloadJson() {
    console.log("downloadJson is triggered")
    for (let i in bodyDetails) {
      const payload = bodyDetails[i].body;
      const filePath = bodyDetails[i].path

      if (!payload || !filePath) {
        // alert("Both JSON and file path are required!");
        // return;
        continue;
      }

      const response = await fetch("http://localhost:3000/save-payload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath, data: payload }),
      });

      const result = await response.json();
      if (result.success) {
        // document.getElementById(
        //   "saveStatus"
        // ).textContent = `✅ Payload saved to: ${result.path}`;
      } else {
        alert("Failed to save files: " + result.error);
      }
    }

  }

});

async function getEnvDetails(filePath) {
  const response = await fetch(`http://localhost:3000/get-env-details?filePath=${filePath}`);
  const result = await response.json();
  if (result.success) {
    console.log("Env details are ", result.envKeys);
    return result.envKeys;
  } else {
    alert("Failed to get env details: " + result.error);
  }
}
