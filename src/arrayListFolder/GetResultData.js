import react, { useState, useEffect } from "react";
import Parse from "parse/lib/browser/Parse";
import TopCalc from "./TopCalc";
import TopFilter from "./TopFilter";
import TownToTownCode from "../model/TownToTownCode";
import VillageData from "../model/VillageData";
import SortParty from "./SortParty";

function GetResultData(year, muniType, muniName, office, prim, section) {
  const [officeArray, setOfficeArray] = useState([]);
  let parseQ = "";
  let parseArray = [];
  let sectionGen = "";

  const thisFunc = async () => {
    const lastTwo = year.slice(2);

    if (prim.includes("Primary")) {
      if (year === "2016" || year === "2017") {
        parseQ = new Parse.Query(`ResultsPrimary16to17`);
      } else if (+year > 2017) {
        parseQ = new Parse.Query(`ResultsPrimary${lastTwo}`);
      } else {
        parseQ = new Parse.Query(`ResultsPrimary`);
      }
      parseQ.contains("section", section);
    } else {
      parseQ = new Parse.Query(`Results${year}`);
    }

    parseQ.contains("resultMuni", muniType);
    parseQ.equalTo("resultOffice", office);
    if (muniType === "Town/City") {
      const townCode = TownToTownCode(muniName);
      parseQ.contains("twdAbbr", townCode.toString());
    } else if (muniType === "Village") {
      let villageEdArray = [];
      let villageData = VillageData();
      for (const item of villageData) {
        if (muniName === item.village) {
          villageEdArray.push(item.ed);
        }
      }
      villageEdArray.sort();
      const firstEd = villageEdArray[0];
      parseQ.contains("twdFirst", firstEd.toString());
    }

    let queryResults = await parseQ.find();

    for (const item of queryResults) {
      let candidateObject = { candidate: "", party: "", votes: "" };
      candidateObject.candidate = item.get("candidate");
      candidateObject.party = item.get("party");
      candidateObject.votes = TopCalc(queryResults, item);
      sectionGen = item.get("section");
      parseArray.push(candidateObject);
    }

    localStorage.setItem("resultsToRegionArray", JSON.stringify(parseArray));
    if (!(prim.includes("Primary"))) {
      console.log(sectionGen)
      localStorage.setItem("section", sectionGen);
    }
    let topSub = TopFilter(parseArray);
    setOfficeArray(topSub);
  };

  useEffect(() => {
    thisFunc();
  }, []);

  return officeArray;
}

export default GetResultData;
