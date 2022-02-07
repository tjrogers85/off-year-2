import React, { useRef, useEffect, useState } from "react";
import Parse from "parse";
import EdArray from "./EdArray";

function LoadMapEdArray() {
  const [edMapArray, setEdMapArray] = useState([]);
  const parseQ = new Parse.Query(`Coords2016`);
  const office = localStorage.getItem("office");
  let checking = localStorage.getItem("uEstate");

  let edArray = [];
  const test = EdArray(office);

  const ThisFunc = async () => {
    if (checking < 100000000) {
      parseQ.containedIn("twd", test);
      parseQ.limit(10000);
      let queryResults = await parseQ.find();

      for (const item of queryResults) {
        let object = { ed: "", coords: [] };
        object.ed = item.get("twd");
        object.coords = item.get("coords");
        edArray.push(object);
      }
      setEdMapArray(edArray);
      checking = checking + 1;
      localStorage.setItem("uEstate", checking);
    }
  };

  useEffect(() => {
    ThisFunc();
  });

  let tempArray3 = [];
  for (const item of edMapArray) {
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
  return tempArray3;
}
export default LoadMapEdArray;
