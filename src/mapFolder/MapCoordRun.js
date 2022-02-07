// import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Parse from "parse";
import { set } from "parse/lib/browser/CoreManager";
import EdArray from "../dataFolder/EdArray";
import GetDemPct from "../dataFolder/GetDemPct";
import TwdToMapEd from "../model/TwdToMapEd";

async function MapCoordRun() {
  // const [edMapArray, setEdMapArray] = useState([]);
  const parseQ = new Parse.Query(`Coords2016`);
  const year = localStorage.getItem("year");
  const parseQ2 = new Parse.Query(`Regional${year}`);
  const muniType = localStorage.getItem("muniType");
  const muniName = localStorage.getItem("muniName");
  const office = localStorage.getItem("office");
  let checking = localStorage.getItem("uEstate");
  const getDems = JSON.parse(localStorage.getItem("demCandArray"));

  let test = [];

  let edArray = [];
  let edArray2 = [];

  if (
    (muniType === "Town/City" || muniType === "Village") &&
    !office.includes("City Council")
  ) {
    test = EdArray(muniName);
  } else {
    test = EdArray(office);
  }
  edArray = [...new Set(test)];

  let queryTest = [];

  parseQ2.containedIn("twd", edArray);
  parseQ2.containedIn("candidate", getDems.array);
  parseQ2.contains("office", office);
  parseQ2.limit(10000);

  let queryResults = await parseQ2.find();
  for (const item of queryResults) {
    let tempObject = { candidate: "", ed: "" };
    tempObject.candidate = item.get("candidate");
    tempObject.ed = item.get("twd");
    tempObject.office = item.get("office");
    tempObject.votes = item.get("votes");

    queryTest.push(tempObject);
  }

  let tempArray4 = [];

  for (const item of edArray) {
    let demMapArray = [];
    let tempArray3 = [];

    let object2 = { ed: item };
    let demTotal = 0;
    let tcTotal = 0;
    for (const item2 of queryTest) {
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
    object2.mapEd = `${TwdToMapEd(item).ed} - ${object2.demPctString}`;

    demMapArray.push(object2);

    for (const item of demMapArray) {
      const demNum = item.demPct * 100;
      let b = 0;
      let g = 0;
      let r = 0;
      if (demNum > 51 && demNum < 101) {
        b = 229;
        if ((50 - demNum) * 5 + 204 < 0) {
          g = 0;
        } else {
          g = (50 - demNum) * 5 + 204;
        }
        if ((50 - demNum) * 7 + 179 < 0) {
          r = 0;
        } else {
          r = (50 - demNum) * 7 + 179;
        }
      } else if (demNum < 49) {
        if ((demNum - 50) * 6 + 184 < 0) {
          b = 0;
        } else {
          b = (demNum - 50) * 6 + 184;
        }
        if ((demNum - 50) * 6 + 184 < 0) {
          g = 0;
        } else {
          g = (demNum - 50) * 6 + 184;
        }
        r = 204;
      } else {
        b = 175;
        g = 175;
        r = 175;
      }
      item.colors = { b: b, g: g, r: r };
    }

    if (checking < 1) {
      parseQ.containedIn("twd", edArray);
      parseQ.limit(100000);
      let queryResults = await parseQ.find();

      for (const item of queryResults) {
        let object = { ed: "", coords: [] };
        object.ed = item.get("twd");
        object.coords = item.get("coords");
        if (
          !(item.get("supp") === "supp" || item.get("supp") === "suppAdded")
        ) {
          edArray2.push(object);
        }
      }
      // setEdMapArray(edArray);
      checking = checking + 1;
      localStorage.setItem("uEstate", checking);
    }

    
    for (const item of edArray2) {
      let object = { name: "", data: [] };
      object.name = item.ed;
      let tempArray2 = [];
      for (let i = 0; i < item.coords.length - 1; i += 2) {
        let tempArray = [];
        tempArray.push(item.coords[i]);
        tempArray.push(item.coords[i + 1]);
        tempArray2.push(tempArray);
      }
      object.data = [tempArray2];

      tempArray3.push(object);
    }

console.log(tempArray3)
console.log(demMapArray)

    for (const item of tempArray3) {
      for (const item2 of demMapArray) {
        if (item.name === item2.ed) {
          item.demPct = item2.demPct;
          item.demPctString = item2.demPctString;
          item.colors = item2.colors;
          item.mapEd = item2.mapEd;
          tempArray4.push(item)
        }
      }
    }
  }


  localStorage.setItem("mapArray", JSON.stringify({ mapArray: tempArray4 }));

  console.log(tempArray4)
  return tempArray4;
}

export default MapCoordRun;
