import react, { useState, useEffect } from "react";
import Parse from "parse";
import TownToTownCode from "../model/TownToTownCode";
import VillageData from "../model/VillageData";
import TopCalcReg from "./TopCalcReg";
import TopFilter from "./TopFilter";
import regionPicked from "../dataStorage/RegionPicked";
import RegionalCalc from "./RegionalCalc";

function GetRegionalData(year, muniType, muniName, office, region, prim) {
  const [officeArray, setOfficeArray] = useState([]);
  const section = localStorage.getItem("section");
  const regionMuniType = localStorage.getItem("regionMuniType");
  const regionResults = [];
  const regionEdArray = [];
  const regionEdArray2 = [];
  const edSelect = JSON.parse(localStorage.getItem("edSelect"));
  let parseArray = [];
  const resultsToRegionArray = JSON.parse(localStorage.getItem("resultsToRegionArray"));
  let parseQ = "";


  const thisFunc = async () => {



    const lastTwo = year.slice(2);

    if (prim.includes("Primary")) {
      if (year === "2016" || year === "2017") {
        parseQ = new Parse.Query(`RegionalPrimary16to17`);
      } else if (+year > 2017) {
        parseQ = new Parse.Query(`RegionalPrimary${lastTwo}`);
      } else {
        parseQ = new Parse.Query(`RegionalPrimary`);
      }
    } else {
      parseQ = new Parse.Query(`Regional${year}`);
    }

    parseQ.equalTo("section", section);
    parseQ.limit(15000)
    let queryResults = await parseQ.find();
    let twdSelection = ''

    if (regionMuniType === "Election District") {
      for (const ed of edSelect.array) {
        if (ed.ed === region) {
          twdSelection = ed
        }
      } 
    }

    for (const item of regionPicked) {
        if (regionMuniType === "Election District") {
          if (item.ed === twdSelection.twd) {
            regionEdArray.push(item.ed);
            break
          }
        } else if (
        (regionMuniType === "Town/City" || regionMuniType === "Village") &&
        !region.includes("Council District")
      ) {
        if (item.region === region) {
          regionEdArray.push(item.ed);
        }
      } else {
        if (item.region === region) {
          regionEdArray.push(item.ed);
        }
      }
    }
    for (const ed of regionEdArray) {
        for (const object of queryResults) {
            if (ed === object.get('twd')) {
                regionResults.push(object)
            }
        } 
    } 

    for (const object of resultsToRegionArray) {
        for (const result of regionResults) {
            if ((result.get('candidate') === object.candidate) && (result.get('party') === object.party)) {
                regionEdArray2.push(result)
            }
        }
    }

    let regionCalc = RegionalCalc(regionResults, regionEdArray, resultsToRegionArray)


    //Fix This!!!!!! ---> Add up all votes for candidate party and three bottom items
    for (const item of regionCalc) {
      let candidateObject = { candidate: "", party: "", votes: "" };
      candidateObject.candidate = item.candidate
      candidateObject.party = item.party
      candidateObject.votes = TopCalcReg(queryResults, item);
      parseArray.push(candidateObject);
    }

    let topSub = TopFilter(parseArray);
    setOfficeArray(topSub);
  };

  useEffect(() => {
    thisFunc();
  }, []);

  return officeArray;
}

export default GetRegionalData;
