export function getUniqueValueCount(functionName) {
    if(functionName){
        let uniqueValueFunctions = [
            "createSHPFDraftOrderthoughAPI"
        ]
        let secondaryValueFunctions = [
        ]
        let tertiaryValueFunctions = [
        ]
        if (uniqueValueFunctions.includes(functionName)) return 1
        if (secondaryValueFunctions.includes(functionName)) return 2
        if (tertiaryValueFunctions.includes(functionName)) return 3
        return 0
    } else {
        console.log("functionName is undefined")
        return 0
    }
}

export function copyJsonToClipboard(document) {
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