import Parse from "parse";
import react, { useState, useEffect } from "react";
import TwdToMapEd from "../model/TwdToMapEd";

function GetDemPct(edArray) {
  const year = sessionStorage.getItem("year");
  const parseQ = new Parse.Query(`Regional${year}`);
  const getDems = JSON.parse(sessionStorage.getItem("demCandArray"));
  const office = sessionStorage.getItem("office");
  const [dataArray, setDataArray] = useState([]);

  parseQ.containedIn("twd", edArray);
  parseQ.containedIn("candidate", getDems.array);
  parseQ.contains("office", office);
  parseQ.limit(10000);

  const thisFunc = async () => {
    let queryTest = [];

    let queryResults = await parseQ.find();
    for (const item of queryResults) {
      let tempObject = { candidate: "", ed: "" };
      tempObject.candidate = item.get("candidate");
      tempObject.ed = item.get("twd");
      tempObject.office = item.get("office");
      tempObject.votes = item.get("votes");

      queryTest.push(tempObject);
    }
    setDataArray(queryTest);
  };
  let queryTest2 = dataArray;

  let demMapArray = [];
  for (const item of edArray) {
    let object2 = { ed: item };
    let demTotal = 0;
    let tcTotal = 0;
    for (const item2 of queryTest2) {
      if (item === item2.ed) {
        if (!item2.candidate.includes("TOTAL CANVASS")) {
          demTotal = demTotal + +item2.votes;
        } else {
          tcTotal = +item2.votes;
        }
      }
    }
    object2.demVotes = demTotal;
    object2.tcVotes = tcTotal;
    object2.demPct = demTotal / tcTotal;
    object2.demPctString = `${(object2.demPct * 100).toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    })}%`;
    object2.mapEd = `${TwdToMapEd(item).ed} - ${object2.demPctString}`

    demMapArray.push(object2);
    for (const item of demMapArray) {
      const demNum = item.demPct * 100;
      let b = 0;
      let g = 0;
      let r = 0;
      if (demNum > 51 && demNum < 101) {
        b = 229;
        if (((50 - demNum) * 5 + 204) < 0) {
          g = 0
        } else {
          g = (50 - demNum) * 5 + 204;
        }
        if (((50 - demNum) * 7 + 179) < 0) {
          r = 0
        } else {
          r = (50 - demNum) * 7 + 179;
        }
      } else if (demNum < 49) {
        if (((demNum - 50) * 6 + 184) < 0 ){
          b = 0
        } else {
          b = (demNum - 50) * 6 + 184;
        }
        if (((demNum - 50) * 6 + 184) < 0 ) {
          g = 0
        } else {
          g = (demNum - 50) * 6 + 184;
        }
        r = 204;
      } else {
        b = 175;
        g = 175;
        r = 175;
      }
      item.colors = { b: b, g: g, r: r }
    }
  }

  useEffect(() => {
    thisFunc();
  }, []);

  return demMapArray;
}

export default GetDemPct;
