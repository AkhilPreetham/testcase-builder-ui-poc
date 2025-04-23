export function getUniqueValueCount(functionName) {
  if (!functionName) {
      console.error("functionName is undefined");
      return 0;
  }

  const uniqueValueFunctions = new Set(["createSHPFDraftOrderthoughAPI"]);
  const secondaryValueFunctions = new Set();
  const tertiaryValueFunctions = new Set();

  if (uniqueValueFunctions.has(functionName)) return 1;
  if (secondaryValueFunctions.has(functionName)) return 2;
  if (tertiaryValueFunctions.has(functionName)) return 3;

  return 0;
}

export function copyJsonToClipboard() {
  const jsonPreviewElement = document.getElementById("jsonPreview");
  if (!jsonPreviewElement) {
      console.error("Element with ID 'jsonPreview' not found");
      alert("Failed to copy JSON: Element not found");
      return;
  }

  const jsonText = jsonPreviewElement.textContent;
  if (!jsonText) {
      console.error("No text content found in 'jsonPreview' element");
      alert("Failed to copy JSON: No content to copy");
      return;
  }

  navigator.clipboard
      .writeText(jsonText)
      .then(() => {
          console.log("JSON copied to clipboard");
          alert("JSON copied to clipboard!");
      })
      .catch((err) => {
          console.error("Failed to copy JSON: ", err);
          alert("Failed to copy JSON to clipboard");
      });
}