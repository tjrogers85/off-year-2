import regionPicked from "../dataStorage/RegionPicked";
const regionMuniType = sessionStorage.getItem("regionMuniType");
const office = sessionStorage.getItem("office");
const regionEdArray = [];
let twdSelection = "";
const edSelect = JSON.parse(sessionStorage.getItem("edSelect"));

function EdArray(region) {
  if (regionMuniType === "Election District") {
    for (const ed of edSelect.array) {
      if (ed.ed === region) {
        twdSelection = ed;
      }
    }
  }



  let i = 0;
  for (const item of regionPicked) {
    if (regionMuniType === "Election District") {
      if (item.ed === twdSelection.twd) {
        regionEdArray.push(item.ed);
        break;
      }
    } else if (
      (regionMuniType === "Town/City" || regionMuniType === "Village") &&
      !region.includes("City Council")
    ) {
      if (item.region === region) {
        regionEdArray.push(item.ed);
      }
    } else if (region.includes("Congress") || region.includes("State Senate") || 
    region.includes("Assembly") || region.includes("County Legislator") || 
    region.includes("Council District")) {
      if (item.region === region) {
        regionEdArray.push(item.ed);
      }
    } else {
      regionEdArray.push(item.ed);
    }
  }

  return regionEdArray;
}

export default EdArray;
