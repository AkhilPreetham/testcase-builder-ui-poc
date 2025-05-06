/*
|import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function extractKeysAndStoreInArray(filePath) {
    const envFilePath = path.resolve(__dirname, filePath); // adjust path if needed
    const envContent = fs.readFileSync(envFilePath, 'utf-8');
    
    
    const envKeys = envContent
      .split('\n')                        // Split by lines
      .map(line => line.trim())          // Trim whitespace
      .filter(line => line && !line.startsWith('#'))  // Remove empty and comment lines
      .map(line => line.split('=')[0])   // Get key part before =
      .map(key => `process.env["${key}"]`); // Format as process.env["KEY"]
    
    console.log(envKeys);

  return envKeys;
}

// Example usage
// const filePath = '../env/dev.txt'; // Replace with your file path
// const envKeysArray = extractKeysAndStoreInArray(filePath);
// console.log("envKeysArray is ", JSON.stringify(envKeysArray, null, 2));
*/